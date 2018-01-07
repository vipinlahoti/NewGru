/**
 * Use user and article properties to populate article notifications objects.
 * @param {Object} article
 */
Articles.getNotificationProperties = function (article) {
  var articleAuthor = Meteor.users.findOne(article.userId);
  var properties = {
    articleAuthorName : Articles.getAuthorName(article),
    articleTitle : Grudr.utils.cleanUp(article.title),
    profileUrl: Users.getProfileUrl(articleAuthor, true),
    articleUrl: Articles.getPageUrl(article, true),
    thumbnailUrl: article.thumbnailUrl,
    linkUrl: !!article.url ? Grudr.utils.getOutgoingUrl(article.url) : Articles.getPageUrl(article, true)
  };

  if(article.url)
    properties.url = article.url;

  if(article.htmlBody)
    properties.htmlBody = article.htmlBody;

  return properties;
};

/**
 * Use comment, user, and article properties to populate comment notifications objects.
 * @param {Object} comment
 */
Comments.getNotificationProperties = function (comment, article) {
  var commentAuthor = Meteor.users.findOne(comment.userId);
  var properties = {
    profileUrl: commentAuthor && commentAuthor.getProfileUrl(true),
    articleUrl: Articles.getPageUrl(article, true),
    authorName : Comments.getAuthorName(comment),
    articleTitle: article.title,
    htmlBody: comment.htmlBody,
    commentUrl: Comments.getPageUrl(comment, true)
  };
  return properties;
};


/**
 * Use user and question properties to populate question notifications objects.
 * @param {Object} question
 */
Questions.getNotificationProperties = function (question) {
  var questionAuthor = Meteor.users.findOne(question.userId);
  var properties = {
    questionAuthorName : Questions.getAuthorName(question),
    questionExcerpt : Grudr.utils.cleanUp(question.excerpt),
    questionProfileUrl: Users.getProfileUrl(questionAuthor, true),
    questionUrl: Questions.getPageUrl(question, true),
    questionThumbnailUrl: question.thumbnailUrl,
    questionLinkUrl: !!question.url ? Grudr.utils.getOutgoingUrl(question.url) : Questions.getPageUrl(question, true)
  };

  if(question.excerpt)
    properties.htmlBody = question.excerpt;

  return properties;
};

/**
 * Use answer, user, and question properties to populate answer notifications objects.
 * @param {Object} answer
 */
Answers.getNotificationProperties = function (answer, question) {
  var answerAuthor = Meteor.users.findOne(answer.userId);
  var properties = {
    questionProfileUrl: answerAuthor && answerAuthor.getProfileUrl(true),
    questionUrl: Questions.getPageUrl(question, true),
    answerAuthorName : Answers.getAuthorName(answer),
    questionExcerpt: question.excerpt,
    answerHtmlBody: answer.htmlBody,
    answerUrl: Answers.getPageUrl(answer, true)
  };
  return properties;
};


