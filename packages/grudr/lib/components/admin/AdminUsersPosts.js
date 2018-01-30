import React from 'react';
import { Posts } from '../../modules/posts/index.js';
import { Link } from 'react-router';
import { registerComponent } from 'meteor/vulcan:core';

const AdminUsersPosts = ({ document: user }) => 
  <ul>
    {user.posts && user.posts.map(post => 
      <li key={post._id}><Link to={Posts.getPageUrl(post)}>{post.title}</Link></li>
    )}
  </ul>

registerComponent('AdminUsersPosts', AdminUsersPosts);

export default AdminUsersPosts;
