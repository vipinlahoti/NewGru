// ------------------------------------------------------------------------------------------- //
// -----------------------------------------  Articles ------------------------------------------ //
// ------------------------------------------------------------------------------------------- //

// add new article notification callback on article submit
function articleSubmitNotification (article) {

  var adminIds = _.pluck(Users.adminUsers({fields: {_id:1}}), '_id');
  var notifiedUserIds = _.pluck(Users.find({'grudr.notifications.articles': true}, {fields: {_id:1}}).fetch(), '_id');
  var notificationData = {
    article: _.pick(article, '_id', 'userId', 'title', 'url')
  };

  // remove article author ID from arrays
  adminIds = _.without(adminIds, article.userId);
  notifiedUserIds = _.without(notifiedUserIds, article.userId);

  if (article.status === Articles.config.STATUS_PENDING && !!adminIds.length) {
    // if article is pending, only notify admins
    Herald.createNotification(adminIds, {courier: 'newPendingArticle', data: notificationData});
  } else if (!!notifiedUserIds.length) {
    // if article is approved, notify everybody
    Herald.createNotification(notifiedUserIds, {courier: 'newArticle', data: notificationData});
  }

}
Grudr.callbacks.add("articleSubmitAsync", articleSubmitNotification);

function articleApprovedNotification (article) {

  var notificationData = {
    article: _.pick(article, '_id', 'userId', 'title', 'url')
  };

  Herald.createNotification(article.userId, {courier: 'articleApproved', data: notificationData});
}
Grudr.callbacks.add("articleApproveAsync", articleApprovedNotification);

// ------------------------------------------------------------------------------------------- //
// ---------------------------------------- Comments ----------------------------------------- //
// ------------------------------------------------------------------------------------------- //

// add new comment notification callback on comment submit
function commentSubmitNotifications (comment) {

  // note: dummy content has disableNotifications set to true
  if(Meteor.isServer && !comment.disableNotifications){

    var article = Articles.findOne(comment.articleId),
        articleAuthor = Users.findOne(article.userId),
        userIdsNotified = [],
        notificationData = {
          comment: _.pick(comment, '_id', 'userId', 'author', 'htmlBody'),
          article: _.pick(article, '_id', 'userId', 'title', 'url')
        };


    // 1. Notify author of article (if they have new comment notifications turned on)
    //    but do not notify author of article if they're the ones articleing the comment
    if (Users.getSetting(articleAuthor, "notifications.comments", true) && comment.userId !== articleAuthor._id) {
      Herald.createNotification(article.userId, {courier: 'newComment', data: notificationData});
      userIdsNotified.push(article.userId);
    }

    // 2. Notify author of comment being replied to
    if (!!comment.parentCommentId) {

      var parentComment = Comments.findOne(comment.parentCommentId);

      // do not notify author of parent comment if they're also article author or comment author
      // (someone could be replying to their own comment)
      if (parentComment.userId !== article.userId && parentComment.userId !== comment.userId) {

        var parentCommentAuthor = Users.findOne(parentComment.userId);

        // do not notify parent comment author if they have reply notifications turned off
        if (Users.getSetting(parentCommentAuthor, "notifications.replies", true)) {

          // add parent comment to notification data
          notificationData.parentComment = _.pick(parentComment, '_id', 'userId', 'author', 'htmlBody');

          Herald.createNotification(parentComment.userId, {courier: 'newReply', data: notificationData});
          userIdsNotified.push(parentComment.userId);
        }
      }

    }

    // 3. Notify users subscribed to the thread
    // TODO: ideally this would be injected from the grudr-subscribe-to-articles package
    if (!!article.subscribers) {

      // remove userIds of users that have already been notified
      // and of comment author (they could be replying in a thread they're subscribed to)
      var subscriberIdsToNotify = _.difference(article.subscribers, userIdsNotified, [comment.userId]);
      Herald.createNotification(subscriberIdsToNotify, {courier: 'newCommentSubscribed', data: notificationData});

      userIdsNotified = userIdsNotified.concat(subscriberIdsToNotify);

    }

  }
}
Grudr.callbacks.add("commentSubmitAsync", commentSubmitNotifications);


// ------------------------------------------------------------------------------------------- //
// -----------------------------------------  Questions ------------------------------------------ //
// ------------------------------------------------------------------------------------------- //

// add new question notification callback on question submit
function questionSubmitNotification (question) {

  var adminIds = _.pluck(Users.adminUsers({fields: {_id:1}}), '_id');
  var notifiedUserIds = _.pluck(Users.find({'grudr.notifications.questions': true}, {fields: {_id:1}}).fetch(), '_id');
  var notificationData = {
    question: _.pick(question, '_id', 'userId', 'excerpt', 'url')
  };

  // remove question author ID from arrays
  adminIds = _.without(adminIds, question.userId);
  notifiedUserIds = _.without(notifiedUserIds, question.userId);

  if (question.status === Questions.config.STATUS_PENDING && !!adminIds.length) {
    // if question is pending, only notify admins
    Herald.createNotification(adminIds, {courier: 'newPendingQuestion', data: notificationData});
  } else if (!!notifiedUserIds.length) {
    // if question is approved, notify everybody
    Herald.createNotification(notifiedUserIds, {courier: 'newQuestion', data: notificationData});
  }

}
Grudr.callbacks.add("questionSubmitAsync", questionSubmitNotification);

function questionApprovedNotification (question) {

  var notificationData = {
    question: _.pick(question, '_id', 'userId', 'excerpt', 'url')
  };

  Herald.createNotification(question.userId, {courier: 'questionApproved', data: notificationData});
}
Grudr.callbacks.add("questionApproveAsync", questionApprovedNotification);

// ------------------------------------------------------------------------------------------- //
// ---------------------------------------- Answers ----------------------------------------- //
// ------------------------------------------------------------------------------------------- //

// add new answer notification callback on answer submit
function answerSubmitNotifications (answer) {

  // note: dummy content has disableNotifications set to true
  if(Meteor.isServer && !answer.disableNotifications){

    var question = Questions.findOne(answer.questionId),
        questionAuthor = Users.findOne(question.userId),
        userIdsNotified = [],
        notificationData = {
          answer: _.pick(answer, '_id', 'userId', 'author', 'htmlBody'),
          question: _.pick(question, '_id', 'userId', 'excerpt', 'url')
        };


    // 1. Notify author of question (if they have new answer notifications turned on)
    //    but do not notify author of question if they're the ones questioning the answer
    if (Users.getSetting(questionAuthor, "notifications.answers", true) && answer.userId !== questionAuthor._id) {
      Herald.createNotification(question.userId, {courier: 'newAnswer', data: notificationData});
      userIdsNotified.push(question.userId);
    }

    // 2. Notify author of answer being replied to
    if (!!answer.parentAnswerId) {

      var parentAnswer = Answers.findOne(answer.parentAnswerId);

      // do not notify author of parent answer if they're also question author or answer author
      // (someone could be replying to their own answer)
      if (parentAnswer.userId !== question.userId && parentAnswer.userId !== answer.userId) {

        var parentAnswerAuthor = Users.findOne(parentAnswer.userId);

        // do not notify parent answer author if they have reply notifications turned off
        if (Users.getSetting(parentAnswerAuthor, "notifications.replies", true)) {

          // add parent answer to notification data
          notificationData.parentAnswer = _.pick(parentAnswer, '_id', 'userId', 'author', 'htmlBody');

          Herald.createNotification(parentAnswer.userId, {courier: 'newReply', data: notificationData});
          userIdsNotified.push(parentAnswer.userId);
        }
      }

    }

    // 3. Notify users subscribed to the thread
    // TODO: ideally this would be injected from the grudr-subscribe-to-questions package
    if (!!question.subscribers) {

      // remove userIds of users that have already been notified
      // and of answer author (they could be replying in a thread they're subscribed to)
      var subscriberIdsToNotify = _.difference(question.subscribers, userIdsNotified, [answer.userId]);
      Herald.createNotification(subscriberIdsToNotify, {courier: 'newAnswerSubscribed', data: notificationData});

      userIdsNotified = userIdsNotified.concat(subscriberIdsToNotify);

    }

  }
}
Grudr.callbacks.add("answerSubmitAsync", answerSubmitNotifications);
