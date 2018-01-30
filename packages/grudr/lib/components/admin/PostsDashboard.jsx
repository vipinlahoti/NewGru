/*

Show a list of all posts

http://docs.vulcanjs.org/core-components.html#Datatable

*/

import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';
import compose from 'recompose/compose';
import { FormattedMessage } from 'meteor/vulcan:i18n';

import { Posts } from '../../modules/posts/index.js';

const PostsDashboard = () =>

  <div>
    <Components.Datatable
      collection={Posts}
      columns={[
        'title',
        'postedAt',
        'author',
        'status',
      ]}
      showEdit={true}
    />
  </div>

registerComponent('PostsDashboard', PostsDashboard);
