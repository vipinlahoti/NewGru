import { registerComponent } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';


const styles = theme => ({
  root: {
    marginRight: theme.spacing.unit - 3,
  }
});

const UsersAvatar = ({className, classes, user, size, link}) => {

  const sizes = {
    xsmall: '30px',
    small: '50px',
    medium: '60px',
    large: '80px',
    xlarge: '120px',
    exlarge: '160px',
  }

  const aStyle = {
    height: sizes[size],
    width: sizes[size]
  };

  const imgStyle = {
    height: sizes[size],
    width: sizes[size]
  };

  const avatarUrl = user.avatarUrl || Users.avatar.getUrl(user);

  const img = <Avatar alt={Users.getDisplayName(user)} style={imgStyle} src={avatarUrl} title={user.username} />;
  const initials = <span className="avatar-initials"><span>{Users.avatar.getInitials(user)}</span></span>;

  const avatar = avatarUrl ? img : initials;

  return (
    <div className={classes.root}>
      {link ? 
        <Link to={Users.getProfileUrl(user)}>
          { avatar }
        </Link> 
        : <span>{avatar}</span>
      }
    </div>
  );

}

UsersAvatar.propTypes = {
  user: PropTypes.object.isRequired,
  size: PropTypes.string,
  link: PropTypes.bool
}

UsersAvatar.defaultProps = {
  size: 'medium',
  link: true
}

UsersAvatar.displayName = 'UsersAvatar';

registerComponent('UsersAvatar', UsersAvatar, [withStyles, styles]);
