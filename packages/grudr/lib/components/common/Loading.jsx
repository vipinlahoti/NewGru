import { replaceComponent } from 'meteor/vulcan:lib';
import React from 'react';
import { withStyles } from 'material-ui/styles';
import { LinearProgress } from 'material-ui/Progress';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
  }
});

const Loading = ({classes}) => {
  return (
    <div className={classes.root}>
      <LinearProgress color="secondary"/>
    </div>
  )
}

Loading.displayName = "Loading";

replaceComponent('Loading', Loading, [withStyles, styles]);
