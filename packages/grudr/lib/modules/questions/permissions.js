/*

Questions permissions

*/

import Users from 'meteor/vulcan:users';

const guestsActions = [
  'questions.view.approved'
];
Users.groups.guests.can(guestsActions);

const membersActions = [
  'questions.new',
  'questions.edit.own', 
  'questions.remove.own',
  'questions.upvote', 
  'questions.downvote',
];
Users.groups.members.can(membersActions);

const adminActions = [
  'questions.view.pending',
  'questions.view.rejected',
  'questions.view.spam',
  'questions.view.deleted',
  'questions.new',
  'questions.new.approved',
  'questions.edit.all',
  'questions.remove.all'
];
Users.groups.admins.can(adminActions);
