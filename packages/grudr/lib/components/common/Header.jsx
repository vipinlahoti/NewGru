import React from 'react';
import PropTypes from 'prop-types';
import { withCurrentUser, getSetting, Components, registerComponent } from 'meteor/vulcan:core';
import { Posts } from '../../modules/posts/index.js';
import { Link } from 'react-router';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Button } from 'reactstrap';

const NavLoggedIn = () =>
  <Nav navbar>
    <NavItem>
      <NavLink tag={Link} to="/dashboard">
        <Components.Icon name="apps"/> Dashboard
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink tag={Link} to="/articles">
        <Components.Icon name="library_books"/> Articles
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink tag={Link} to="/questions">
        <Components.Icon name="forum"/> Questions
      </NavLink>
    </NavItem>
    <Components.UsersMenu/>
  </Nav>


const NavLoggedOut = () => {
  const button = <Button color="danger"><Components.Icon name="lock"/> Login</Button>

  return (
    <Nav navbar>
      <NavItem>
        <NavLink tag={Link} to="/about">About</NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={Link} to="/features">Features</NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={Link} to="/contact">Contact</NavLink>
      </NavItem>
      <Components.ModalTrigger size="small" component={button}>
        <Components.AccountsLoginForm />
      </Components.ModalTrigger>
    </Nav>
  )
}


const Header = ({currentUser}) => {
  
  const logoUrl = getSetting('logoUrl');
  const siteTitle = getSetting('title', 'Grudr');

  return (
    <Navbar expand="md" light>
      <NavbarBrand tag={Link} to="/" className="mr-auto">{siteTitle}</NavbarBrand>

      {!!currentUser ? 
        <NavLoggedIn currentUser={currentUser}/> : 
        <NavLoggedOut currentUser={currentUser}/>
      }
    </Navbar>
  )
}


Header.displayName = "Header";

Header.propTypes = {
  currentUser: PropTypes.object,
};

registerComponent('Header', Header, withCurrentUser);
