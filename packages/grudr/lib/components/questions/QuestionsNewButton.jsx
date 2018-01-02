import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';
import Button from 'react-bootstrap/lib/Button';

const QuestionsNewButton = (props, context) => {

  const size = props.currentUser ? 'large' : 'small';
  const button = <Button className="btn-floating pull-right waves-effect waves-light"><Components.Icon name="add"/></Button>;
  
  return (
    <Components.ModalTrigger size={size} title={context.intl.formatMessage({ id: 'questions.new_question' })} component={button}>
      <Components.QuestionsNewForm />
    </Components.ModalTrigger>
  )
}

QuestionsNewButton.displayName = 'QuestionsNewButton';

QuestionsNewButton.propTypes = {
  currentUser: PropTypes.object,
};

QuestionsNewButton.contextTypes = {
  messages: PropTypes.object,
  intl: intlShape
};

registerComponent('QuestionsNewButton', QuestionsNewButton, withCurrentUser);
