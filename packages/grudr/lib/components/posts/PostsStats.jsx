import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';

const PostsStats = ({post}) => {

  return (
    <div className="posts-stats">
      { post.score ? <span className="posts-stats-item"><Components.Icon name="score"/> {Math.floor((post.score || 0)*10000)/10000}</span> : '' }
      <span className="posts-stats-item"><Components.Icon name="upvote"/> {post.baseScore || 0}</span>
      <span className="posts-stats-item"><Components.Icon name="clicks"/> {post.clickCount || 0}</span>
      <span className="posts-stats-item"><Components.Icon name="views"/> {post.viewCount || 0}</span>
    </div>
  )
}

PostsStats.displayName = "PostsStats";

registerComponent('PostsStats', PostsStats);
