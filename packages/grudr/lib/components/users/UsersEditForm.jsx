import { Components, registerComponent, withCurrentUser, withMessages } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';
import Users from 'meteor/vulcan:users';
import { STATES } from 'meteor/vulcan:accounts';
import { Grid, Row, Col, Jumbotron, Tabs, Tab } from 'react-bootstrap';

const UsersEditForm = (props, context) => {
  return (
    <div>
      <Jumbotron>
        <Grid>
          <Row>
            <Col md={8}>
              <h3 className="title"><FormattedMessage id="users.edit_account"/></h3>
            </Col>
          </Row>
        </Grid>
      </Jumbotron>

      <div className="main">
        <Grid>
          <Row>
            <Col md={8} mdOffset={2}>
              <Components.ShowIf
                check={Users.options.mutations.edit.check}
                document={props.terms.documentId ? {_id: props.terms.documentId} : {slug: props.terms.slug}}
                failureComponent={<FormattedMessage id="app.noPermission"/>}
              >
                <div>
                  <Tabs defaultActiveKey={1} className="profile-settings-tabs" id="profile-settings-tabs" bsStyle="pills">
                    <Tab eventKey={1} title="General">
                      <Components.SmartForm
                        layout="vertical"
                        fields={[
                          "avatarUrl",
                          "displayName",
                          "email",
                          "gender",
                          "college",
                          "country",
                          "state",
                          "city",
                          "address",
                          "address2"
                        ]}
                        collection={Users} 
                        {...props.terms}
                        successCallback={user => {
                          props.flash(context.intl.formatMessage({ id: 'users.edit_success' }, {name: Users.getDisplayName(user)}), 'success')
                        }}
                        showRemove={false}
                      />
                    </Tab>

                    <Components.ShowIf
                      check={() => Users.isDoctor(props.currentUser)}
                    >
                      <Tab eventKey={2} title="Profession">
                        <Components.SmartForm
                          layout="vertical"
                          fields={[
                            "professionalLicenseNumber",
                            "certification",
                            "affiliation",
                            "awards"
                          ]}
                          collection={Users} 
                          {...props.terms}
                          successCallback={user => {
                            props.flash(context.intl.formatMessage({ id: 'users.edit_success' }, {name: Users.getDisplayName(user)}), 'success')
                          }}
                          showRemove={false}
                        />
                      </Tab>
                    </Components.ShowIf>

                    <Tab eventKey={3} title="Notifications">
                      <Components.SmartForm
                        layout="vertical"
                        fields={[
                          "notifications_users",
                          "notifications_posts",
                          "notifications_comments",
                          "notifications_replies"
                        ]}
                        collection={Users} 
                        {...props.terms}
                        successCallback={user => {
                          props.flash(context.intl.formatMessage({ id: 'users.edit_success' }, {name: Users.getDisplayName(user)}), 'success')
                        }}
                        showRemove={false}
                      />
                    </Tab>
                  </Tabs>
                </div>
              </Components.ShowIf>
            </Col>
          </Row>
        </Grid>
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
