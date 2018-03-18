import { registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { Posts } from '../../modules/posts/index.js';

const PostsThumbnail = ({post}) => 
  <a href={Posts.getPageUrl(post)}>
    <img src={Posts.getThumbnailUrl(post)} />
  </a>

PostsThumbnail.displayName = "PostsThumbnail";

registerComponent('PostsThumbnail', PostsThumbnail);
