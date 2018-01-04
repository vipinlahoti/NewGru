import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Components, registerComponent } from 'meteor/vulcan:core';

class QuestionsDay extends PureComponent {

  render() {
    const {date, questions} = this.props;
    const noQuestions = questions.length === 0;

    return (
      <div className="questions-day">
        <h4 className="questions-day-heading">{date.format('dddd, MMMM Do YYYY')}</h4>
        { noQuestions ? <Components.QuestionsNoMore /> :
          <div className="questions-list">
            <div className="questions-list-content">
              {questions.map((question, index) => <Components.QuestionsItem question={question} key={question._id} index={index} currentUser={this.props.currentUser} />)}
            </div>
          </div>
        }
      </div>
    );
  }
}

QuestionsDay.propTypes = {
  currentUser: PropTypes.object,
  date: PropTypes.object,
  number: PropTypes.number
};

registerComponent('QuestionsDay', QuestionsDay);
