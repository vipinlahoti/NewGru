import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Components, registerComponent, getFragment, withMessages, withCurrentUser } from 'meteor/vulcan:core';
import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';
import { Posts } from '../../modules/posts/index.js';
import Users from "meteor/vulcan:users";
import { withRouter } from 'react-router'
import { Grid, Row, Col, Jumbotron } from 'react-bootstrap';

class PostsEditForm extends PureComponent {

  renderAdminArea() {
    return (
      <Components.ShowIf check={Posts.options.mutations.edit.check} document={this.props.post}>
        <div className="posts-edit-form-admin">
          <div className="posts-edit-form-id">ID: {this.props.params._id}</div>
          <Components.PostsStats post={this.props.post} />
        </div>
      </Components.ShowIf>
    )
  }

  render() {

    return (
      <div>

        <Jumbotron>
          <Grid>
            <Row>
              <Col md={8}>
                <h3 className="title"><FormattedMessage id="posts.editing"/></h3>
              </Col>
            </Row>
          </Grid>
        </Jumbotron>

        <div className="main">
          <Grid>
            <Row>
              <Col md={8} mdOffset={2}>

                {Users.isAdmin(this.props.currentUser) ? this.renderAdminArea() : null}
                <Components.SmartForm
                  collection={Posts}
                  documentId={this.props.params._id}
                  successCallback={post => {
                    // this.props.closeModal();
                    this.props.router.push({pathname: this.props.redirect || Posts.getPageUrl(post)});
                    this.props.flash(this.context.intl.formatMessage({ id: 'posts.edit_success' }, { title: post.title }), 'success');
                  }}
                  removeSuccessCallback={({ documentId, documentTitle }) => {
                    // post edit form is being included from a single post, redirect to index
                    // note: this.props.params is in the worst case an empty obj (from react-router)
                    if (this.props.params._id) {
                      this.props.router.push('/posts');
                    }

                    const deleteDocumentSuccess = this.context.intl.formatMessage({ id: 'posts.delete_success' }, { title: documentTitle });
                    this.props.flash(deleteDocumentSuccess, 'success');
                    // todo: handle events in collection callbacks
                    // this.context.events.track("post deleted", {_id: documentId});
                  }}
                  showRemove={false}
                />
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );

  }
}

PostsEditForm.propTypes = {
  // closeModal: PropTypes.func,
  flash: PropTypes.func,
  // post: PropTypes.object.isRequired,
}

PostsEditForm.contextTypes = {
  intl: intlShape
}

registerComponent('PostsEditForm', PostsEditForm, withMessages, withRouter, withCurrentUser);
