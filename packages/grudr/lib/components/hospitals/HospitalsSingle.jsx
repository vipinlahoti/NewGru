import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';

const HospitalsSingle = (props, context) => {
  return <Components.HospitalsPage documentId={props.params._id} />
};

HospitalsSingle.displayName = "HospitalsSingle";

registerComponent('HospitalsSingle', HospitalsSingle);
