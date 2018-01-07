import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Questions } from '../../modules/questions/index.js';
import { withCurrentUser, withList, getSetting, registerSetting, Components, getRawComponent, registerComponent } from 'meteor/vulcan:core';
import { Grid, Row, Col, Button } from 'react-bootstrap';

class QuestionsDailyList extends PureComponent {

  constructor(props) {
    super(props);
    this.loadMoreDays = this.loadMoreDays.bind(this);
    this.state = {
      days: props.days,
      after: props.terms.after,
      daysLoaded: props.days,
      afterLoaded: props.terms.after,
      before: props.terms.before,
      loading: true,
    };
  }

  // intercept prop change and only show more days once data is done loading
  componentWillReceiveProps(nextProps) {
    if (nextProps.networkStatus === 2) {
      this.setState({loading: true});
    } else {
      this.setState((prevState, props) => ({
        loading: false,
        daysLoaded: prevState.days,
        afterLoaded: prevState.after,
      }));
    }
  }

  // return date objects for all the dates in a range
  getDateRange(after, before) {
    const mAfter = moment(after, 'YYYY-MM-DD');
    const mBefore = moment(before, 'YYYY-MM-DD');
    const daysCount = mBefore.diff(mAfter, 'days') + 1;
    const range = _.range(daysCount).map(
      i => moment(before, 'YYYY-MM-DD').subtract(i, 'days').startOf('day')
    );
    return range;
  }

  getDateQuestions(questions, date) {
    return _.filter(questions, question => moment(new Date(question.postedAt)).startOf('day').isSame(date, 'day'));
  }

  // variant 1: reload everything each time (works with polling)
  loadMoreDays(e) {
    e.preventDefault();
    const numberOfDays = getSetting('forum.numberOfDays', 5);
    const loadMoreAfter = moment(this.state.after, 'YYYY-MM-DD').subtract(numberOfDays, 'days').format('YYYY-MM-DD');
    
    this.props.loadMore({
      ...this.props.terms,
      after: loadMoreAfter,
    });

    this.setState({
      days: this.state.days + this.props.increment,
      after: loadMoreAfter,
    });
  }

  // variant 2: only load new data (need to disable polling)
  loadMoreDaysInc(e) {
    e.preventDefault();
    const numberOfDays = getSetting('forum.numberOfDays', 5);
    const loadMoreAfter = moment(this.state.after, 'YYYY-MM-DD').subtract(numberOfDays, 'days').format('YYYY-MM-DD');
    const loadMoreBefore = moment(this.state.after, 'YYYY-MM-DD').subtract(1, 'days').format('YYYY-MM-DD');
    
    this.props.loadMoreInc({
      ...this.props.terms,
      before: loadMoreBefore,
      after: loadMoreAfter,
    });
    
    this.setState({
      days: this.state.days + this.props.increment,
      after: loadMoreAfter,
    });
  }

  render() {
    const questions = this.props.results;
    const dates = this.getDateRange(this.state.afterLoaded, this.state.before);

    return (
      <Grid>
        <Row>
          <Col md={8} mdOffset={4}>
            <div className="questions-daily">
              <Components.QuestionsListHeader />
              {dates.map((date, index) => <Components.QuestionsDay key={index} number={index} date={date} questions={this.getDateQuestions(questions, date)} networkStatus={this.props.networkStatus} currentUser={this.props.currentUser} />)}
              {this.state.loading? <Components.Loading /> : 
                <Button className="waves-effect waves-light" block onClick={this.loadMoreDays}>
                  <FormattedMessage id="questions.load_more_days"/>
                </Button>}
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }
}

QuestionsDailyList.propTypes = {
  currentUser: PropTypes.object,
  days: PropTypes.number,
  increment: PropTypes.number
};

QuestionsDailyList.defaultProps = {
  days: getSetting('forum.numberOfDays', 5),
  increment: getSetting('forum.numberOfDays', 5)
};

const options = {
  collection: Questions,
  queryName: 'questionsDailyListQuery',
  fragmentName: 'QuestionsList',
  limit: 0,
};

registerComponent('QuestionsDailyList', QuestionsDailyList, withCurrentUser, [withList, options]);
