import React from 'react';
import Users from 'meteor/vulcan:users';
import { Components } from 'meteor/vulcan:core';

const AdminUsersName = ({ document: user, flash }) => 
  <div>

    <Components.UsersAvatar user={user} size="small"/>

    <span>{Users.getDisplayName(user)}</span>

    &nbsp;

    {_.rest(Users.getGroups(user)).map(group => <code key={group}>{group}</code>)}
  
  </div>

export default AdminUsersName;
