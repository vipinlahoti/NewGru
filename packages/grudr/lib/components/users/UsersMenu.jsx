import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Meteor } from 'meteor/meteor';
import Users from 'meteor/vulcan:users';
import { withApollo } from 'react-apollo';
import { Link } from 'react-router';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class UsersMenu extends PureComponent {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    const {currentUser, client} = this.props;

    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          <Components.UsersAvatar size="small" user={currentUser} link={false} />
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem tag={Link} to={`/users/${currentUser.slug}`}><FormattedMessage id="users.profile"/></DropdownItem>
          <DropdownItem tag={Link} to={`/account`}><FormattedMessage id="users.edit_account"/></DropdownItem>
          <Components.ShowIf check={() => Users.isAdmin(currentUser)}>
            <DropdownItem tag={Link} to={`/admin`}>Admin</DropdownItem>
          </Components.ShowIf>
          <DropdownItem tag={Link} onClick={() => Meteor.logout(() => client.resetStore())}><FormattedMessage id="users.log_out"/></DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )
  }
}

UsersMenu.propsTypes = {
  currentUser: PropTypes.object,
  client: PropTypes.object,
};

registerComponent('UsersMenu', UsersMenu, withCurrentUser, withApollo);
