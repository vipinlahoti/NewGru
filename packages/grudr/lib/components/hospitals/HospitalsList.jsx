import { Components, registerComponent, withList, withCurrentUser, Utils } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import { Hospitals } from '../../modules/hospitals/index.js';
import Alert from 'react-bootstrap/lib/Alert'
import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';

const Error = ({error}) => <Alert className="flash-message" bsStyle="danger"><FormattedMessage id={error.id} values={{value: error.value}}/>{error.message}</Alert>

const HospitalsList = ({className, results, loading, count, totalCount, loadMore, showHeader = true, showLoadMore = true, networkStatus, currentUser, error, terms}) => {

  const loadingMore = networkStatus === 2;

  if (results && results.length) {

    const hasMore = totalCount > results.length;

    return (
      <div>
        {showHeader ? <Components.HospitalsListHeader/> : null}
        {error ? <Error error={Utils.decodeIntlError(error)} /> : null }
        
        {results.map(hospital => <Components.HospitalsItem hospital={hospital} key={hospital._id} currentUser={currentUser} terms={terms} />)}
      
        {showLoadMore ? 
          hasMore ? 
            <Components.HospitalsLoadMore loading={loadingMore} loadMore={loadMore} count={count} totalCount={totalCount} /> : 
            null : 
          null
        }
      </div>
    )
  } else if (loading) {
    return (
      <div>
        {showHeader ? <Components.HospitalsListHeader /> : null}
        {error ? <Error error={Utils.decodeIntlError(error)} /> : null }
        
        <Components.Loading/>
      </div>
    )
  } else {
    return (
      <div>
        {showHeader ? <Components.HospitalsListHeader /> : null}
        {error ? <Error error={Utils.decodeIntlError(error)} /> : null }
        
        <Components.HospitalsNoResults/>
      </div>
    )  
  }
  
};

HospitalsList.displayName = "HospitalsList";

HospitalsList.propTypes = {
  results: PropTypes.array,
  terms: PropTypes.object,
  hasMore: PropTypes.bool,
  loading: PropTypes.bool,
  count: PropTypes.number,
  totalCount: PropTypes.number,
  loadMore: PropTypes.func,
  showHeader: PropTypes.bool,
};

HospitalsList.contextTypes = {
  intl: intlShape
};

const options = {
  collection: Hospitals,
  queryName: 'hospitalsListQuery',
  fragmentName: 'HospitalsList',
};

registerComponent('HospitalsList', HospitalsList, withCurrentUser, [withList, options]);
