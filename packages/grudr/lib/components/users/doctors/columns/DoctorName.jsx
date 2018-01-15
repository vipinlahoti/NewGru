import React from 'react';
import Users from 'meteor/vulcan:users';
import { Components } from 'meteor/vulcan:core';

const AdminUsersName = ({ document: user, flash }) => 
  <div className="author">
    <Components.UsersAvatar user={user} size="large"/>
    <h5 className="title left"><Components.UsersName user={user}/></h5>
  </div>

export default AdminUsersName;
