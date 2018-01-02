import { registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { FormattedMessage } from 'meteor/vulcan:i18n';

const QuestionsNoResults = props => <p className="questions-no-results"><FormattedMessage id="questions.no_results"/></p>;

QuestionsNoResults.displayName = "QuestionsNoResults";

registerComponent('QuestionsNoResults', QuestionsNoResults);
