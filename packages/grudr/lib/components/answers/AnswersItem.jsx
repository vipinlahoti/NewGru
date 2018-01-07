import { Components, registerComponent, withMessages } from 'meteor/vulcan:core';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { intlShape, FormattedMessage } from 'meteor/vulcan:i18n';
import { Answers } from '../../modules/answers/index.js';
import moment from 'moment';
import { ButtonToolbar, Button, Media } from 'react-bootstrap';

class AnswersItem extends PureComponent {

  constructor() {
    super();
    ['showReply', 'replyCancelCallback', 'replySuccessCallback', 'showEdit', 'editCancelCallback', 'editSuccessCallback', 'removeSuccessCallback'].forEach(methodName => {this[methodName] = this[methodName].bind(this)});
    this.state = {
      showReply: false,
      showEdit: false
    };
  }

  showReply(event) {
    event.preventDefault();
    this.setState({showReply: false});
  }

  replyCancelCallback(event) {
    event.preventDefault();
    this.setState({showReply: false});
  }

  replySuccessCallback() {
    this.setState({showReply: false});
  }

  showEdit(event) {
    event.preventDefault();
    this.setState({showEdit: true});
  }

  editCancelCallback(event) {
    event.preventDefault();
    this.setState({showEdit: false});
  }

  editSuccessCallback() {
    this.setState({showEdit: false});
  }

  removeSuccessCallback({documentId}) {
    const deleteDocumentSuccess = this.context.intl.formatMessage({id: 'answers.delete_success'});
    this.props.flash(deleteDocumentSuccess, "success");
    // todo: handle events in async callback
    // this.context.events.track("answer deleted", {_id: documentId});
  }

  renderAnswer() {
    const htmlBody = {__html: this.props.answer.htmlBody};
    const showReplyButton = !this.props.answer.isDeleted && !!this.props.currentUser;

    return (
      <div>
        <div dangerouslySetInnerHTML={htmlBody}></div>
        <div className="media-footer">
          <ButtonToolbar>
            <div>
              {/*
              <Components.Vote collection={Answers} document={this.props.answer} currentUser={this.props.currentUser}/>
              
              { showReplyButton ?
              <Button bsSize="xsmall" className="btn btn-flat btn-sm waves-effect waves-dark" onClick={this.showReply} title="Reply a Answer">
                <Components.Icon name="reply"/> <FormattedMessage id="answers.reply"/>
              </Button>
              : null}
              */}
              <Components.ShowIf check={Answers.options.mutations.edit.check} document={this.props.answer}>
                <span>
                  <a className="btn btn-flat btn-sm waves-effect waves-dark" onClick={this.showEdit} title="Edit answer"><Components.Icon name="edit"/> <FormattedMessage id="answers.edit"/></a>
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
      <div className="answers-item-reply">
        <Components.AnswersNewForm
          questionId={this.props.answer.questionId}
          parentAnswer={this.props.answer}
          successCallback={this.replySuccessCallback}
          cancelCallback={this.replyCancelCallback}
          type="reply"
        />
      </div>
    )
  }

  renderEdit() {

    return (
      <Components.AnswersEditForm
        answer={this.props.answer}
        successCallback={this.editSuccessCallback}
        cancelCallback={this.editCancelCallback}
        removeSuccessCallback={this.removeSuccessCallback}
      />
    )
  }

  render() {
    const answer = this.props.answer;

    return (
      <Media id={answer._id}>
       <Media.Left>
          <Components.UsersAvatar size="medium" user={answer.user}/>
        </Media.Left>
        <Media.Body>
          <Media.Heading>
            <Components.UsersName user={answer.user}/> <small>&middot; {moment(new Date(answer.postedAt)).fromNow()}</small>
          </Media.Heading>
          {this.state.showEdit ? this.renderEdit() : this.renderAnswer()}
          {this.state.showReply ? this.renderReply() : null}
        </Media.Body>
      </Media>
    )
  }

}

AnswersItem.propTypes = {
  answer: PropTypes.object.isRequired, // the current answer
  currentUser: PropTypes.object,
};

AnswersItem.contextTypes = {
  events: PropTypes.object,
  intl: intlShape
};

registerComponent('AnswersItem', AnswersItem);
