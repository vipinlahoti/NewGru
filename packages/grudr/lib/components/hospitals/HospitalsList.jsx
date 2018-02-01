import { Components, registerComponent, withList, withCurrentUser, Utils } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import { Hospitals } from '../../modules/hospitals/index.js';
import Alert from 'react-bootstrap/lib/Alert'
import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';
import classNames from 'classnames';
import { Link } from 'react-router';


const Error = ({error}) => <Alert className="flash-message" bsStyle="danger"><FormattedMessage id={error.id} values={{value: error.value}}/>{error.message}</Alert>

const HospitalsList = ({className, results, loading, count, totalCount, loadMore, showHeader = false, showLoadMore = true, networkStatus, currentUser, error, terms}) => {

  const loadingMore = networkStatus === 2;

  if (results && results.length) {

    const hasMore = totalCount > results.length;

    return (
      <p className="title profile-certificates">
        {results.map(hospital => 
          <Link to={Hospitals.getPageUrl(hospital)} key={hospital._id}>
            {hospital.name}
          </Link>
        )}
      </p>
    )
  } else if (loading) {
    return (
      <div>
        <Components.Loading/>
      </div>
    )
  } else {
    return (
      <div>
        {error ? <Error error={Utils.decodeIntlError(error)} /> : null }
        <div className="hospitals-list-content">
          <p className="hospitals-no-results"><FormattedMessage id="hospitals.no_results"/></p>
        </div>
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
