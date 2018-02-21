import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withCurrentUser, getSetting, Components, registerComponent } from 'meteor/vulcan:core';
import { Posts } from '../../modules/posts/index.js';
import { Link } from 'react-router';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Button } from 'reactstrap';


const NavLoggedIn = () =>
  <Nav navbar className="ml-auto">
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


const NavLoggedOut = () =>
  <Nav navbar className="ml-auto">
    <NavItem>
      <NavLink tag={Link} to="/about">About</NavLink>
    </NavItem>
    <NavItem>
      <NavLink tag={Link} to="/features">Features</NavLink>
    </NavItem>
    <NavItem>
      <NavLink tag={Link} to="/contact">Contact</NavLink>
    </NavItem>
    <Components.ModalTrigger size="small" component={<Button color="danger"><Components.Icon name="lock"/> Login</Button>}>
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
    const siteTitle = getSetting('title', 'Grudr');
    const { currentUser } = this.props;
  
    return (
      <Navbar expand="md">
        <NavbarBrand tag={Link} to="/" className="mr-auto">{siteTitle}</NavbarBrand>

        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          {!!currentUser ? 
            <NavLoggedIn currentUser={currentUser}/> : 
            <NavLoggedOut currentUser={currentUser}/>
          }
        </Collapse>
      </Navbar>
    );
  }
}


Header.displayName = "Header";

Header.propTypes = {
  currentUser: PropTypes.object,
};

registerComponent('Header', Header, withCurrentUser);
