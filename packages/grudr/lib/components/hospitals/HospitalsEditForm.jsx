import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Components, registerComponent, withMessages, withCurrentUser } from 'meteor/vulcan:core';
import { intlShape } from 'meteor/vulcan:i18n';
import { Hospitals } from '../../modules/hospitals/index.js';
import Users from "meteor/vulcan:users";
import { withRouter } from 'react-router'

class HospitalsEditForm extends PureComponent {

  renderAdminArea() {
    return (
      <Components.ShowIf check={Hospitals.options.mutations.edit.check} document={this.props.hospital}>
        <div className="hospitals-edit-form-admin">
          <div className="hospitals-edit-form-id">ID: {this.props.hospital._id}</div>
          <Components.HospitalsStats hospital={this.props.hospital} />
        </div>
      </Components.ShowIf>
    )
  }

  render() {

    return (
      <div className="hospitals-edit-form">
        {Users.isAdmin(this.props.currentUser) ? this.renderAdminArea() : null}
        <Components.SmartForm
          layout="vertical"
          collection={Hospitals}
          documentId={this.props.hospital._id}
          successCallback={hospital => {
            this.props.closeModal();
            this.props.flash(this.context.intl.formatMessage({ id: 'hospitals.edit_success' }, { title: hospital.title }), 'success');
          }}
          showRemove={false}
        />
      </div>
    );

  }
}

HospitalsEditForm.propTypes = {
  closeModal: PropTypes.func,
  flash: PropTypes.func,
  hospital: PropTypes.object.isRequired,
}

HospitalsEditForm.contextTypes = {
  intl: intlShape
}

registerComponent('HospitalsEditForm', HospitalsEditForm, withMessages, withRouter, withCurrentUser);
