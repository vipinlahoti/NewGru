/*
 * Reviews permissions
 */

import Users from 'meteor/vulcan:users';

const guestsActions = [
  'reviews.view'
];
Users.groups.guests.can(guestsActions);

const membersActions = [
  'reviews.view',
  'reviews.new', 
  'reviews.edit.own', 
  'reviews.remove.own', 
  'reviews.upvote', 
  'reviews.cancelUpvote', 
  'reviews.downvote',
  'reviews.cancelDownvote'
];
Users.groups.members.can(membersActions);

const adminActions = [
  'reviews.edit.all',
  'reviews.remove.all'
];
Users.groups.admins.can(adminActions);
