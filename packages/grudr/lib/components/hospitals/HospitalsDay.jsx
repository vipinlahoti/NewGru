import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Components, registerComponent } from 'meteor/vulcan:core';

class HospitalsDay extends PureComponent {

  render() {
    const {date, hospitals} = this.props;
    const noHospitals = hospitals.length === 0;

    let dateHeading;

    const monthDay = date.format('MM/DD');

    // easter eggs
    if (monthDay === '01/01') {
      dateHeading = 
        <h4 className="hospitals-day-heading hospitals-day-heading-01-01">
          <span className="hospitals-day-heading-date">Happy</span>
          <span className="hospitals-day-heading-day">New Year</span>
        </h4>    
    } else if (monthDay === '03/08') {
      dateHeading = 
        <h4 className="hospitals-day-heading hospitals-day-heading-03-08">
          <span className="hospitals-day-heading-date">Women's Day</span>
          <span className="hospitals-day-heading-day">International</span>
        </h4>
    } else if (monthDay === '05/04') {
      dateHeading = 
        <h4 className="hospitals-day-heading hospitals-day-heading-05-04">
          <span className="hospitals-day-heading-date">May</span>
          <span className="hospitals-day-heading-day">The Fourth</span>
          <span className="hospitals-day-heading-third">Be With You</span>
        </h4>
    } else if (monthDay === '12/25') {
      dateHeading = 
        <h4 className="hospitals-day-heading hospitals-day-heading-12-25">
          <span className="hospitals-day-heading-date">Merry</span>
          <span className="hospitals-day-heading-day">Christmas</span>
        </h4>
    } else {
      dateHeading = 
        <h4 className="hospitals-day-heading">
          <span className="hospitals-day-heading-date">{date.format("MM/DD")}</span>
          <span className="hospitals-day-heading-day">{date.format("dddd")}</span>
        </h4>
    }

    return (
      <div className="hospitals-day">
        <div className="hospitals-day-heading-wrapper">
          { dateHeading }
        </div>
        { noHospitals ? <Components.HospitalsNoResults /> :
          <div className="hospitals-list">
            <div className="hospitals-list-content">
              {hospitals.map((hospital, index) => <Components.HospitalsItem hospital={hospital} key={hospital._id} index={index} currentUser={this.props.currentUser} />)}
            </div>
          </div>
        }
      </div>
    );
  }
}

HospitalsDay.propTypes = {
  currentUser: PropTypes.object,
  date: PropTypes.object,
  number: PropTypes.number
};

registerComponent('HospitalsDay', HospitalsDay);
