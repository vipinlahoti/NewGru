/*

Hospitals permissions

*/

import Users from 'meteor/vulcan:users';

const guestsActions = [
  'hospitals.view.approved'
];
Users.groups.guests.can(guestsActions);

const membersActions = [
  'hospitals.upvote', 
  'hospitals.downvote',
];
Users.groups.members.can(membersActions);

// Users.createGroup("doctors");
const doctorsActions = [
  'hospitals.new',
  'hospitals.edit.own', 
  'hospitals.remove.own'
];
Users.groups.doctors.can(doctorsActions);


const adminsActions = [
  'hospitals.view.pending',
  'hospitals.view.rejected',
  'hospitals.view.spam',
  'hospitals.view.deleted',
  'hospitals.new.approved',
  'hospitals.edit.all',
  'hospitals.remove.all'
];
Users.groups.admins.can(adminsActions);
