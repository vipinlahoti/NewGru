// New user email
Picker.route('/email/new-user/:id?', function(params, req, res, next) {
  var html;
  var user = typeof params.id === "undefined" ? Meteor.users.findOne() : Meteor.users.findOne(params.id);
  var emailProperties = {
    profileUrl: Users.getProfileUrl(user),
    username: Users.getUserName(user)
  };
  html = Grudr.email.getTemplate('emailNewUser')(emailProperties);
  res.end(Grudr.email.buildTemplate(html));
});

// New article email
Picker.route('/email/new-article/:id?', function(params, req, res, next) {
  var html;
  var article = typeof params.id === "undefined" ? Articles.findOne() : Articles.findOne(params.id);
  if (!!article) {
    html = Grudr.email.getTemplate('emailNewArticle')(Articles.getNotificationProperties(article));
  } else {
    html = "<h3>No article found.</h3>"
  }
  res.end(Grudr.email.buildTemplate(html));
});

// Article approved
Picker.route('/email/article-approved/:id?', function(params, req, res, next) {
  var html;
  var article = typeof params.id === "undefined" ? Articles.findOne() : Articles.findOne(params.id);
  if (!!article) {
    html = Grudr.email.getTemplate('emailArticleApproved')(Articles.getNotificationProperties(article));
  } else {
    html = "<h3>No article found.</h3>"
  }
  res.end(Grudr.email.buildTemplate(html));
});

// New comment email
Picker.route('/email/new-comment/:id?', function(params, req, res, next) {
  var html;
  var comment = typeof params.id === "undefined" ? Comments.findOne() : Comments.findOne(params.id);
  var article = Articles.findOne(comment.articleId);
  if (!!comment) {
    html = Grudr.email.getTemplate('emailNewComment')(Comments.getNotificationProperties(comment, article));
  } else {
    html = "<h3>No article found.</h3>"
  }
  res.end(Grudr.email.buildTemplate(html));
});

// New reply email
Picker.route('/email/new-reply/:id?', function(params, req, res, next) {
  var html;
  var comment = typeof params.id === "undefined" ? Comments.findOne() : Comments.findOne(params.id);
  var article = Articles.findOne(comment.articleId);
  if (!!comment) {
    html = Grudr.email.getTemplate('emailNewReply')(Comments.getNotificationProperties(comment, article));
  } else {
    html = "<h3>No article found.</h3>"
  }
  res.end(Grudr.email.buildTemplate(html));
});


// New question email
Picker.route('/email/new-question/:id?', function(params, req, res, next) {
  var html;
  var question = typeof params.id === "undefined" ? Questions.findOne() : Questions.findOne(params.id);
  if (!!question) {
    html = Grudr.email.getTemplate('emailNewQuestion')(Questions.getNotificationProperties(question));
  } else {
    html = "<h3>No question found.</h3>"
  }
  res.end(Grudr.email.buildTemplate(html));
});

// Question approved
Picker.route('/email/question-approved/:id?', function(params, req, res, next) {
  var html;
  var question = typeof params.id === "undefined" ? Questions.findOne() : Questions.findOne(params.id);
  if (!!question) {
    html = Grudr.email.getTemplate('emailQuestionApproved')(Questions.getNotificationProperties(question));
  } else {
    html = "<h3>No question found.</h3>"
  }
  res.end(Grudr.email.buildTemplate(html));
});

// New answer email
Picker.route('/email/new-answer/:id?', function(params, req, res, next) {
  var html;
  var answer = typeof params.id === "undefined" ? Answers.findOne() : Answers.findOne(params.id);
  var question = Questions.findOne(answer.questionId);
  if (!!answer) {
    html = Grudr.email.getTemplate('emailNewAnswer')(Answers.getNotificationProperties(answer, question));
  } else {
    html = "<h3>No question found.</h3>"
  }
  res.end(Grudr.email.buildTemplate(html));
});

// Account approved email
Picker.route('/email/account-approved/:id?', function(params, req, res, next) {
  var user = typeof params.id === "undefined" ? Meteor.users.findOne() : Meteor.users.findOne(params.id);
  var emailProperties = {
    profileUrl: Users.getProfileUrl(user),
    username: Users.getUserName(user),
    siteTitle: Settings.get('title'),
    siteUrl: Grudr.utils.getSiteUrl()
  };
  var html = Grudr.email.getTemplate('emailAccountApproved')(emailProperties);
  res.end(Grudr.email.buildTemplate(html));
});
