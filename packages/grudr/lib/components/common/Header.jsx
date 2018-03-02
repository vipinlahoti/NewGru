import React from 'react';
import PropTypes from 'prop-types';
import { withCurrentUser, getSetting, Components, registerComponent } from 'meteor/vulcan:core';
import { Posts } from '../../modules/posts/index.js';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';

const styles = theme => ({
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
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
});

const Header = (props) => {
  const classes = props.classes;
  const logoUrl = getSetting('logoUrl');
  const siteTitle = getSetting('title', 'Grudr');

  return (
    <AppBar className={classNames(classes.appBar)}>
      <Toolbar>

        <div className={classNames(classes.headerMid)}>
          <Typography variant="title" color="inherit" className="tagline">
            <Components.Logo logoUrl={logoUrl} siteTitle={siteTitle} />
          </Typography>
        </div>

        {!!props.currentUser ? <Components.UsersMenu/> : 
          <Components.ModalTrigger size="small" component={<Button color="inherit">Login</Button>}>
            <Components.AccountsLoginForm />
          </Components.ModalTrigger>
        }

        <Components.ShowIf check={Posts.options.mutations.new.check}>
          <Components.PostsNewButton/>
        </Components.ShowIf>
        
      </Toolbar>
    </AppBar>
  )
}

Header.displayName = "Header";

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
};

registerComponent('Header', Header, withCurrentUser, [withStyles, styles]);
