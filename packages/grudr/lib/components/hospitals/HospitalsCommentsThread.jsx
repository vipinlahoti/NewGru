import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { withList, withCurrentUser, Components, registerComponent, Utils } from 'meteor/vulcan:core';

const HospitalsCommentsThread = (props, /* context*/) => {

  const {loading, terms: { hospitalId }, results, totalCount, currentUser} = props;
  
  if (loading) {
  
    return <div className="hospitals-comments-thread"><Components.Loading/></div>
  
  } else {
    
    const resultsClone = _.map(results, _.clone); // we don't want to modify the objects we got from props
    const nestedComments = Utils.unflatten(resultsClone, {idProperty: '_id', parentIdProperty: 'parentCommentId'});

    return (
      <div className="hospitals-comments-thread">
        <h4 className="hospitals-comments-thread-title"><FormattedMessage id="comments.comments"/></h4>
        <Components.CommentsList currentUser={currentUser} comments={nestedComments} commentCount={totalCount}/>
        {!!currentUser ?
          <div className="hospitals-comments-thread-new">
            <h4><FormattedMessage id="comments.new"/></h4>
            <Components.CommentsNewForm
              hospitalId={hospitalId} 
              type="comment" 
            />
          </div> :
          <div>
            <Components.ModalTrigger size="small" component={<a href="#"><FormattedMessage id="comments.please_log_in"/></a>}>
              <Components.AccountsLoginForm/>
            </Components.ModalTrigger>
          </div> 
        }
      </div>
    );
  }
};

HospitalsCommentsThread.displayName = 'HospitalsCommentsThread';

HospitalsCommentsThread.propTypes = {
  currentUser: PropTypes.object
};

const options = {
  collectionName: 'Comments',
  queryName: 'commentsListQuery',
  fragmentName: 'CommentsList',
  limit: 0,
};

registerComponent('HospitalsCommentsThread', HospitalsCommentsThread, [withList, options], withCurrentUser);
