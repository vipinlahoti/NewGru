import { Components, registerComponent, ModalTrigger } from 'meteor/vulcan:core';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Posts } from '../../modules/posts/index.js';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import classNames from 'classnames';
import moment from 'moment';

const styles = theme => ({
  card: {
    borderRadius: '5px',
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2,
    position: 'relative',
  }
});

class PostsItem extends PureComponent {

  renderCategories() {
    return this.props.post.categories && this.props.post.categories.length > 0 ? <Components.PostsCategories post={this.props.post} /> : "";
  }

  renderActions() {
    return (
      <Button component={Link} to={{pathname:'/post/edit', query:{postId: this.props.post._id}}}>Edit</Button>
    )
  }
  
  render() {

    const { post, classes } = this.props;

    let postClass = "card-item";
    if (post.sticky) postClass += " card-sticky";

    return (
      <Card elevation={4} className={classNames(classes.card, postClass)}>
        {post.thumbnailUrl ? <Components.PostsThumbnail post={post}/> : null}

        <CardContent>
          <Typography variant="headline" component="h3">
            <Link to={Posts.getPageUrl(post)} className="posts-item-title-link">
              {post.title}
            </Link>
          </Typography>

          {this.renderCategories()}

          <Typography component="p">
            {post.excerpt}
          </Typography>
        </CardContent>

        <CardActions>
          {post.user ? <div className="posts-item-user"><Components.UsersAvatar user={post.user}/><Components.UsersName user={post.user}/></div> : null}
          <div className="posts-item-date">{post.postedAt ? moment(new Date(post.postedAt)).fromNow() : <FormattedMessage id="posts.dateNotDefined"/>}</div>

          {Posts.options.mutations.edit.check(this.props.currentUser, post) ? this.renderActions() : null}
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
