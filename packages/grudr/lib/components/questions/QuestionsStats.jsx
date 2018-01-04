import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';

const QuestionsStats = ({question}) => {

  return (
    <div className="card-admin">
      {question.score ? <span className="questions-stats-item" title="Score"><Components.Icon name="score"/> {Math.floor((question.score || 0)*10000)/10000} <span className="sr-only">Score</span></span> : ""}
      <span className="questions-stats-item" title="Upvotes"><Components.Icon name="upvote"/> {question.baseScore || 0} <span className="sr-only">Upvotes</span></span>
      <span className="questions-stats-item" title="Clicks"><Components.Icon name="clicks"/> {question.clickCount || 0} <span className="sr-only">Clicks</span></span>
      <span className="questions-stats-item" title="Views"><Components.Icon name="views"/> {question.viewCount || 0} <span className="sr-only">Views</span></span>
    </div>
  )
}

QuestionsStats.displayName = "QuestionsStats";

registerComponent('QuestionsStats', QuestionsStats);
