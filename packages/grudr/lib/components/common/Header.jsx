import { getSetting, Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';
import { Posts } from '../../modules/posts/index.js';

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import MenuIcon from 'mdi-material-ui/Menu';
import ChevronLeftIcon from 'mdi-material-ui/ChevronLeft';
import LockOutlineIcon from 'mdi-material-ui/LockOutline';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

import classNames from 'classnames';


const drawerWidth = 240;
const topBarHeight = 100;

const styles = theme => ({
  appBar: {
    backgroundColor: '#FFFFFF',
    boxShadow: '0 0 20px 0 rgba(0, 0, 0, .09)',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  headerMid: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    '& h1': {
      margin: '0 24px 0 0',
      fontSize: '18px',
      lineHeight: 1,
    }
  },
  menuButton: {
    marginRight: theme.spacing.unit * 2,
  },
  brandLogo: {
    ...theme.typography.brandLogo,
  }
});

const Header = (props, context) => {
  const classes = props.classes;
  const isSideNavOpen = props.isSideNavOpen;
  const toggleSideNav = props.toggleSideNav;
  
  const siteTitle = getSetting('title', 'Grudr');
  
  return (
    <AppBar color="default" position="static" className={classNames(classes.appBar)}>
      <Toolbar>
        
        <IconButton
          aria-label="open drawer"
          onClick={e => toggleSideNav()}
          className={classNames(classes.menuButton)}
          color="inherit"
        >
          {isSideNavOpen ? <ChevronLeftIcon/> : <MenuIcon/>}
        </IconButton>
        
        <div className={classNames(classes.headerMid)}>
          
          <Typography variant="title" color="inherit" className="tagline">
            <Link to={`/`} className={classNames(classes.brandLogo)}>
              {siteTitle}
            </Link>
          </Typography>

        </div>

        <Components.ShowIf check={Posts.options.mutations.new.check}>
          <Button color="inherit" component={Link} to={`post/new`}>
            <FormattedMessage id="posts.new_post"/>
          </Button>
        </Components.ShowIf>

        {!!props.currentUser ? <Components.UsersMenu/> : 
          <Components.ModalTrigger size="small" component={<Button color="inherit"><LockOutlineIcon/> Login</Button>}>
            <Components.AccountsLoginForm />
          </Components.ModalTrigger>
        }
        
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  currentUser: PropTypes.object,
  classes: PropTypes.object.isRequired,
  isSideNavOpen: PropTypes.bool,
  toggleSideNav: PropTypes.func,
};

Header.displayName = 'Header';

registerComponent('Header', Header, withCurrentUser, [withStyles, styles]);
