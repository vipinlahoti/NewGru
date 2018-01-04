import { Components, registerComponent, getSetting, registerSetting } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';
import moment from 'moment';

registerSetting('forum.numberOfDays', 5, 'Number of days to display in Daily view');

const QuestionsDaily = props => {
  // const terms = props.location && props.location.query;
  const numberOfDays = getSetting('forum.numberOfDays', 5);
  const terms = {
    view: 'top',
    after: moment().subtract(numberOfDays - 1, 'days').format('YYYY-MM-DD'),
    before: moment().format('YYYY-MM-DD'),
  };

  return <Components.QuestionsDailyList terms={terms}/>
};

QuestionsDaily.displayName = 'QuestionsDaily';

registerComponent('QuestionsDaily', QuestionsDaily);
