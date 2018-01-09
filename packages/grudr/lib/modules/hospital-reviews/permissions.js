/*

HosReviews permissions

*/

import Users from 'meteor/vulcan:users';

const guestsActions = [
  'hosReviews.view'
];
Users.groups.guests.can(guestsActions);

const membersActions = [
  'hosReviews.view',
  'hosReviews.new', 
  'hosReviews.edit.own', 
  'hosReviews.remove.own', 
  'hosReviews.upvote', 
  'hosReviews.cancelUpvote', 
  'hosReviews.downvote',
  'hosReviews.cancelDownvote'
];
Users.groups.members.can(membersActions);

const adminActions = [
  'hosReviews.edit.all',
  'hosReviews.remove.all'
];
Users.groups.admins.can(adminActions);
