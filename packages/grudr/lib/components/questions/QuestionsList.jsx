import { Components, registerComponent, withList, withCurrentUser, Utils } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import { Questions } from '../../modules/questions/index.js';
import Alert from 'react-bootstrap/lib/Alert'
import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';
import classNames from 'classnames';

const Error = ({error}) => <Alert className="flash-message" bsStyle="danger"><FormattedMessage id={error.id} values={{value: error.value}}/>{error.message}</Alert>

const QuestionsList = ({className, results, loading, count, totalCount, loadMore, showHeader = true, showLoadMore = true, networkStatus, currentUser, error, terms}) => {

  const loadingMore = networkStatus === 2;

  if (results && results.length) {

    const hasMore = totalCount > results.length;

    return (
      <div>
        <div className={classNames(className, 'card-columns')}>
        {showHeader ? <Components.QuestionsListHeader/> : null}
        {error ? <Error error={Utils.decodeIntlError(error)} /> : null }
        
        {results.map(question => <Components.QuestionsItem question={question} key={question._id} currentUser={currentUser} terms={terms} />)}
      </div>
        {showLoadMore ? 
          hasMore ? 
            <Components.QuestionsLoadMore loading={loadingMore} loadMore={loadMore} count={count} totalCount={totalCount} /> : 
            null : 
          null
        }
      </div>
    )
  } else if (loading) {
    return (
      <div>
        {showHeader ? <Components.QuestionsListHeader /> : null}
        {error ? <Error error={Utils.decodeIntlError(error)} /> : null }
        
        <Components.Loading/>
      </div>
    )
  } else {
    return (
      <div>
        {showHeader ? <Components.QuestionsListHeader /> : null}
        {error ? <Error error={Utils.decodeIntlError(error)} /> : null }
        
        <Components.QuestionsNoResults/>
      </div>
    )  
  }
  
};

QuestionsList.displayName = "QuestionsList";

QuestionsList.propTypes = {
  results: PropTypes.array,
  terms: PropTypes.object,
  hasMore: PropTypes.bool,
  loading: PropTypes.bool,
  count: PropTypes.number,
  totalCount: PropTypes.number,
  loadMore: PropTypes.func,
  showHeader: PropTypes.bool,
};

QuestionsList.contextTypes = {
  intl: intlShape
};

const options = {
  collection: Questions,
  queryName: 'questionsListQuery',
  fragmentName: 'QuestionsList',
};

registerComponent('QuestionsList', QuestionsList, withCurrentUser, [withList, options]);
