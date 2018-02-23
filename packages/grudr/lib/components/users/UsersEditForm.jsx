import { Components, registerComponent, withCurrentUser, withMessages } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';
import Users from 'meteor/vulcan:users';
import { STATES } from 'meteor/vulcan:accounts';
import { Jumbotron, Container, Row, Col } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

class UsersEditForm extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    const {props, context} = this;

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

                  <Nav pills>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === '1' })}
                        onClick={() => { this.toggle('1'); }}
                      >
                        General
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === '2' })}
                        onClick={() => { this.toggle('2'); }}
                      >
                        Profession
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === '3' })}
                        onClick={() => { this.toggle('3'); }}
                      >
                        Notifications
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={this.state.activeTab}>
                    
                    <TabPane tabId="1">
                      <Components.SmartForm
                        layout="vertical"
                        fields={[
                          "avatarUrl",
                          "displayName",
                          "email",
                          "mobileNumber",
                          "gender",
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
                    </TabPane>

                    <TabPane tabId="2">
                      <Components.SmartForm
                        layout="vertical"
                        fields={[
                          "college",
                          "hospitalName",
                          "categoriesIds",
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
                    </TabPane>

                    <TabPane tabId="3">
                      <Components.SmartForm
                        layout="vertical"
                        fields={[
                          "notifications_users",
                          "notifications_hospitals",
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
                    </TabPane>
                  </TabContent>

                </Components.ShowIf>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
};


UsersEditForm.propTypes = {
  terms: PropTypes.object, // a user is defined by its unique _id or its unique slug
};

UsersEditForm.contextTypes = {
  intl: intlShape
};

UsersEditForm.displayName = 'UsersEditForm';

registerComponent('UsersEditForm', UsersEditForm, withMessages, withCurrentUser);
