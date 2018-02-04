import { registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { IndexLink } from 'react-router';

const Logo = ({logoUrl, siteTitle}) => {
  if (logoUrl) {
    return (
      <IndexLink to={{pathname: "/"}} className="navbar-brand">
        <img src={logoUrl} alt={siteTitle} />
      </IndexLink>
    )
  } else {
    return (
      <IndexLink to={{pathname: "/"}} className="navbar-brand">{siteTitle}</IndexLink>
    )
  }
}

Logo.displayName = "Logo";

registerComponent('Logo', Logo);
