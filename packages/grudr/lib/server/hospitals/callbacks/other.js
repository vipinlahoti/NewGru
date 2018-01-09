/*

Callbacks to:

- Increment a user's hospital count
- Run hospital approved callbacks
- Update a user's hospital count
- Remove a user's hospitals when it's deleted
- Track clicks

*/

import { Hospitals } from '../../../modules/hospitals/index.js'
import Users from 'meteor/vulcan:users';
import { addCallback, getSetting, registerSetting, runCallbacks, runCallbacksAsync } from 'meteor/vulcan:core';
import Events from 'meteor/vulcan:events';

registerSetting('forum.trackClickEvents', true, 'Track clicks to hospitals pages');

/**
 * @summary Increment the user's hospital count
 */
function HospitalsNewIncrementHospitalCount (hospital) {
  var userId = hospital.userId;
  Users.update({_id: userId}, {$inc: {'hospitalCount': 1}});
}
addCallback('hospitals.new.async', HospitalsNewIncrementHospitalCount);

//////////////////////////////////////////////////////
// hospitals.edit.sync                                  //
//////////////////////////////////////////////////////

function HospitalsEditRunHospitalApprovedSyncCallbacks (modifier, hospital) {
  if (modifier.$set && Hospitals.isApproved(modifier.$set) && !Hospitals.isApproved(hospital)) {
    modifier = runCallbacks('hospitals.approve.sync', modifier, hospital);
  }
  return modifier;
}
addCallback('hospitals.edit.sync', HospitalsEditRunHospitalApprovedSyncCallbacks);

//////////////////////////////////////////////////////
// hospitals.edit.async                                 //
//////////////////////////////////////////////////////

function HospitalsEditRunHospitalApprovedAsyncCallbacks (hospital, oldHospital) {
  if (Hospitals.isApproved(hospital) && !Hospitals.isApproved(oldHospital)) {
    runCallbacksAsync('hospitals.approve.async', hospital);
  }
}
addCallback('hospitals.edit.async', HospitalsEditRunHospitalApprovedAsyncCallbacks);

//////////////////////////////////////////////////////
// hospitals.remove.sync                                //
//////////////////////////////////////////////////////

function HospitalsRemoveOperations (hospital) {
  Users.update({_id: hospital.userId}, {$inc: {'hospitalCount': -1}});
  return hospital;
}
addCallback('hospitals.remove.sync', HospitalsRemoveOperations);

//////////////////////////////////////////////////////
// users.remove.async                               //
//////////////////////////////////////////////////////

function UsersRemoveDeleteHospitals (user, options) {
  if (options.deleteHospitals) {
    Hospitals.remove({userId: user._id});
  } else {
    // not sure if anything should be done in that scenario yet
    // Hospitals.update({userId: userId}, {$set: {author: '\[deleted\]'}}, {multi: true});
  }
}
addCallback('users.remove.async', UsersRemoveDeleteHospitals);

//////////////////////////////////////////////////////
// hospitals.click.async                                //
//////////////////////////////////////////////////////

// /**
//  * @summary Increase the number of clicks on a hospital
//  * @param {string} hospitalId – the ID of the hospital being edited
//  * @param {string} ip – the IP of the current user
//  */
Hospitals.increaseClicks = (hospital, ip) => {
  const clickEvent = {
    name: 'click',
    properties: {
      hospitalId: hospital._id,
      ip: ip
    }
  };

  if (getSetting('forum.trackClickEvents', true)) {
    // make sure this IP hasn't previously clicked on this hospital
    const existingClickEvent = Events.findOne({name: 'click', 'properties.hospitalId': hospital._id, 'properties.ip': ip});

    if(!existingClickEvent) {
      // Events.log(clickEvent); // Sidebar only: don't log event
      return Hospitals.update(hospital._id, { $inc: { clickCount: 1 }});
    }
  } else {
    return Hospitals.update(hospital._id, { $inc: { clickCount: 1 }});
  }
};

function HospitalsClickTracking(hospital, ip) {
  return Hospitals.increaseClicks(hospital, ip);
}

// track links clicked, locally in Events collection
// note: this event is not sent to segment cause we cannot access the current user 
// in our server-side route /out -> sending an event would create a new anonymous 
// user: the free limit of 1,000 unique users per month would be reached quickly
addCallback('hospitals.click.async', HospitalsClickTracking);

//////////////////////////////////////////////////////
// hospitals.approve.sync                              //
//////////////////////////////////////////////////////

function HospitalsApprovedSetPostedAt (modifier, hospital) {
  modifier.postedAt = new Date();
  return modifier;
}
addCallback('hospitals.approve.sync', HospitalsApprovedSetPostedAt);
