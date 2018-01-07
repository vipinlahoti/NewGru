import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Components, registerComponent, getFragment, withMessages, withCurrentUser } from 'meteor/vulcan:core';
import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';
import { Questions } from '../../modules/questions/index.js';
import Users from "meteor/vulcan:users";
import { withRouter } from 'react-router'
import { Grid, Row, Col, Jumbotron } from 'react-bootstrap';

class QuestionsEditForm extends PureComponent {

  renderAdminArea() {
    return (
      <Components.ShowIf check={Questions.options.mutations.edit.check}
        document={this.props.params._id ? {_id: this.props.params._id} : {slug: this.props.params.slug}}
      >
        <div className="questions-edit-form-admin">
          <div className="questions-edit-form-id">ID: {this.props.params._id}</div>
          <Components.QuestionsStats question={this.props.params._id} />
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
                <h3 className="title"><FormattedMessage id="questions.editing"/></h3>
              </Col>
            </Row>
          </Grid>
        </Jumbotron>

        <div className="main">
          <Grid>
            <Row>
              <Col md={8} mdOffset={2}>
                <Components.ShowIf
                  check={Questions.options.mutations.edit.check}
                  document={this.props.params._id ? {_id: this.props.params._id} : {slug: this.props.params.slug}}
                  failureComponent={<FormattedMessage id="app.noPermission"/>}
                >
                  <div>
                    {Users.isAdmin(this.props.currentUser) ? this.renderAdminArea() : null}
                    <Components.SmartForm
                      collection={Questions}
                      documentId={this.props.params._id}
                      successCallback={question => {
                        // this.props.closeModal();
                        this.props.router.push({pathname: this.props.redirect || Questions.getPageUrl(question)});
                        this.props.flash(this.context.intl.formatMessage({ id: 'questions.edit_success' }, { title: question.title }), 'success');
                      }}
                      removeSuccessCallback={({ documentId, documentTitle }) => {
                        // question edit form is being included from a single question, redirect to index
                        // note: this.props.params is in the worst case an empty obj (from react-router)
                        if (this.props.params._id) {
                          this.props.router.push('/questions');
                        }

                        const deleteDocumentSuccess = this.context.intl.formatMessage({ id: 'questions.delete_success' }, { title: documentTitle });
                        this.props.flash(deleteDocumentSuccess, 'success');
                        // todo: handle events in collection callbacks
                        // this.context.events.track("question deleted", {_id: documentId});
                      }}
                      showRemove={false}
                    />
                  </div>
                </Components.ShowIf>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );

  }
}

QuestionsEditForm.propTypes = {
  // closeModal: PropTypes.func,
  flash: PropTypes.func,
  // question: PropTypes.object.isRequired,
}

QuestionsEditForm.contextTypes = {
  intl: intlShape
}

registerComponent('QuestionsEditForm', QuestionsEditForm, withMessages, withRouter, withCurrentUser);
