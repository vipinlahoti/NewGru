/*
 * Admin Header
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const AdminHeader = ({ currentUser }, context) =>
  <div className="subheader">
    <Navbar className="" fluid={ true }>
      <Nav>
        <LinkContainer to="/admin">
          <NavItem eventKey={1}>Users</NavItem>
        </LinkContainer>
        <LinkContainer to="/admin/posts">
          <NavItem eventKey={2}>Posts</NavItem>
        </LinkContainer>
        <LinkContainer to="/admin/hospitals">
          <NavItem eventKey={3}>Hospitals</NavItem>
        </LinkContainer>
        <LinkContainer to="/admin/categories">
          <NavItem eventKey={4}>Categories</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar>
    
  </div>

AdminHeader.displayName = 'AdminHeader';

AdminHeader.propTypes = {
  currentUser: PropTypes.object,
};

registerComponent('AdminHeader', AdminHeader, withCurrentUser);
