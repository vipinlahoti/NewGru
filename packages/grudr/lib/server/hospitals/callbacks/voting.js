/*

Voting callbacks

*/

import { Hospitals } from '../../../modules/hospitals/index.js';
import Users from 'meteor/vulcan:users';
import { addCallback } from 'meteor/vulcan:core';
import { performVoteServer } from 'meteor/vulcan:voting';

/**
 * @summary Make users upvote their own new hospitals
 */
function HospitalsNewUpvoteOwnHospital(hospital) {
  var hospitalAuthor = Users.findOne(hospital.userId);
  return {...hospital, ...performVoteServer({ document: hospital, voteType: 'upvote', collection: Hospitals, user: hospitalAuthor })};
}

addCallback('hospitals.new.after', HospitalsNewUpvoteOwnHospital);
