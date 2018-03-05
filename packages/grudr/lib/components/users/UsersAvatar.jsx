import { registerComponent } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';

const styles = theme => ({
  avatar: {
    marginRight: theme.spacing.unit - 3,
  }
});

const UsersAvatar = ({className, classes, user, link}) => {

  const avatarUrl = user.avatarUrl || Users.avatar.getUrl(user);

  const img = <Avatar alt={Users.getDisplayName(user)} src={avatarUrl} className={classNames(classes.avatar)} />
  const initials = <span>{Users.avatar.getInitials(user)}</span>;

  const avatar = avatarUrl ? img : initials;

  return (
    <div>
      {link ? 
        <Link to={Users.getProfileUrl(user)}>
          {avatar}
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
