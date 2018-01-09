import { registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { FormattedMessage } from 'meteor/vulcan:i18n';

const HospitalsNoResults = props => 
  <div className="section">
    <h5 className="title center-align"><FormattedMessage id="hospitals.no_results"/></h5>
  </div>

HospitalsNoResults.displayName = "HospitalsNoResults";

registerComponent('HospitalsNoResults', HospitalsNoResults);
