import { Components, registerComponent, withMessages } from 'meteor/vulcan:core';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { intlShape, FormattedMessage } from 'meteor/vulcan:i18n';
import { Comments } from '../../modules/comments/index.js';
import moment from 'moment';
import { ButtonToolbar, Button, Media } from 'react-bootstrap';

class CommentsItem extends PureComponent {

  constructor() {
    super();
    ['showReply', 'replyCancelCallback', 'replySuccessCallback', 'showEdit', 'editCancelCallback', 'editSuccessCallback', 'removeSuccessCallback'].forEach(methodName => {this[methodName] = this[methodName].bind(this)});
    this.state = {
      showReply: false,
      showEdit: false
    };
  }

  showReply(event) {
    this.setState({showReply: true});
  }

  replyCancelCallback(event) {
    this.setState({showReply: false});
  }

  replySuccessCallback() {
    this.setState({showReply: false});
  }

  showEdit(event) {
    this.setState({showEdit: true, showReply: false});
  }

  editCancelCallback(event) {
    this.setState({showEdit: false});
  }

  editSuccessCallback() {
    this.setState({showEdit: false});
  }

  removeSuccessCallback({documentId}) {
    const deleteDocumentSuccess = this.context.intl.formatMessage({id: 'comments.delete_success'});
    this.props.flash(deleteDocumentSuccess, "success");
    // todo: handle events in async callback
    // this.context.events.track("comment deleted", {_id: documentId});
  }

  renderComment() {
    const htmlBody = {__html: this.props.comment.htmlBody};
    const showReplyButton = !this.props.comment.isDeleted && !!this.props.currentUser;

    return (
      <div>
        <div dangerouslySetInnerHTML={htmlBody}></div>
        <div className="media-footer">
          <ButtonToolbar>
            <div>
              {/*
              <Components.Vote collection={Comments} document={this.props.comment} currentUser={this.props.currentUser}/>
              */}
              { showReplyButton ?
              <Button bsSize="xsmall" className="btn btn-flat btn-sm waves-effect waves-dark" onClick={this.showReply} title="Reply a Comment">
                <Components.Icon name="reply"/> <FormattedMessage id="comments.reply"/>
              </Button>
              : null}

              <Components.ShowIf check={Comments.options.mutations.edit.check} document={this.props.comment}>
                <span>
                  <a className="btn btn-flat btn-sm waves-effect waves-dark" onClick={this.showEdit} title="Edit comment"><Components.Icon name="edit"/> <FormattedMessage id="comments.edit"/></a>
                </span>
              </Components.ShowIf>

            </div>
          </ButtonToolbar>
        </div>
      </div>
    )
  }

  renderReply() {

    return (
      <div className="children-document-form">
        <Components.CommentsNewForm
          postId={this.props.comment.postId}
          parentComment={this.props.comment}
          successCallback={this.replySuccessCallback}
          cancelCallback={this.replyCancelCallback}
          type="reply"
        />
      </div>
    )
  }

  renderEdit() {

    return (
      <div className="children-document-form">
        <Components.CommentsEditForm
          comment={this.props.comment}
          successCallback={this.editSuccessCallback}
          cancelCallback={this.editCancelCallback}
          removeSuccessCallback={this.removeSuccessCallback}
        />
      </div>
    )
  }

  render() {
    const comment = this.props.comment;

    return (
      <Media id={comment._id}>
       <Media.Left>
          <Components.UsersAvatar size="medium" user={comment.user}/>
        </Media.Left>
        <Media.Body>
          <Media.Heading>
            <Components.UsersName user={comment.user}/> <small>&middot; {moment(new Date(comment.postedAt)).fromNow()}</small>
          </Media.Heading>
          {this.state.showEdit ? this.renderEdit() : this.renderComment()}
          {this.state.showReply ? this.renderReply() : null}
        </Media.Body>
      </Media>
    )
  }

}

CommentsItem.propTypes = {
  comment: PropTypes.object.isRequired, // the current comment
  currentUser: PropTypes.object,
};

CommentsItem.contextTypes = {
  events: PropTypes.object,
  intl: intlShape
};

registerComponent('CommentsItem', CommentsItem, withMessages);
