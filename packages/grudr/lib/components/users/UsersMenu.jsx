import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Meteor } from 'meteor/meteor';
import Users from 'meteor/vulcan:users';
import { withApollo } from 'react-apollo';
import { Link } from 'react-router';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const UsersMenu = ({currentUser, client}) =>
  <UncontrolledDropdown nav inNavbar>
    <DropdownToggle nav caret>
      <Components.Avatar user={currentUser} link={false} />
      <Components.Icon name="down" />
    </DropdownToggle>
    <DropdownMenu>
      <DropdownItem tag={Link} to={`/users/${currentUser.slug}`}><FormattedMessage id="users.profile"/></DropdownItem>
      <DropdownItem tag={Link} to={`/account`}><FormattedMessage id="users.edit_account"/></DropdownItem>
      <Components.ShowIf check={() => Users.isAdmin(currentUser)}>
        <DropdownItem tag={Link} to={`/admin`}>Admin</DropdownItem>
      </Components.ShowIf>
      <DropdownItem tag={Link} onClick={() => Meteor.logout(() => client.resetStore())}><FormattedMessage id="users.log_out"/></DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>

UsersMenu.propsTypes = {
  currentUser: PropTypes.object,
  client: PropTypes.object,
};

registerComponent('UsersMenu', UsersMenu, withCurrentUser, withApollo);
