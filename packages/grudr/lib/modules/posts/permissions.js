/*

Posts permissions

*/

import Users from 'meteor/vulcan:users';

const guestsActions = [
  'posts.view.approved'
];
Users.groups.guests.can(guestsActions);


const membersActions = [
  'posts.upvote', 
  'posts.downvote',
];
Users.groups.members.can(membersActions);


// Article Writer
// Users.createGroup("writers");
const writersActions = [
  'posts.new',
  'posts.edit.own', 
  'posts.remove.own',
];
Users.groups.writers.can(writersActions);


// Admin permissions
const adminsActions = [
  'posts.view.pending',
  'posts.view.rejected',
  'posts.view.spam',
  'posts.view.deleted',
  // 'posts.new',
  'posts.new.approved',
  'posts.edit.all',
  'posts.remove.all'
];
Users.groups.admins.can(adminsActions);
