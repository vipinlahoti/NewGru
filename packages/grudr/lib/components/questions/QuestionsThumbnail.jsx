import { registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { Questions } from '../../modules/questions/index.js';

const QuestionsThumbnail = ({question}) => 
  <a className="card-thumbnail" href={Questions.getPageUrl(question)}>
    <span><img src={Questions.getThumbnailUrl(question)} /></span>
  </a>

QuestionsThumbnail.displayName = "QuestionsThumbnail";

registerComponent('QuestionsThumbnail', QuestionsThumbnail);
