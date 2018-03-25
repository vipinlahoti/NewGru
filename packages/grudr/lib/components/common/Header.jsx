import { withCurrentUser, getSetting, Components, registerComponent } from 'meteor/vulcan:core';
import { Posts } from '../../modules/posts/index.js';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Headroom from 'react-headroom';

import { Link } from 'react-router';
import { Badge, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Button } from 'reactstrap';

const NavLoggedIn = () =>
  <Nav navbar className="ml-auto secondary-nav">
    <NavItem>
      <NavLink tag={Link} to={`post/new`} className="icon-only">
        <Components.Icon name="add_circle_outline"/>
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink className="icon-only">
        <Components.Icon name="notifications_none"/>
        <Badge color="light">4</Badge>
      </NavLink>
    </NavItem>
    <Components.UsersMenu/>
  </Nav>


const NavLoggedOut = () =>
  <Nav navbar className="ml-auto">
    <Components.ModalTrigger size="small" component={<Button color="white"><Components.Icon name="lock"/> Login</Button>}>
      <Components.AccountsLoginForm />
    </Components.ModalTrigger>
  </Nav>


class Header extends PureComponent {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { currentUser } = this.props;
  
    return (
      <Headroom downTolerance={10} upTolerance={10} >
        <Navbar expand="md">
          <Link to="#" className="menu-toggle"><Components.Icon name="menu"/></Link>
          <NavbarBrand tag={Link} to="/">{getSetting('title')}</NavbarBrand>

          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {!!currentUser ? 
              <NavLoggedIn currentUser={currentUser}/> : 
              <NavLoggedOut currentUser={currentUser}/>
            }
          </Collapse>
        </Navbar>
      </Headroom>
    );
  }
}


Header.displayName = "Header";

Header.propTypes = {
  currentUser: PropTypes.object,
};

registerComponent('Header', Header, withCurrentUser);
