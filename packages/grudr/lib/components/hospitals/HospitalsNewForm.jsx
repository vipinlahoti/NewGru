import { Components, registerComponent, getRawComponent, getFragment, withMessages, withList } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, FormattedMessage } from 'meteor/vulcan:i18n';
import { withRouter } from 'react-router'
import { Hospitals } from '../../modules/hospitals/index.js';
import { Grid, Row, Col, Jumbotron } from 'react-bootstrap';


const HospitalsNewForm = (props, context) => {
  if (props.loading) {
    return <div className="hospitals-new-form"><Components.Loading/></div>;
  }
  return (
    <Components.ShowIf
      check={Hospitals.options.mutations.new.check}
      failureComponent={
        <div>
          <p className="hospitals-new-form-message">
            <FormattedMessage id="hospitals.sign_up_or_log_in_first" />
          </p>
          <Components.AccountsLoginForm />
        </div>
      }
    >
      <div>
        <Jumbotron>
          <Grid>
            <Row>
              <Col md={8}>
                <h3 className="title">Add a Hospital</h3>
                <h5>Meet the amazing team behind this project and find out more about how we work.</h5>
              </Col>
            </Row>
          </Grid>
        </Jumbotron>
        <div className="main">
          <Grid>
            <Row>
              <Col md={8} mdOffset={2}>
                <Components.SmartForm
                  layout="vertical"
                  collection={Hospitals}
                  mutationFragment={getFragment('HospitalsPage')}
                  successCallback={hospital => {
                    props.router.push({pathname: props.redirect || Hospitals.getPageUrl(hospital)});
                    props.flash(context.intl.formatMessage({id: "hospitals.created_message"}), "success");
                  }}
                />
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    </Components.ShowIf>
  );
};

HospitalsNewForm.propTypes = {
  router: PropTypes.object,
  flash: PropTypes.func,
  redirect: PropTypes.string,
}

HospitalsNewForm.contextTypes = {
  intl: intlShape
};

HospitalsNewForm.displayName = "HospitalsNewForm";

const options = {
  collectionName: 'Categories',
  queryName: 'categoriesListQuery',
  fragmentName: 'CategoriesList',
  limit: 0,
  pollInterval: 0,
};

registerComponent('HospitalsNewForm', HospitalsNewForm, withRouter, withMessages, [withList, options]);
