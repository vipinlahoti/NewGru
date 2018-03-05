import { Components, registerComponent, withCurrentUser, Utils } from 'meteor/vulcan:core';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Helmet from 'react-helmet';

import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Reboot from 'material-ui/Reboot';

const styles = theme => ({
  '@global': {
    body: {
      ...theme.typography.body,
    },
    a: {
      color: theme.palette.background[900],
      textDecoration: 'none',
      '& hover': {
        color: theme.palette.background[900],
        textDecoration: 'none',
      }
    },
  },
});

class Layout extends PureComponent {
  render() {
    const routeName = Utils.slugify(this.props.currentRoute.name);
    const classes = this.props.classes;

    return (
      <div className={classNames('wrapper', `wrapper-${routeName}`)} id="wrapper">

        <Helmet>
          <link name="font-face" rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Poppins:300,400&text=Grudr|Roboto+Slab:400,500"/>
        </Helmet>
       
        <Components.HeadTags />
        <Reboot />

        <Components.Header />
        {this.props.children}
        <Components.Footer />
        <Components.FlashMessages />
      </div>
    )
  }
}

registerComponent('Layout', Layout, withCurrentUser, [withStyles, styles]);
