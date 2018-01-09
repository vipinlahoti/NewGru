/*

Hospitals helpers

*/

import moment from 'moment';
import { Hospitals } from './collection.js';
import Users from 'meteor/vulcan:users';
import { Utils, getSetting, registerSetting } from 'meteor/vulcan:core';

registerSetting('forum.requireHospitalsApproval', false, 'Require hospitals to be approved manually');
registerSetting('siteUrl', null, 'Main site URL');

//////////////////
// Link Helpers //
//////////////////

/**
 * @summary Get URL of a hospital page.
 * @param {Object} hospital
 */
Hospitals.getPageUrl = function(hospital, isAbsolute = false){
  const prefix = isAbsolute ? Utils.getSiteUrl().slice(0,-1) : '';
  return `${prefix}/hospitals/${hospital._id}/${hospital.slug}`;
};


/**
 * @summary Get URL of a edit hospital page.
 * @param {Object} hospital
 */
Hospitals.getEditPageUrl = function(hospital, isAbsolute = false){
  const prefix = isAbsolute ? Utils.getSiteUrl().slice(0,-1) : '';
  return `${prefix}/hospitals/${hospital._id}/${hospital.slug}/edit`;
};

///////////////////
// Other Helpers //
///////////////////

/**
 * @summary Get a hospital author's name
 * @param {Object} hospital
 */
Hospitals.getAuthorName = function (hospital) {
  var user = Users.findOne(hospital.userId);
  if (user) {
    return Users.getDisplayName(user);
  } else {
    return hospital.author;
  }
};

/**
 * @summary Get default status for new hospitals.
 * @param {Object} user
 */
Hospitals.getDefaultStatus = function (user) {
  const canHospitalApproved = typeof user === 'undefined' ? false : Users.canDo(user, 'hospitals.new.approved');
  if (!getSetting('forum.requireHospitalsApproval', false) || canHospitalApproved) {
    // if user can hospital straight to 'approved', or else hospital approval is not required
    return Hospitals.config.STATUS_APPROVED;
  } else {
    return Hospitals.config.STATUS_PENDING;
  }
};

/**
 * @summary Get status name
 * @param {Object} user
 */
Hospitals.getStatusName = function (hospital) {
  return Utils.findWhere(Hospitals.statuses, {value: hospital.status}).label;
};

/**
 * @summary Check if a hospital is approved
 * @param {Object} hospital
 */
Hospitals.isApproved = function (hospital) {
  return hospital.status === Hospitals.config.STATUS_APPROVED;
};

/**
 * @summary Check if a hospital is pending
 * @param {Object} hospital
 */
Hospitals.isPending = function (hospital) {
  return hospital.status === Hospitals.config.STATUS_PENDING;
};

/**
 * @summary When on a hospital page, return the current hospital
 */
Hospitals.current = function () {
  return Hospitals.findOne('foo');
};

/**
 * @summary Check to see if a hospital is a link to a video
 * @param {Object} hospital
 */
Hospitals.isVideo = function (hospital) {
  return hospital.media && hospital.media.type === 'video';
};

/**
 * @summary Get the complete thumbnail url whether it is hosted on Embedly or on an external website, or locally in the app.
 * @param {Object} hospital
 */
Hospitals.getThumbnailUrl = (hospital) => {
  const thumbnailUrl = hospital.thumbnailUrl;
  if (!!thumbnailUrl) {
    return thumbnailUrl.indexOf('//') > -1 ? Utils.addHttp(thumbnailUrl) : Utils.getSiteUrl().slice(0,-1) + thumbnailUrl;
  }
};
