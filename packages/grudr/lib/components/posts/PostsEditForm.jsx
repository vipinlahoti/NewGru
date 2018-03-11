import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Components, registerComponent, withMessages, withCurrentUser } from 'meteor/vulcan:core';
import { intlShape } from 'meteor/vulcan:i18n';
import { Posts } from '../../modules/posts/index.js';
import Users from "meteor/vulcan:users";
import { withRouter } from 'react-router'

class PostsEditForm extends PureComponent {

  renderAdminArea() {
    const postId = this.props.location.query.postId;

    return (
      <Components.ShowIf check={Posts.options.mutations.edit.check} document={this.props.post}>
        <div className="posts-edit-form-admin">
          <div className="posts-edit-form-id">ID: {postId}</div>
          <Components.PostsStats post={postId} />
        </div>
      </Components.ShowIf>
    )
  }

  render() {
    const postId = this.props.location.query.postId;
    
    return (
      <div className="posts-edit-form">
        {Users.isAdmin(this.props.currentUser) ? this.renderAdminArea() : null}
        <Components.SmartForm
          layout="vertical"
          collection={Posts}
          documentId={postId}
          successCallback={post => {
            this.props.router.push({pathname: this.props.redirect || Posts.getPageUrl(post)});
            this.props.flash(this.context.intl.formatMessage({ id: 'posts.edit_success' }, { title: post.title }), 'success');
          }}
          mutationFragmentName="PostsPage"
          removeSuccessCallback={({ documentId, documentTitle }) => {
            // post edit form is being included from a single post, redirect to index
            // note: this.props.params is in the worst case an empty obj (from react-router)
            if (this.props.params._id) {
              this.props.router.push('/');
            }

            const deleteDocumentSuccess = this.context.intl.formatMessage({ id: 'posts.delete_success' }, { title: documentTitle });
            this.props.flash(deleteDocumentSuccess, 'success');
            // todo: handle events in collection callbacks
            // this.context.events.track("post deleted", {_id: documentId});
          }}
          showRemove={false}
        />
      </div>
    );

  }
}

PostsEditForm.propTypes = {
  router: PropTypes.object,
  flash: PropTypes.func,
  redirect: PropTypes.string,
}

PostsEditForm.contextTypes = {
  intl: intlShape
}

registerComponent('PostsEditForm', PostsEditForm, withMessages, withRouter, withCurrentUser);
