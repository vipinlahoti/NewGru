/*
 * Notifications for new hospitals and hospital approval.
 */

import Users from 'meteor/vulcan:users';
import { addCallback } from 'meteor/vulcan:core';
import { createNotification } from '../../email/notifications.js';

/**
 * @summary Add new hospital notification callback on hospital submit
 */
function HospitalsNewNotifications (hospital) {

  let adminIds = _.pluck(Users.adminUsers({fields: {_id:1}}), '_id');

  // remove hospital author ID from arrays
  adminIds = _.without(adminIds, hospital.userId);

  if (!!adminIds.length) {
    // if hospital is pending, only notify admins
    createNotification(adminIds, 'newPendingHospital', {documentId: hospital._id});
  }

}
addCallback('hospitals.new.async', HospitalsNewNotifications);
