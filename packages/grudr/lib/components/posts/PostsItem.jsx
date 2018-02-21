import { Components, registerComponent, ModalTrigger } from 'meteor/vulcan:core';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Link } from 'react-router';
import { Posts } from '../../modules/posts/index.js';
import moment from 'moment';
import { Card, CardImg, CardText, CardBody, CardTitle, CardFooter, Button } from 'reactstrap';

class PostsItem extends PureComponent {

  renderCategories() {
    return this.props.post.categories && this.props.post.categories.length > 0 ? <Components.PostsCategories post={this.props.post} /> : "";
  }
  
  render() {

    const {post} = this.props;

    let postClass = "posts-item";
    if (post.sticky) postClass += " posts-sticky";

    return (
      <Card>
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
          {post.user? <div className="author"><Components.UsersAvatar user={post.user} size="small"/><Components.UsersName user={post.user}/>, &nbsp;</div> : null}
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
