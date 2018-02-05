import { Components, registerComponent, ModalTrigger } from 'meteor/vulcan:core';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Link } from 'react-router';
import { Posts } from '../../modules/posts/index.js';
import moment from 'moment';
import { Grid, Row, Col, Jumbotron, Button } from 'react-bootstrap';


class PostsItem extends PureComponent {

  renderCategories() {
    return this.props.post.categories && this.props.post.categories.length > 0 ? <Components.PostsCategories post={this.props.post} /> : "";
  }

  renderCommenters() {
    return this.props.post.commenters && this.props.post.commenters.length > 0 ? <Components.PostsCommenters post={this.props.post}/> : "";
  }

  renderActions() {
    return (
      <div className="stats article-admin">
        <ModalTrigger title="Edit Post" component={<Button className="pink waves-effect waves-light" bsSize="small"><FormattedMessage id="posts.edit"/></Button>}>
          <Components.PostsEditForm post={this.props.post} />
        </ModalTrigger>
      </div>
    )
  }
  
  render() {

    const {post} = this.props;

    let postClass = "card";
    if (post.sticky) postClass += " card";

    return (
      <div className={postClass}>

        {post.thumbnailUrl ?
          <div className="card-image">
            <Components.PostsThumbnail post={post}/>
          </div>
        : null}

        <div className="card-content">
          <h3 className="card-title">
            <Link to={Posts.getPageUrl(post)}>
              {post.title}
            </Link>
          </h3>
          {this.renderCategories()}
          
          <div className="card-excerpt">
            {post.excerpt}
          </div>
          
          <div className="card-footer">
            <div className="author">
              {post.user? <div className="author"><Components.Avatar user={post.user}/> <Components.UsersName user={post.user}/>, &nbsp;</div> : null}
              <span className="article-time">
                {post.postedAt ? moment(new Date(post.postedAt)).fromNow() : <FormattedMessage id="posts.dateNotDefined"/>}
              </span>
            </div>
            
            {this.props.currentUser && this.props.currentUser.isAdmin ? <Components.PostsStats post={post} /> : null}
          </div>
          
        </div>

      </div>
    )
  }
}

PostsItem.propTypes = {
  currentUser: PropTypes.object,
  post: PropTypes.object.isRequired,
  terms: PropTypes.object,
};

registerComponent('PostsItem', PostsItem);
