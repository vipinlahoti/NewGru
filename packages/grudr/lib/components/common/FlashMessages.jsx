import { Components, replaceComponent, withMessages } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'mdi-material-ui/Close';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
});

class FlashMessages extends Component {
  handleRequestClose = () => {
    let message = this.props.messages.filter(message => message.show)[0];
    this.setState({
      open: false,
    });
    if(message) {
      this.props.markAsSeen(message._id);
      this.props.clear(message._id);
    }
  };

  render() {
    let messages = this.props.messages.filter(message => message.show);
    const {classes} = this.props;

    return (
      <div className="flash-messages">
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={messages.length > 0}
          autoHideDuration={6000}
          message={messages.length > 0 && messages[0].content}
          onClose={this.handleRequestClose}
          action={
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleRequestClose}
            >
              <CloseIcon />
            </IconButton>}
        />
      </div>
    );
  }

}

FlashMessages.displayName = "FlashMessages";

replaceComponent('FlashMessages', FlashMessages, withMessages, [withStyles, styles]);
