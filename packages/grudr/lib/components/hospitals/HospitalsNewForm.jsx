import { Components, registerComponent, getRawComponent, getFragment, withMessages, withList } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, FormattedMessage } from 'meteor/vulcan:i18n';
import { withRouter } from 'react-router'
import { Hospitals } from '../../modules/hospitals/index.js';

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
      <div className="hospitals-new-form">
        <Components.SmartForm
          layout="vertical"
          collection={Hospitals}
          mutationFragment={getFragment('HospitalsPage')}
          successCallback={hospital => {
            props.closeModal();
            props.router.push({pathname: props.redirect || Hospitals.getPageUrl(hospital)});
            props.flash(context.intl.formatMessage({id: "hospitals.created_message"}), "success");
          }}
        />
      </div>
    </Components.ShowIf>
  );
};

HospitalsNewForm.propTypes = {
  closeModal: PropTypes.func,
  router: PropTypes.object,
  flash: PropTypes.func,
  redirect: PropTypes.string,
}

HospitalsNewForm.contextTypes = {
  closeCallback: PropTypes.func,
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
