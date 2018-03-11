import { Components, registerComponent, withDocument, withCurrentUser, getActions, withMutation } from 'meteor/vulcan:core';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Posts } from '../../modules/posts/index.js';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import ArrowLeftIcon from 'mdi-material-ui/ArrowLeft';

const styles = theme => ({
  root: {
    // marginTop: theme.spacing.unit * 7,
  },
  appBar: {
    backgroundColor: theme.palette.common.white,
  },
  paper: theme.mixins.gutters({
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
  }),
  menuButton: {
    marginRight: theme.spacing.unit,
  }
});

class PostsPage extends Component {
  
  render() {
    if (this.props.loading) {
      
      return <Components.Loading/>
      
    } else if (!this.props.document) {
      
      // console.log(`// missing post (_id: ${this.props.documentId})`);
      return <div className="posts-page"><FormattedMessage id="app.404"/></div> 

    } else {
      const post = this.props.document;
      const htmlBody = {__html: post.htmlBody};
      const { classes, routerBack, router } = this.props;
      const goBack = routerBack[routerBack.length - 2];
      console.log(goBack);

      return (
        <div className={classes.root}>
          <Components.HeadTags url={Posts.getPageUrl(post, true)} title={post.title} image={post.thumbnailUrl} description={post.excerpt} />
          
          <AppBar color="default" position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton aria-label="back" color="inherit" className={classes.menuButton} component={Link} to={`goBack.path`}>
                <ArrowLeftIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                Articles
              </Typography>
            </Toolbar>
          </AppBar>

          {post.thumbnailUrl ? <Components.PostsThumbnail post={post}/> : null}
          
          <Paper className={classes.paper} elevation={4}>
            <Typography variant="subheading" component="h2">
            {post.title}
          </Typography>

          {post.htmlBody ? <div dangerouslySetInnerHTML={htmlBody}></div> : null}
          </Paper>

        </div> 
      );
      
    }
  }
  
  // triggered after the component did mount on the client
  async componentDidMount() {
    try {
      
      // destructure the relevant props
      const { 
        // from the parent component, used in withDocument, GraphQL HOC
        documentId,
        routerBack,
        // from connect, Redux HOC 
        setViewed, 
        postsViewed, 
        // from withMutation, GraphQL HOC
        increasePostViewCount,
      } = this.props;
      
      // a post id has been found & it's has not been seen yet on this client session
      if (documentId && !postsViewed.includes(documentId)) {
        
        // trigger the asynchronous mutation with postId as an argument
        await increasePostViewCount({postId: documentId});
        
        // once the mutation is done, update the redux store
        setViewed(documentId);
      }
      
    } catch(error) {
      console.log(error); // eslint-disable-line
    }
  }
}

PostsPage.displayName = "PostsPage";

PostsPage.propTypes = {
  documentId: PropTypes.string,
  // routerBack: PropTypes.func,
  document: PropTypes.object,
  postsViewed: PropTypes.array,
  setViewed: PropTypes.func,
  increasePostViewCount: PropTypes.func,
}

const queryOptions = {
  collection: Posts,
  queryName: 'postsSingleQuery',
  fragmentName: 'PostsPage',
};

const mutationOptions = {
  name: 'increasePostViewCount',
  args: {postId: 'String'},
};

const mapStateToProps = state => ({ postsViewed: state.postsViewed });
const mapDispatchToProps = dispatch => bindActionCreators(getActions().postsViewed, dispatch);

registerComponent(
  // component name used by Vulcan
  'PostsPage', 
  // React component 
  PostsPage,

  [withStyles, styles],
  // HOC to give access to the current user
  withCurrentUser, 
  // HOC to load the data of the document, based on queryOptions & a documentId props
  [withDocument, queryOptions], 
  // HOC to provide a single mutation, based on mutationOptions
  withMutation(mutationOptions), 
  // HOC to give access to the redux store & related actions
  connect(mapStateToProps, mapDispatchToProps)
);
