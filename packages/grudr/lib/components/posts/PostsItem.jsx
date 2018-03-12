import { Components, registerComponent, ModalTrigger } from 'meteor/vulcan:core';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Posts } from '../../modules/posts/index.js';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import moment from 'moment';

import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import classNames from 'classnames';

const styles = theme => ({
  card: {
    display: 'inline-block',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  title: {
    marginBottom: theme.spacing.unit,
  },
  avatarUser: {
    display: 'flex',
  },
  cardActions: {
    lineHeight: '30px',
    paddingBottom: theme.spacing.unit * 2,
  }
});

class PostsItem extends PureComponent {

  renderCategories() {
    return this.props.post.categories && this.props.post.categories.length > 0 ? <Components.PostsCategories post={this.props.post} /> : "";
  }

  renderActions() {
    return (
      <div className="posts-actions">
        <Link to={{pathname:'/post/edit', query:{postId: this.props.post._id}}}>
          Edit
        </Link>
      </div>
    )
  }
  
  render() {

    const { post, classes } = this.props;

    let postClass = "posts-item";
    if (post.sticky) postClass += " posts-sticky";

    return (
      <Card className={classNames(classes.card, postClass)}>
        {post.thumbnailUrl ? <Components.PostsThumbnail post={post}/> : null}
        <CardContent>
          {this.renderCategories()}
          <Typography variant="subheading" className={classes.title}>
            <Link to={Posts.getPageUrl(post)}>
              {post.title}
            </Link>
          </Typography>
          <Typography component="p">
            {post.excerpt}
          </Typography>
        </CardContent>
        
        <CardActions className={classes.cardActions}>
          {post.user? <div className={classes.avatarUser}><Components.UsersAvatar size="xsmall" user={post.user}/><Components.UsersName user={post.user}/></div> : null}
          <div className="posts-item-date">{post.postedAt ? moment(new Date(post.postedAt)).fromNow() : <FormattedMessage id="posts.dateNotDefined"/>}</div>
          {/*<Components.Vote collection={Posts} document={post} currentUser={this.props.currentUser} />
          {Posts.options.mutations.edit.check(this.props.currentUser, post) ? this.renderActions() : null}*/}
        </CardActions>
        
      </Card>      
    )
  }
}

PostsItem.propTypes = {
  currentUser: PropTypes.object,
  post: PropTypes.object.isRequired,
  terms: PropTypes.object,
};

registerComponent('PostsItem', PostsItem, [withStyles, styles]);
