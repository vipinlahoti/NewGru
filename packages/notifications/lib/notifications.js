var notifications = {

  newArticle: {
    properties: function () {
      return Articles.getNotificationProperties(this.data.article);
    },
    subject: function () {
      return this.articleAuthorName+' has created a new article: '+this.articleTitle;
    },
    emailTemplate: "emailNewArticle"
  },

  newPendingArticle: {
    properties: function () {
      return Articles.getNotificationProperties(this.data.article);
    },
    subject: function () {
      return this.articleAuthorName+' has a new article pending approval: '+this.articleTitle;
    },
    emailTemplate: "emailNewPendingArticle"
  },

  articleApproved: {
    properties: function () {
      return Articles.getNotificationProperties(this.data.article);
    },
    subject: function () {
      return 'Your article “'+this.articleTitle+'” has been approved';
    },
    emailTemplate: "emailArticleApproved",
    onsiteTemplate: "notification_article_approved"
  },

  newComment: {
    properties: function () {
      return Comments.getNotificationProperties(this.data.comment, this.data.article);
    },
    subject: function () {
      return this.authorName+' left a new comment on your article "' + this.articleTitle + '"';
    },
    emailTemplate: "emailNewComment",
    onsiteTemplate: "notification_new_comment"
  },

  newReply: {
    properties: function () {
      return Comments.getNotificationProperties(this.data.comment, this.data.article);
    },
    subject: function () {
      return this.authorName+' replied to your comment on "'+this.articleTitle+'"';
    },
    emailTemplate: "emailNewReply",
    onsiteTemplate: "notification_new_reply"
  },

  newCommentSubscribed: {
    properties: function () {
      return Comments.getNotificationProperties(this.data.comment, this.data.article);
    },
    subject: function () {
      return this.authorName+' left a new comment on "' + this.articleTitle + '"';
    },
    emailTemplate: "notification_new_comment",
    onsiteTemplate: "notification_new_comment"
  },

  newQuestion: {
    properties: function () {
      return Questions.getNotificationProperties(this.data.question);
    },
    subject: function () {
      return this.questionAuthorName +' has created a new question: '+ this.questionExcerpt;
    },
    emailTemplate: "emailNewQuestion"
  },

  newPendingQuestion: {
    properties: function () {
      return Questions.getNotificationProperties(this.data.question);
    },
    subject: function () {
      return this.questionAuthorName+' has a new question pending approval: '+this.questionExcerpt;
    },
    emailTemplate: "emailNewPendingQuestion"
  },

  questionApproved: {
    properties: function () {
      return Questions.getNotificationProperties(this.data.question);
    },
    subject: function () {
      return 'Your question “'+this.questionExcerpt+'” has been approved';
    },
    emailTemplate: "emailQuestionApproved",
    onsiteTemplate: "notification_question_approved"
  },

  newAnswer: {
    properties: function () {
      return Answers.getNotificationProperties(this.data.answer, this.data.question);
    },
    subject: function () {
      return this.answerAuthorName+' answered your question "' + this.questionExcerpt + '"';
    },
    emailTemplate: "emailNewAnswer",
    onsiteTemplate: "notification_new_answer"
  },

  newAnswerSubscribed: {
    properties: function () {
      return Answers.getNotificationProperties(this.data.answer, this.data.question);
    },
    subject: function () {
      return this.answerAuthorName+' answered your question "' + this.questionExcerpt + '"';
    },
    emailTemplate: "notification_new_answer",
    onsiteTemplate: "notification_new_answer"
  }

};

// set up couriers
_.each(notifications, function (notification, notificationName) {

  var courier = {
    media: {
      email: {
        emailRunner: function (user) {
          var properties = notification.properties.call(this);
          var subject = notification.subject.call(properties);
          var html = Grudr.email.buildTemplate(Grudr.email.getTemplate(notification.emailTemplate)(properties));
          Grudr.email.send(Users.getEmail(user), subject, html);
        }
      }
    }
  };

  if (!!notification.onsiteTemplate) {
    courier.media.onsite = {};
    courier.message = function () {
      var properties = notification.properties.call(this);
      return Blaze.toHTML(Blaze.With(properties, function () {
        return Template[notification.onsiteTemplate];
      }));
    };
  }

  Herald.addCourier(notificationName, courier);

});
