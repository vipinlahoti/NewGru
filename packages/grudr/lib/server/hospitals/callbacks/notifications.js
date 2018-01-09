/*

Notifications for new hospitals and hospital approval.

*/

import { Hospitals } from '../../../modules/hospitals/index.js'
import Users from 'meteor/vulcan:users';
import { addCallback } from 'meteor/vulcan:core';
import { createNotification } from '../../email/notifications.js';

/**
 * @summary Add notification callback when a hospital is approved
 */
function HospitalsApprovedNotification (hospital) {
  createNotification(hospital.userId, 'hospitalApproved', {documentId: hospital._id});
}
addCallback('hospitals.approve.async', HospitalsApprovedNotification);


/**
 * @summary Add new hospital notification callback on hospital submit
 */
function HospitalsNewNotifications (hospital) {

  let adminIds = _.pluck(Users.adminUsers({fields: {_id:1}}), '_id');
  let notifiedUserIds = _.pluck(Users.find({'notifications_hospitals': true}, {fields: {_id:1}}).fetch(), '_id');

  // remove hospital author ID from arrays
  adminIds = _.without(adminIds, hospital.userId);
  notifiedUserIds = _.without(notifiedUserIds, hospital.userId);

  if (hospital.status === Hospitals.config.STATUS_PENDING && !!adminIds.length) {
    // if hospital is pending, only notify admins
    createNotification(adminIds, 'newPendingHospital', {documentId: hospital._id});
  } else if (!!notifiedUserIds.length) {
    // if hospital is approved, notify everybody
    createNotification(notifiedUserIds, 'newHospital', {documentId: hospital._id});
  }

}
addCallback('hospitals.new.async', HospitalsNewNotifications);
