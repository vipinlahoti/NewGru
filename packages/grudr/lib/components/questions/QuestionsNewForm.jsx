import { Components, registerComponent, getRawComponent, getFragment, withMessages } from 'meteor/vulcan:core';
import { Questions } from '../../modules/questions/index.js';
import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, FormattedMessage } from 'meteor/vulcan:i18n';
import { withRouter } from 'react-router'
import { Grid, Row, Col, Jumbotron } from 'react-bootstrap';

const QuestionsNewForm = (props, context) => 
  <div>
    <Jumbotron>
      <Grid>
        <Row>
          <Col md={8}>
            <h3 className="title"><FormattedMessage id="questions.new_question"/></h3>
          </Col>
        </Row>
      </Grid>
    </Jumbotron>

    <div className="main">
      <Grid>
        <Row>
          <Col md={8} mdOffset={2}>
            <Components.ShowIf
              check={Questions.options.mutations.new.check}
              failureComponent={<div><p className="questions-new-form-message"><FormattedMessage id="questions.sign_up_or_log_in_first" /></p><Components.AccountsLoginForm /></div>}
            >
              <div className="questions-new-form">
                <Components.SmartForm
                  collection={Questions}
                  mutationFragment={getFragment('QuestionsPage')}
                  successCallback={question => {
                    // props.closeModal();
                    props.router.push({pathname: props.redirect || Questions.getPageUrl(question)});
                    props.flash(context.intl.formatMessage({id: "questions.created_message"}), "success");
                  }}
                />
              </div>
            </Components.ShowIf>
          </Col>
        </Row>
      </Grid>
    </div>
  </div>

QuestionsNewForm.propTypes = {
  // closeModal: React.PropTypes.func,
  router: React.PropTypes.object,
  flash: React.PropTypes.func,
  redirect: React.PropTypes.string,
}

QuestionsNewForm.contextTypes = {
  closeCallback: PropTypes.func,
  intl: intlShape
};

QuestionsNewForm.displayName = "QuestionsNewForm";

registerComponent('QuestionsNewForm', QuestionsNewForm, withRouter, withMessages);
