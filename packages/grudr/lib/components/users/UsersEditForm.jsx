import { Components, registerComponent, withCurrentUser, withMessages } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';
import Users from 'meteor/vulcan:users';
import { STATES } from 'meteor/vulcan:accounts';
import { Jumbotron, Container, Row, Col } from 'reactstrap';

const UsersEditForm = (props, context) => {
  return (
    <div>
      <Jumbotron>
        <Container>
          <Row>
            <div>
            <h3 className="title"><FormattedMessage id="users.edit_account"/></h3>
            <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
            </div>
          </Row>
        </Container>
      </Jumbotron>
      <div className="main">
        <Container>
          <Row>
            <Col md={{ size: 8, offset: 2 }}>
              <Components.ShowIf
                check={Users.options.mutations.edit.check}
                document={props.terms.documentId ? {_id: props.terms.documentId} : {slug: props.terms.slug}}
                failureComponent={<FormattedMessage id="app.noPermission"/>}
              >
                <div>                  
                  <div className="change-password-link">
                    <Components.ModalTrigger size="small" title={context.intl.formatMessage({id: "accounts.change_password"})} component={<a href="#"><FormattedMessage id="accounts.change_password" /></a>}>
                      <Components.AccountsLoginForm formState={STATES.PASSWORD_CHANGE} />
                    </Components.ModalTrigger>
                  </div>

                  <Components.SmartForm 
                    collection={Users} 
                    {...props.terms}
                    successCallback={user => {
                      props.flash(context.intl.formatMessage({ id: 'users.edit_success' }, {name: Users.getDisplayName(user)}), 'success')
                    }}
                    showRemove={true}
                  />
                </div>
              </Components.ShowIf>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};


UsersEditForm.propTypes = {
  terms: PropTypes.object, // a user is defined by its unique _id or its unique slug
};

UsersEditForm.contextTypes = {
  intl: intlShape
};

UsersEditForm.displayName = 'UsersEditForm';

registerComponent('UsersEditForm', UsersEditForm, withMessages, withCurrentUser);
