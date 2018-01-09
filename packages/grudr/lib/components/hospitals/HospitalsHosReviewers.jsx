import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { Link } from 'react-router';
import { Hospitals } from '../../modules/hospitals/index.js';

const HospitalsHosReviewers = ({hospital}) => {
  return (
    <div className="hospitals-hosReviewers">
      <div className="hospitals-hosReviewers-avatars">
        {_.take(hospital.hosReviewers, 4).map(user => <Components.UsersAvatar key={user._id} user={user}/>)}
      </div>
      <div className="hospitals-hosReviewers-discuss">
        <Link to={Hospitals.getPageUrl(hospital)}>
          <Components.Icon name="hosReview" />
          <span>{hospital.hosReviewCount}</span>
        </Link>
      </div>
    </div>
  );
};

HospitalsHosReviewers.displayName = "HospitalsHosReviewers";

registerComponent('HospitalsHosReviewers', HospitalsHosReviewers);
