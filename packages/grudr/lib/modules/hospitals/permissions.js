/*
 * Hospitals permissions
 */

import Users from 'meteor/vulcan:users';

const guestsActions = [
  'hospitals.view.approved',
  'hospitals.upvote', 
  'hospitals.downvote'
];
Users.groups.guests.can(guestsActions);

Users.createGroup("doctors");
const membersActions = [
  'hospitals.new', 
  'hospitals.edit.own', 
  'hospitals.remove.own'
];
Users.groups.doctors.can(membersActions);

const adminActions = [
  'hospitals.view.pending',
  'hospitals.view.rejected',
  'hospitals.view.spam',
  'hospitals.view.deleted',
  'hospitals.new.approved',
  'hospitals.edit.all',
  'hospitals.remove.all'
];
Users.groups.admins.can(adminActions);
