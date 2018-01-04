import { registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { FormattedMessage } from 'meteor/vulcan:i18n';

const QuestionsNoResults = props => 
  <div className="section">
    <h5 className="title center-align"><FormattedMessage id="questions.no_results"/></h5>
  </div>

QuestionsNoResults.displayName = "QuestionsNoResults";

registerComponent('QuestionsNoResults', QuestionsNoResults);
