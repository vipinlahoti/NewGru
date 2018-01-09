import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { withList, withCurrentUser, Components, registerComponent, Utils } from 'meteor/vulcan:core';
import { HosReviews } from '../../modules/hosReviews/index.js';
import { Row, Col } from 'react-bootstrap';

const HospitalsHosReviewsThread = (props, /* context*/) => {

  const {loading, terms: { hospitalId }, results, totalCount, currentUser} = props;
  
  if (loading) {
  
    return <div className="hospitals-hosReviews-thread"><Components.Loading/></div>
  
  } else {
    
    const resultsClone = _.map(results, _.clone); // we don't want to modify the objects we got from props
    const nestedHosReviews = Utils.unflatten(resultsClone, {idProperty: '_id', parentIdProperty: 'parentHosReviewId'});

    return (
      <div className="section-hosReviews">
        <Row>
          <Col md={8} mdOffset={2}>
            <div className="media-area">
              {(totalCount > 0) ?
                <div>
                  <div className="section-half">
                    <h4 className="title center-align">{totalCount} <FormattedMessage id="hosReviews.hosReviews"/></h4>
                  </div>
                  <Components.HosReviewsList currentUser={currentUser} hosReviews={nestedHosReviews} hosReviewCount={totalCount}/>
                </div>
              : null }
              
              {!!currentUser ?
                <div>
                  <h4 className="title center-align"><FormattedMessage id="hosReviews.new"/></h4>
                  <Components.HosReviewsNewForm
                    hospitalId={hospitalId} 
                    type="hosReview" 
                  />
                </div> :
                <Components.ModalTrigger size="small" component={<a href="" className="title"><FormattedMessage id="hosReviews.please_log_in"/></a>}>
                  <Components.AccountsLoginForm/>
                </Components.ModalTrigger>
              }
            </div>
          </Col>
        </Row>
      </div>
    );
  }
};


HospitalsHosReviewsThread.displayName = 'HospitalsHosReviewsThread';

HospitalsHosReviewsThread.propTypes = {
  currentUser: PropTypes.object
};

const options = {
  collection: HosReviews,
  queryName: 'hosReviewsListQuery',
  fragmentName: 'HosReviewsList',
  limit: 0,
};

registerComponent('HospitalsHosReviewsThread', HospitalsHosReviewsThread, [withList, options], withCurrentUser);
