import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { withList, withCurrentUser, Components, registerComponent, Utils } from 'meteor/vulcan:core';
import { Comments } from '../../modules/comments/index.js';
import { Row, Col } from 'react-bootstrap';

const PostsCommentsThread = (props, /* context*/) => {

  const {loading, terms: { postId }, results, totalCount, currentUser} = props;
  
  if (loading) {
  
    return <div className="posts-comments-thread"><Components.Loading/></div>
  
  } else {
    
    const resultsClone = _.map(results, _.clone); // we don't want to modify the objects we got from props
    const nestedComments = Utils.unflatten(resultsClone, {idProperty: '_id', parentIdProperty: 'parentCommentId'});

    return (
      <div className="section-comments">
        <Row>
          <Col md={8} mdOffset={2}>
            <div className="media-area">
              {!!currentUser ?
                <div>
                  <h4 className="title center-align"><FormattedMessage id="comments.new"/></h4>
                  <Components.CommentsNewForm
                    postId={postId} 
                    type="comment" 
                  />
                </div> :
                <Components.ModalTrigger size="small" component={<a href="" className="title"><FormattedMessage id="comments.please_log_in"/></a>}>
                  <Components.AccountsLoginForm/>
                </Components.ModalTrigger>
              }

              {(totalCount > 0) ?
                <div>
                  <div className="section-half">
                    <h4 className="title center-align">{totalCount} <FormattedMessage id="comments.comments"/></h4>
                  </div>
                  <Components.CommentsList currentUser={currentUser} comments={nestedComments} commentCount={totalCount}/>
                </div>
              : null }
            </div>
          </Col>
        </Row>
      </div>
    );
  }
};


PostsCommentsThread.displayName = 'PostsCommentsThread';

PostsCommentsThread.propTypes = {
  currentUser: PropTypes.object
};

const options = {
  collection: Comments,
  queryName: 'commentsListQuery',
  fragmentName: 'CommentsList',
  limit: 0,
};

registerComponent('PostsCommentsThread', PostsCommentsThread, [withList, options], withCurrentUser);
