import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Meteor } from 'meteor/meteor';
import Dropdown from 'react-bootstrap/lib/Dropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import { LinkContainer } from 'react-router-bootstrap';
import Users from 'meteor/vulcan:users';
import { withApollo } from 'react-apollo';
import { Hospitals } from '../../modules/hospitals/index.js';

const UsersMenu = ({currentUser, client}) =>
  <Dropdown id="user-dropdown">
    <Dropdown.Toggle>
      <Components.Avatar user={currentUser} link={false} />
      <Components.Icon name="down" />
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <LinkContainer to={`/users/${currentUser.slug}`}>
        <MenuItem className="dropdown-item" eventKey="1"><FormattedMessage id="users.profile"/></MenuItem>
      </LinkContainer>
      <LinkContainer to={`/account`}>
        <MenuItem className="dropdown-item" eventKey="2"><FormattedMessage id="users.edit_account"/></MenuItem>
      </LinkContainer>

      <Components.ShowIf check={Hospitals.options.mutations.new.check}>
        <LinkContainer to={`/hospitals/new`}>
          <MenuItem className="dropdown-item" eventKey="3">Add Hospital</MenuItem>
        </LinkContainer>
      </Components.ShowIf>

      <Components.ShowIf
        check={() => Users.isAdmin(currentUser)}
      >
        <LinkContainer to={`/admin`}>
          <MenuItem className="dropdown-item" eventKey="4">Admin</MenuItem>
        </LinkContainer>
      </Components.ShowIf>

      <MenuItem className="dropdown-item" eventKey="5" onClick={() => Meteor.logout(() => client.resetStore())}><FormattedMessage id="users.log_out"/></MenuItem>
    </Dropdown.Menu>
  </Dropdown>


UsersMenu.propsTypes = {
  currentUser: PropTypes.object,
  client: PropTypes.object,
};

registerComponent('UsersMenu', UsersMenu, withCurrentUser, withApollo);
