import { Components, registerComponent, getRawComponent, getFragment, withMessages } from 'meteor/vulcan:core';
import { Hospitals } from '../../modules/hospitals/index.js';
import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, FormattedMessage } from 'meteor/vulcan:i18n';
import { withRouter } from 'react-router'
import { Grid, Row, Col, Jumbotron } from 'react-bootstrap';

const HospitalsNewForm = (props, context) => 
  <div>
    <Jumbotron>
      <Grid>
        <Row>
          <Col md={8}>
            <h3 className="title"><FormattedMessage id="hospitals.new_hospital"/></h3>
          </Col>
        </Row>
      </Grid>
    </Jumbotron>

    <div className="main">
      <Grid>
        <Row>
          <Col md={8} mdOffset={2}>
            <Components.ShowIf
              check={Hospitals.options.mutations.new.check}
              failureComponent={<div><p className="hospitals-new-form-message"><FormattedMessage id="hospitals.sign_up_or_log_in_first" /></p><Components.AccountsLoginForm /></div>}
            >
              <div className="hospitals-new-form">
                <Components.SmartForm
                  collection={Hospitals}
                  mutationFragment={getFragment('HospitalsPage')}
                  successCallback={hospital => {
                    // props.closeModal();
                    props.router.push({pathname: props.redirect || Hospitals.getPageUrl(hospital)});
                    props.flash(context.intl.formatMessage({id: "hospitals.created_message"}), "success");
                  }}
                />
              </div>
            </Components.ShowIf>
          </Col>
        </Row>
      </Grid>
    </div>
  </div>

HospitalsNewForm.propTypes = {
  // closeModal: React.PropTypes.func,
  router: React.PropTypes.object,
  flash: React.PropTypes.func,
  redirect: React.PropTypes.string,
}

HospitalsNewForm.contextTypes = {
  closeCallback: PropTypes.func,
  intl: intlShape
};

HospitalsNewForm.displayName = "HospitalsNewForm";

registerComponent('HospitalsNewForm', HospitalsNewForm, withRouter, withMessages);
