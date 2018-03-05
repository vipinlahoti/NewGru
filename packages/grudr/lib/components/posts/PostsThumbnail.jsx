import { registerComponent } from 'meteor/vulcan:core';
import { Posts } from '../../modules/posts/index.js';

import React from 'react';
import { Link } from 'react-router';

import { withStyles } from 'material-ui/styles';
import { CardMedia } from 'material-ui/Card';

const styles = theme => ({
  media: {
    height: 300,
  }
});

const PostsThumbnail = ({post, classes}) => 
  <Link to={Posts.getPageUrl(post)}>
    <CardMedia image={Posts.getThumbnailUrl(post)} className={classes.media} />
  </Link>

PostsThumbnail.displayName = "PostsThumbnail";

registerComponent('PostsThumbnail', PostsThumbnail, [withStyles, styles]);
