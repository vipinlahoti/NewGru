import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { Link } from 'react-router';
import { Hospitals } from '../../modules/hospitals/index.js';

const HospitalsCommenters = ({hospital}) => {
  return (
    <div className="hospitals-commenters">
      <div className="hospitals-commenters-avatars">
        {_.take(hospital.commenters, 4).map(user => <Components.UsersAvatar key={user._id} user={user}/>)}
      </div>
      <div className="hospitals-commenters-discuss">
        <Link to={Hospitals.getPageUrl(hospital)}>
          <Components.Icon name="comment" />
          <span className="hospitals-commenters-comments-count">{hospital.commentCount}</span>
          <span className="sr-only">Comments</span>
        </Link>
      </div>
    </div>
  );
};

HospitalsCommenters.displayName = "HospitalsCommenters";

registerComponent('HospitalsCommenters', HospitalsCommenters);
