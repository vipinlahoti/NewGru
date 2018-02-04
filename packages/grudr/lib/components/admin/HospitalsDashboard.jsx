/*
 * Show a list of all hospitals
 */

import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';
import compose from 'recompose/compose';
import { FormattedMessage } from 'meteor/vulcan:i18n';

import { Hospitals } from '../../modules/hospitals/index.js';

const HospitalsDashboard = () =>

  <div>
    <Components.Datatable
      collection={Hospitals}
      columns={[
        'name',
        'createdAt',
      ]}
      showEdit={true}
    />
  </div>

registerComponent('HospitalsDashboard', HospitalsDashboard);
