import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';

const QuestionsSingle = (props, context) => {
  return <Components.QuestionsPage documentId={props.params._id} />
};

QuestionsSingle.displayName = "QuestionsSingle";

registerComponent('QuestionsSingle', QuestionsSingle);
