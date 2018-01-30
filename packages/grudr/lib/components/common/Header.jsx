import React from 'react';
import PropTypes from 'prop-types';
import { withCurrentUser, getSetting, Components, registerComponent } from 'meteor/vulcan:core';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Navbar, Nav, NavItem } from 'react-bootstrap';


const NavLoggedIn = () =>
  <Nav className="navbar-auth" pullRight>
    <LinkContainer to="/dashboard">
      <NavItem eventKey={1}>
        <Components.Icon name="apps"/> Dashboard
      </NavItem>
    </LinkContainer>
    <LinkContainer to="/posts">
      <NavItem eventKey={2}>
        <Components.Icon name="library_books"/> Articles
      </NavItem>
    </LinkContainer>
    <LinkContainer to="/questions">
      <NavItem eventKey={3}>
        <Components.Icon name="forum"/> Questions
      </NavItem>
    </LinkContainer>
    <Components.UsersMenu/>
  </Nav>


const NavLoggedOut = () => {
  const button = <Button className="btn-signup pink waves-effect waves-light"><Components.Icon name="lock"/> Login</Button>

  return (
    <Nav pullRight>
      <LinkContainer to="/about">
        <NavItem eventKey={1}>About</NavItem>
      </LinkContainer>
      <LinkContainer to="/features">
        <NavItem eventKey={2}>Features</NavItem>
      </LinkContainer>
      <LinkContainer to="/contact">
        <NavItem eventKey={3}>Contact</NavItem>
      </LinkContainer>
      <Components.ModalTrigger size="small" component={button}>
        <Components.AccountsLoginForm />
      </Components.ModalTrigger>
    </Nav>
  )
}


const Header = ({currentUser}) => {
  
  const logoUrl = getSetting('logoUrl');
  const siteTitle = getSetting('title', 'Grudr');
  const tagline = getSetting('tagline');

  return (
    <Navbar className="" fluid={ true }>
      <Navbar.Header>
        <Navbar.Brand>
          <Components.Logo logoUrl={logoUrl} siteTitle={siteTitle} />
          {tagline ? <h2 className="tagline">{tagline}</h2> : "" }
        </Navbar.Brand>
      </Navbar.Header>

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
