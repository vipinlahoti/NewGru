import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Components, registerComponent, withMessages, withCurrentUser } from 'meteor/vulcan:core';
import { intlShape } from 'meteor/vulcan:i18n';
import { Posts } from '../../modules/posts/index.js';
import Users from "meteor/vulcan:users";
import { withRouter } from 'react-router'

class PostsEditForm extends PureComponent {

  renderAdminArea() {
    return (
      <Components.ShowIf check={Posts.options.mutations.edit.check} document={this.props.post}>
        <div className="posts-edit-form-admin">
          <div className="posts-edit-form-id">ID: {this.props.post._id}</div>
          <Components.PostsStats post={this.props.post} />
        </div>
      </Components.ShowIf>
    )
  }

  render() {

    return (
      <div className="posts-edit-form">
        {Users.isAdmin(this.props.currentUser) ? this.renderAdminArea() : null}
        <Components.SmartForm
          layout="vertical"
          collection={Posts}
          documentId={this.props.post._id}
          successCallback={post => {
            this.props.closeModal();
            this.props.flash(this.context.intl.formatMessage({ id: 'posts.edit_success' }, { title: post.title }), 'success');
          }}
          showRemove={false}
        />
      </div>
    );

  }
}

PostsEditForm.propTypes = {
  closeModal: PropTypes.func,
  flash: PropTypes.func,
  post: PropTypes.object.isRequired,
}

PostsEditForm.contextTypes = {
  intl: intlShape
}

registerComponent('PostsEditForm', PostsEditForm, withMessages, withRouter, withCurrentUser);
