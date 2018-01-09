/*

Hospital validation and rate limiting callbacks

*/

import { Hospitals } from '../../../modules/hospitals/index.js'
import Users from 'meteor/vulcan:users';
import { addCallback, getSetting, registerSetting } from 'meteor/vulcan:core';
import { createError } from 'apollo-errors';

registerSetting('forum.hospitalInterval', 30, 'How long users should wait between each hospitals, in seconds');
registerSetting('forum.maxHospitalsPerDay', 5, 'Maximum number of hospitals a user can create in a day');

/**
 * @summary Rate limiting
 */
function HospitalsNewRateLimit (hospital, user) {

  if(!Users.isAdmin(user)){

    var timeSinceLastHospital = Users.timeSinceLast(user, Hospitals),
      numberOfHospitalsInPast24Hours = Users.numberOfItemsInPast24Hours(user, Hospitals),
      hospitalInterval = Math.abs(parseInt(getSetting('forum.hospitalInterval', 30))),
      maxHospitalsPer24Hours = Math.abs(parseInt(getSetting('forum.maxHospitalsPerDay', 5)));

    // check that user waits more than X seconds between hospitals
    if(timeSinceLastHospital < hospitalInterval){
      const RateLimitError = createError('hospitals.rate_limit_error', {message: 'hospitals.rate_limit_error'});
      throw new RateLimitError({data: {break: true, value: hospitalInterval-timeSinceLastHospital}});
    }
    // check that the user doesn't hospital more than Y hospitals per day
    if(numberOfHospitalsInPast24Hours >= maxHospitalsPer24Hours){
      const RateLimitError = createError('hospitals.max_per_day', {message: 'hospitals.max_per_day'});
      throw new RateLimitError({data: {break: true, value: maxHospitalsPer24Hours}});
    }
  }

  return hospital;
}
addCallback('hospitals.new.validate', HospitalsNewRateLimit);

/**
 * @summary Check for duplicate links
 */
function HospitalsNewDuplicateLinksCheck (hospital, user) {
  if(!!hospital.url && Hospitals.checkForSameUrl(hospital.url)) {
    const DuplicateError = createError('hospitals.link_already_hospitaled', {message: 'hospitals.link_already_hospitaled'});
    throw new DuplicateError({data: {break: true, url: hospital.url}});
  }
  return hospital;
}
addCallback('hospitals.new.sync', HospitalsNewDuplicateLinksCheck);


/**
 * @summary Check for duplicate links
 */
function HospitalsEditDuplicateLinksCheck (modifier, hospital) {
  if(hospital.url !== modifier.$set.url && !!modifier.$set.url) {
    Hospitals.checkForSameUrl(modifier.$set.url);
  }
  return modifier;
}
addCallback('hospitals.edit.sync', HospitalsEditDuplicateLinksCheck);
