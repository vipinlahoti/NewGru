import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Components, registerComponent } from 'meteor/vulcan:core';

class QuestionsDay extends PureComponent {

  render() {
    const {date, questions} = this.props;
    const noQuestions = questions.length === 0;

    let dateHeading;

    const monthDay = date.format('MM/DD');

    // easter eggs
    if (monthDay === '01/01') {
      dateHeading = 
        <h4 className="questions-day-heading questions-day-heading-01-01">
          <span className="questions-day-heading-date">Happy</span>
          <span className="questions-day-heading-day">New Year</span>
        </h4>    
    } else if (monthDay === '03/08') {
      dateHeading = 
        <h4 className="questions-day-heading questions-day-heading-03-08">
          <span className="questions-day-heading-date">Women's Day</span>
          <span className="questions-day-heading-day">International</span>
        </h4>
    } else if (monthDay === '05/04') {
      dateHeading = 
        <h4 className="questions-day-heading questions-day-heading-05-04">
          <span className="questions-day-heading-date">May</span>
          <span className="questions-day-heading-day">The Fourth</span>
          <span className="questions-day-heading-third">Be With You</span>
        </h4>
    } else if (monthDay === '12/25') {
      dateHeading = 
        <h4 className="questions-day-heading questions-day-heading-12-25">
          <span className="questions-day-heading-date">Merry</span>
          <span className="questions-day-heading-day">Christmas</span>
        </h4>
    } else {
      dateHeading = 
        <h4 className="questions-day-heading">
          <span className="questions-day-heading-date">{date.format("MM/DD")}</span>
          <span className="questions-day-heading-day">{date.format("dddd")}</span>
        </h4>
    }

    return (
      <div>
        { noQuestions ? null :
          <div className="questions-day">
            <div className="questions-day-heading-wrapper">
              { dateHeading }
            </div>
          
            <div className="questions-list">
              <div className="questions-list-content">
                {questions.map((question, index) => <Components.QuestionsItem question={question} key={question._id} index={index} currentUser={this.props.currentUser} />)}
              </div>
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
