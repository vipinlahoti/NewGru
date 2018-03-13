import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Headroom from 'react-headroom'

import { withCurrentUser, getSetting, Components, registerComponent } from 'meteor/vulcan:core';
import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';
import { Posts } from '../../modules/posts/index.js';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import MenuIcon from 'mdi-material-ui/Menu';
import ChevronLeftIcon from 'mdi-material-ui/ChevronLeft';
import { withStyles } from 'material-ui/styles';

import classNames from 'classnames';

const drawerWidth = 240;

const styles = theme => ({
  appBar: {
    // backgroundColor: theme.palette.common.white,
  },
  brandLogo: {
    color: theme.palette.common.white,
    ...theme.typography.brandLogo,
  },
  headerMid: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing.unit,
  },
});

const Header = (props, context) => {
  const classes = props.classes;
  const isSideNavOpen = props.isSideNavOpen;
  const toggleSideNav = props.toggleSideNav;
  
  const siteTitle = getSetting('title', 'Grudr');
  
  return (
    <Headroom downTolerance={10} upTolerance={10} >
      <AppBar position="static" elevation={3} className={classes.appBar}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            className={classes.menuButton}
            color="inherit"
          >
            <MenuIcon/>
          </IconButton>
          <div className={classes.headerMid}>
            <Typography variant="title" color="inherit" className={classes.brandLogo}>
              <Link to={`/`} className={classes.brandLogo}>
                {siteTitle}
              </Link>
            </Typography>
          </div>

          {!!props.currentUser ?
            <Components.UsersMenu/> :
          <Components.ModalTrigger size="small" component={<Button color="inherit">Login</Button>}>
            <Components.AccountsLoginForm />
          </Components.ModalTrigger>
          }

        </Toolbar>
      </AppBar>
    </Headroom>
  );
};

Header.displayName = "Header";

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  isSideNavOpen: PropTypes.bool,
  toggleSideNav: PropTypes.func
};

registerComponent('Header', Header, withCurrentUser, [withStyles, styles]);
