/*

Hospitals collection

*/

import schema from './schema.js';
import { createCollection, getDefaultResolvers, getDefaultMutations } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';

/**
 * @summary The global namespace for Hospitals.
 * @namespace Hospitals
 */
export const Hospitals = createCollection({

  collectionName: 'Hospitals',

  typeName: 'Hospital',

  schema,

  resolvers: getDefaultResolvers('Hospitals'),

  mutations: getDefaultMutations('Hospitals'),

});

// refactor: moved here from schema.js
Hospitals.config = {};

Hospitals.config.STATUS_PENDING = 1;
Hospitals.config.STATUS_APPROVED = 2;
Hospitals.config.STATUS_REJECTED = 3;
Hospitals.config.STATUS_SPAM = 4;
Hospitals.config.STATUS_DELETED = 5;


/**
 * @summary Hospitals statuses
 * @type {Object}
 */
Hospitals.statuses = [
  {
    value: 1,
    label: 'pending'
  },
  {
    value: 2,
    label: 'approved'
  },
  {
    value: 3,
    label: 'rejected'
  },
  {
    value: 4,
    label: 'spam'
  },
  {
    value: 5,
    label: 'deleted'
  }
];

Hospitals.checkAccess = (currentUser, hospital) => {
  if (Users.isAdmin(currentUser) || Users.owns(currentUser, hospital)) { // admins can always see everything, users can always see their own hospitals
    return true;
  } else if (hospital.isFuture) {
    return false;
  } else { 
    const status = _.findWhere(Hospitals.statuses, {value: hospital.status});
    return Users.canDo(currentUser, `hospitals.view.${status.label}`);
  }
}
