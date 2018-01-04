/*

Answers permissions

*/

import Users from 'meteor/vulcan:users';

const guestsActions = [
  'answers.view'
];
Users.groups.guests.can(guestsActions);

const membersActions = [
  'answers.view',
  'answers.new', 
  'answers.edit.own', 
  'answers.remove.own', 
  'answers.upvote', 
  'answers.cancelUpvote', 
  'answers.downvote',
  'answers.cancelDownvote'
];
Users.groups.members.can(membersActions);

const adminActions = [
  'answers.edit.all',
  'answers.remove.all'
];
Users.groups.admins.can(adminActions);
