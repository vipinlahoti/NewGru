import { Components, registerComponent, ModalTrigger } from 'meteor/vulcan:core';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Posts } from '../../modules/posts/index.js';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import moment from 'moment';

import { Card, CardImg, CardText, CardBody, CardTitle, CardFooter, Button } from 'reactstrap';

class PostsItem extends PureComponent {

  renderCategories() {
    return this.props.post.categories && this.props.post.categories.length > 0 ? <Components.PostsCategories post={this.props.post} /> : "";
  }

  renderCommenters() {
    return this.props.post.commenters && this.props.post.commenters.length > 0 ? <Components.PostsCommenters post={this.props.post}/> : "";
  }

  renderActions() {
    return (
      <div className="posts-actions">
        <ModalTrigger title="Edit Post" component={<a className="posts-action-edit"><FormattedMessage id="posts.edit"/></a>}>
          <Components.PostsEditForm post={this.props.post} />
        </ModalTrigger>
      </div>
    )
  }
  
  render() {

    const {post} = this.props;

    let postClass = "posts-item";
    if (post.sticky) postClass += " posts-sticky";

    return (
      <Card className={postClass}>
        <div className="card-img">
          {post.thumbnailUrl ? <Components.PostsThumbnail post={post}/> : null}
        </div>
        <CardBody>
          {this.renderCategories()}
          <CardTitle>
            <Link to={Posts.getPageUrl(post)} className="posts-item-title-link">
              {post.title}
            </Link>
          </CardTitle>
          <CardText>{post.excerpt}</CardText>
        </CardBody>
        <CardFooter>
          {post.user? <div className="author"><Components.Avatar user={post.user}/><Components.UsersName user={post.user}/>, &nbsp;</div> : null}
          <div className="article-time">{post.postedAt ? moment(new Date(post.postedAt)).fromNow() : <FormattedMessage id="posts.dateNotDefined"/>}</div>
        </CardFooter>
      </Card>
    )
  }
}

PostsItem.propTypes = {
  currentUser: PropTypes.object,
  post: PropTypes.object.isRequired,
  terms: PropTypes.object,
};

registerComponent('PostsItem', PostsItem);
