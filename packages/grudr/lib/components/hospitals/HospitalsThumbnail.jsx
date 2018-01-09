import { registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { Hospitals } from '../../modules/hospitals/index.js';

const HospitalsThumbnail = ({hospital}) => 
  <a className="card-thumbnail" href={Hospitals.getPageUrl(hospital)}>
    <span><img src={Hospitals.getThumbnailUrl(hospital)} /></span>
  </a>

HospitalsThumbnail.displayName = "HospitalsThumbnail";

registerComponent('HospitalsThumbnail', HospitalsThumbnail);
