import { Components, registerComponent, getFragment, withMessages } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import { Answers } from '../../modules/answers/index.js';
import { FormattedMessage } from 'meteor/vulcan:i18n';

const AnswersNewForm = (props, context) => {

  let prefilledProps = {questionId: props.questionId};

  if (props.parentAnswer) {
    prefilledProps = Object.assign(prefilledProps, {
      parentAnswerId: props.parentAnswer._id,
      // if parent answer has a topLevelAnswerId use it; if it doesn't then it *is* the top level answer
      topLevelAnswerId: props.parentAnswer.topLevelAnswerId || props.parentAnswer._id
    });
  }

  return (
    <Components.ShowIf
      check={Answers.options.mutations.new.check}
      failureComponent={<FormattedMessage id="users.cannot_answer"/>}
    >
      <div className="answers-new-form">
        <Components.SmartForm
          collection={Answers}
          mutationFragment={getFragment('AnswersList')}
          successCallback={props.successCallback} 
          cancelCallback={props.type === "reply" ? props.cancelCallback : null}
          prefilledProps={prefilledProps}
          layout="elementOnly"
        />
      </div>
    </Components.ShowIf>
  )

};

AnswersNewForm.propTypes = {
  questionId: PropTypes.string.isRequired,
  type: PropTypes.string, // "answer" or "reply"
  parentAnswer: PropTypes.object, // if reply, the answer being replied to
  parentAnswerId: PropTypes.string, // if reply
  topLevelAnswerId: PropTypes.string, // if reply
  successCallback: PropTypes.func, // a callback to execute when the submission has been successful
  cancelCallback: PropTypes.func,
  router: PropTypes.object,
  flash: PropTypes.func,
};

registerComponent('AnswersNewForm', AnswersNewForm, withMessages);
