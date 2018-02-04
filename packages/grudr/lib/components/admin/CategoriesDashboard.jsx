/*

Show a list of all posts

http://docs.vulcanjs.org/core-components.html#Datatable

*/

import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';
import compose from 'recompose/compose';
import { FormattedMessage } from 'meteor/vulcan:i18n';

import { Categories } from '../../modules/categories/index.js';

const CategoriesDashboard = () =>

  <div>
    <Components.Datatable
      collection={Categories}
      columns={[
        'name',
        'description',
        'slug',
      ]}
      showEdit={true}
    />
  </div>

registerComponent('CategoriesDashboard', CategoriesDashboard);
