import { Components, registerComponent, withCurrentUser, withMessages } from 'meteor/vulcan:core';
import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';
import Users from 'meteor/vulcan:users';
import { STATES } from 'meteor/vulcan:accounts';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Jumbotron, Container, Row, Col } from 'reactstrap';
import classNames from 'classnames';

class UsersEditForm extends PureComponent {
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
    const props = this.props;

    return (
      <div>
        <Jumbotron>
          <h3 className="title"><FormattedMessage id="users.edit_account"/></h3>
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
                    <Nav pills>
                      <NavItem>
                        <NavLink
                          className={classNames({ active: this.state.activeTab === '1' }, `waves-effect waves-light`)}
                          onClick={() => { this.toggle('1'); }}
                        >
                          General
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classNames({ active: this.state.activeTab === '2' }, `waves-effect waves-light`)}
                          onClick={() => { this.toggle('2'); }}
                        >
                          Profession
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
                            "gender"
                          ]}
                          collection={Users} 
                          {...props.terms}
                          successCallback={user => {
                            props.flash(this.context.intl.formatMessage({ id: 'users.edit_success' }, {name: Users.getDisplayName(user)}), 'success')
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
                            props.flash(this.context.intl.formatMessage({ id: 'users.edit_success' }, {name: Users.getDisplayName(user)}), 'success')
                          }}
                          showRemove={false}
                        />
                      </TabPane>

                    </TabContent>
                  </div>
                </Components.ShowIf>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}

UsersEditForm.propTypes = {
  terms: PropTypes.object, // a user is defined by its unique _id or its unique slug
};

UsersEditForm.contextTypes = {
  intl: intlShape
};

UsersEditForm.displayName = 'UsersEditForm';

registerComponent('UsersEditForm', UsersEditForm, withMessages, withCurrentUser);
