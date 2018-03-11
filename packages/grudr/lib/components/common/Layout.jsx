import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Reboot from 'material-ui/Reboot';

const drawerWidth = 240;
const topBarHeight = 100;

const styles = theme => ({
  '@global': {
    html: {
      background: theme.palette.background.default,
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      ...theme.typography.body1,
    },
    a: {
      color: theme.palette.common.black,
      textDecoration: 'none',
    }
  }
});

const Layout = ({currentUser, children, currentRoute, }) =>
  <div className={classNames('wrapper', `wrapper-${currentRoute.name.replace('.', '-')}`)} id="wrapper">

    <Helmet>
      <link name="font-face" rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700|Roboto:300,400,500,700|Roboto+Slab:400,500,600,700|Material+Icons"/>
      <link name="font-awesome" rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
    </Helmet>
   
    <Components.HeadTags />
    <Reboot />
    {currentUser ? <Components.UsersProfileCheck currentUser={currentUser} documentId={currentUser._id} /> : null}

    <Components.Header />
    {children}
    <Components.FlashMessages />
  </div>

registerComponent('Layout', Layout, withCurrentUser, [withStyles, styles]);
