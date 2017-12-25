import { registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import Users from 'meteor/vulcan:users';
import { Link } from 'react-router';
import classNames from 'classnames';

const UsersAvatar = ({className, user, size, link}) => {

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

  const img = <img alt={Users.getDisplayName(user)} className="avatar" style={imgStyle} src={avatarUrl} title={user.username}/>;
  const initials = <span className="avatar-initials"><span>{Users.avatar.getInitials(user)}</span></span>;

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

registerComponent('UsersAvatar', UsersAvatar);
