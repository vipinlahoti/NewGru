import { registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { Posts } from '../../modules/posts/index.js';

const PostsThumbnail = ({post}) => 
  <a className="posts-thumbnail" href={Posts.getPageUrl(post)}>
    <img src={Posts.getThumbnailUrl(post)} className="card-img-top" />
  </a>

PostsThumbnail.displayName = "PostsThumbnail";

registerComponent('PostsThumbnail', PostsThumbnail);
