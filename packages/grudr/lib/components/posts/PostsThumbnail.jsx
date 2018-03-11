import { registerComponent } from 'meteor/vulcan:core';
import { Posts } from '../../modules/posts/index.js';

import React from 'react';
import { withStyles } from 'material-ui/styles';
import { CardMedia } from 'material-ui/Card';

const styles = theme => ({
  root: {
    paddingBottom: '60%',
    width: '100%'
  }
});

const PostsThumbnail = ({ post, classes }) => 
  <CardMedia className={classes.root} image={Posts.getThumbnailUrl(post)}/>

PostsThumbnail.displayName = "PostsThumbnail";

registerComponent('PostsThumbnail', PostsThumbnail, [withStyles, styles]);
