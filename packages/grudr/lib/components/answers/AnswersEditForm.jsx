import { Components, registerComponent, getFragment, withMessages } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import { Answers } from '../../modules/answers/index.js';

const AnswersEditForm = (props, context) => {
  return (
    <div className="answers-edit-form">
      <Components.SmartForm 
        layout="elementOnly"
        collection={Answers}
        documentId={props.answer._id}
        successCallback={props.successCallback}
        cancelCallback={props.cancelCallback}
        removeSuccessCallback={props.removeSuccessCallback}
        showRemove={true}
        mutationFragment={getFragment('AnswersList')}
      />
    </div>
  )
}

AnswersEditForm.propTypes = {
  answer: PropTypes.object.isRequired,
  successCallback: PropTypes.func,
  cancelCallback: PropTypes.func
};

registerComponent('AnswersEditForm', AnswersEditForm, withMessages);
