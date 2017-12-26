import { registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { Posts } from '../../modules/posts/index.js';

const PostsThumbnail = ({post}) => 
  <a className="card-thumbnail" href={Posts.getLink(post)} target={Posts.getLinkTarget(post)}>
    <span><img src={Posts.getThumbnailUrl(post)} /></span>
  </a>

PostsThumbnail.displayName = "PostsThumbnail";

registerComponent('PostsThumbnail', PostsThumbnail);