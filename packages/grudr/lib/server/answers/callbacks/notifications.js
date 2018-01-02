/*

Answer notification callbacks

*/

import Users from 'meteor/vulcan:users';
import { addCallback } from 'meteor/vulcan:core';
import { createNotification } from '../../email/notifications.js';
import { Questions } from '../../../modules/questions/index.js';
import { Answers } from '../../../modules/answers/index.js';

// add new answer notification callback on answer submit
function AnswersNewNotifications (answer) {

  // note: dummy content has disableNotifications set to true
  if(Meteor.isServer && !answer.disableNotifications) {

    const question = Questions.findOne(answer.questionId);
    const questionAuthor = Users.findOne(question.userId);


    let userIdsNotified = [];

    // 1. Notify author of question (if they have new answer notifications turned on)
    //    but do not notify author of question if they're the ones questioning the answer
    if (Users.getSetting(questionAuthor, 'notifications_answers', false) && answer.userId !== questionAuthor._id) {
      createNotification(question.userId, 'newAnswer', {documentId: answer._id});
      userIdsNotified.push(question.userId);
    }

    // 2. Notify author of answer being replied to
    if (!!answer.parentAnswerId) {

      const parentAnswer = Answers.findOne(answer.parentAnswerId);

      // do not notify author of parent answer if they're also question author or answer author
      // (someone could be replying to their own answer)
      if (parentAnswer.userId !== question.userId && parentAnswer.userId !== answer.userId) {

        const parentAnswerAuthor = Users.findOne(parentAnswer.userId);

        // do not notify parent answer author if they have reply notifications turned off
        if (Users.getSetting(parentAnswerAuthor, 'notifications_replies', false)) {
          createNotification(parentAnswer.userId, 'newReply', {documentId: parentAnswer._id});
          userIdsNotified.push(parentAnswer.userId);
        }
      }

    }

  }
}
addCallback('answers.new.async', AnswersNewNotifications);
