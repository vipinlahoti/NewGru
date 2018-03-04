import { registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { IndexLink } from 'react-router';

const Logo = ({logoUrl, siteTitle}) => {
  if (logoUrl) {
    return (
      <IndexLink to={{pathname: "/"}}>
        <img src={logoUrl} alt={siteTitle} />
      </IndexLink>
    )
  } else {
    return (
      <IndexLink to={{pathname: "/"}}>{siteTitle}</IndexLink>
    )
  }
}

Logo.displayName = "Logo";

registerComponent('Logo', Logo);
