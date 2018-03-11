import { Components, registerComponent } from 'meteor/vulcan:core';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import classNames from 'classnames';

const styles = theme => ({
  root: {
    overflow: 'hidden',
  },
  paper: theme.mixins.gutters({
    paddingTop: '40%',
    paddingBottom: '20%',
    paddingLeft: theme.spacing.unit * 9,

    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing.unit * 10,
      paddingTop: theme.spacing.unit * 15,
      paddingBottom: theme.spacing.unit * 8,
    },
  }),
  hero: {
    // backgroundColor: theme.palette.primary.main,
    marginBottom: theme.spacing.unit,
  },
  heroTitle: {
    // fontSize: '350%'
  }
});

const PostsHome = (props, context) => {
  const { classes } = props;
  const terms = _.isEmpty(props.location && props.location.query) ? {view: 'new'}: props.location.query;
  
  return (
    <div className={classes.root}>
      <Paper className={classNames(classes.paper, classes.hero)} elevation={3} square={true}>
        <Typography variant="display4" component="h2" className={classes.heroTitle}>
          Articles
        </Typography>
      </Paper>
      <div className="container">
        <div className="col-md-offset-1 col-md-10">
          <Components.PostsList terms={terms}/>
        </div>
      </div>
    </div>
  )
};

PostsHome.displayName = "PostsHome";

registerComponent('PostsHome', PostsHome, [withStyles, styles]);
