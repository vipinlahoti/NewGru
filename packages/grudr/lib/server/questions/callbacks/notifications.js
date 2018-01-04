/*

Notifications for new questions and question approval.

*/

import { Questions } from '../../../modules/questions/index.js'
import Users from 'meteor/vulcan:users';
import { addCallback } from 'meteor/vulcan:core';
import { createNotification } from '../../email/notifications.js';

/**
 * @summary Add notification callback when a question is approved
 */
function QuestionsApprovedNotification (question) {
  createNotification(question.userId, 'questionApproved', {documentId: question._id});
}
addCallback('questions.approve.async', QuestionsApprovedNotification);


/**
 * @summary Add new question notification callback on question submit
 */
function QuestionsNewNotifications (question) {

  let adminIds = _.pluck(Users.adminUsers({fields: {_id:1}}), '_id');
  let notifiedUserIds = _.pluck(Users.find({'notifications_questions': true}, {fields: {_id:1}}).fetch(), '_id');

  // remove question author ID from arrays
  adminIds = _.without(adminIds, question.userId);
  notifiedUserIds = _.without(notifiedUserIds, question.userId);

  if (question.status === Questions.config.STATUS_PENDING && !!adminIds.length) {
    // if question is pending, only notify admins
    createNotification(adminIds, 'newPendingQuestion', {documentId: question._id});
  } else if (!!notifiedUserIds.length) {
    // if question is approved, notify everybody
    createNotification(notifiedUserIds, 'newQuestion', {documentId: question._id});
  }

}
addCallback('questions.new.async', QuestionsNewNotifications);
