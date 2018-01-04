import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { Link } from 'react-router';
import { Questions } from '../../modules/questions/index.js';

const QuestionsAnswerers = ({question}) => {
  return (
    <div className="questions-answerers">
      <div className="questions-answerers-avatars">
        {_.take(question.answerers, 4).map(user => <Components.UsersAvatar key={user._id} user={user}/>)}
      </div>
      <div className="questions-answerers-discuss">
        <Link to={Questions.getPageUrl(question)}>
          <Components.Icon name="answer" />
          <span>{question.answerCount}</span>
        </Link>
      </div>
    </div>
  );
};

QuestionsAnswerers.displayName = "QuestionsAnswerers";

registerComponent('QuestionsAnswerers', QuestionsAnswerers);
