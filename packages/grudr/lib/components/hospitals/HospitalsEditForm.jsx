import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Components, registerComponent, getFragment, withMessages, withCurrentUser } from 'meteor/vulcan:core';
import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';
import { Hospitals } from '../../modules/hospitals/index.js';
import Users from "meteor/vulcan:users";
import { withRouter } from 'react-router'
import { Grid, Row, Col, Jumbotron } from 'react-bootstrap';

class HospitalsEditForm extends PureComponent {

  renderAdminArea() {
    return (
      <Components.ShowIf check={Hospitals.options.mutations.edit.check}
        document={this.props.params._id ? {_id: this.props.params._id} : {slug: this.props.params.slug}}
      >
        <div className="hospitals-edit-form-admin">
          <div className="hospitals-edit-form-id">ID: {this.props.params._id}</div>
          <Components.HospitalsStats hospital={this.props.params._id} />
        </div>
      </Components.ShowIf>
    )
  }

  render() {

    return (
      <div>
        <Jumbotron>
          <Grid>
            <Row>
              <Col md={8}>
                <h3 className="title"><FormattedMessage id="hospitals.editing"/></h3>
              </Col>
            </Row>
          </Grid>
        </Jumbotron>

        <div className="main">
          <Grid>
            <Row>
              <Col md={8} mdOffset={2}>
                <Components.ShowIf
                  check={Hospitals.options.mutations.edit.check}
                  document={this.props.params._id ? {_id: this.props.params._id} : {slug: this.props.params.slug}}
                  failureComponent={<FormattedMessage id="app.noPermission"/>}
                >
                  <div>
                    {Users.isAdmin(this.props.currentUser) ? this.renderAdminArea() : null}
                    <Components.SmartForm
                      collection={Hospitals}
                      documentId={this.props.params._id}
                      successCallback={hospital => {
                        // this.props.closeModal();
                        this.props.router.push({pathname: this.props.redirect || Hospitals.getPageUrl(hospital)});
                        this.props.flash(this.context.intl.formatMessage({ id: 'hospitals.edit_success' }, { title: hospital.title }), 'success');
                      }}
                      removeSuccessCallback={({ documentId, documentTitle }) => {
                        // hospital edit form is being included from a single hospital, redirect to index
                        // note: this.props.params is in the worst case an empty obj (from react-router)
                        if (this.props.params._id) {
                          this.props.router.push('/hospitals');
                        }

                        const deleteDocumentSuccess = this.context.intl.formatMessage({ id: 'hospitals.delete_success' }, { title: documentTitle });
                        this.props.flash(deleteDocumentSuccess, 'success');
                        // todo: handle events in collection callbacks
                        // this.context.events.track("hospital deleted", {_id: documentId});
                      }}
                      showRemove={false}
                    />
                  </div>
                </Components.ShowIf>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );

  }
}

HospitalsEditForm.propTypes = {
  // closeModal: PropTypes.func,
  flash: PropTypes.func,
  // hospital: PropTypes.object.isRequired,
}

HospitalsEditForm.contextTypes = {
  intl: intlShape
}

registerComponent('HospitalsEditForm', HospitalsEditForm, withMessages, withRouter, withCurrentUser);
