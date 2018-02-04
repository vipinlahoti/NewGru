import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';
import Button from 'react-bootstrap/lib/Button';

const HospitalsNewButton = (props, context) => {

  const button = <Button className="btn-floating pull-right waves-effect waves-light"><Components.Icon name="add"/></Button>;
  
  return (
    <Components.ModalTrigger size='large' title={context.intl.formatMessage({ id: 'hospitals.new_hospital' })} component={button}>
      <Components.HospitalsNewForm />
    </Components.ModalTrigger>
  )
}

HospitalsNewButton.displayName = 'HospitalsNewButton';

HospitalsNewButton.contextTypes = {
  messages: PropTypes.object,
  intl: intlShape
};

registerComponent('HospitalsNewButton', HospitalsNewButton);
