import { getSetting, Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Navbar, Nav, NavItem } from 'react-bootstrap';

const Footer = props => {
  const logoUrl = getSetting("logoUrl");
  const siteTitle = getSetting("title", "Grudr");
  const tagline = getSetting("tagline");
  
  return (
    <div className="footer">
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Components.Logo logoUrl={logoUrl} siteTitle={siteTitle} />
            {tagline ? <h2 className="tagline">{tagline}</h2> : "" }
          </Navbar.Brand>
        </Navbar.Header>

        <Nav pullRight>
          <LinkContainer to="/about">
            <NavItem eventKey={1}>About</NavItem>
          </LinkContainer>
          <LinkContainer to="/features">
            <NavItem eventKey={2}>Features</NavItem>
          </LinkContainer>
          <LinkContainer to="/articles">
            <NavItem eventKey={3}>Articles</NavItem>
          </LinkContainer>
          <LinkContainer to="/contact">
            <NavItem eventKey={4}>Contact</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar>
    </div>
  )
}

Footer.displayName = "Footer";

registerComponent('Footer', Footer);
