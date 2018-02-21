import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';
import { Button } from 'reactstrap';

const PostsNewButton = (props, context) => {

  const size = props.currentUser ? 'lg' : 'sm';
  const button = <Button color="danger" className="btn-floating pull-right"><Components.Icon name="add"/></Button>;
  return (
    <Components.ModalTrigger size={size} title={context.intl.formatMessage({ id: 'posts.new_post' })} component={button}>
      <Components.PostsNewForm />
    </Components.ModalTrigger>
  )
}

PostsNewButton.displayName = 'PostsNewButton';

PostsNewButton.propTypes = {
  currentUser: PropTypes.object,
};

PostsNewButton.contextTypes = {
  messages: PropTypes.object,
  intl: intlShape
};

registerComponent('PostsNewButton', PostsNewButton, withCurrentUser);
