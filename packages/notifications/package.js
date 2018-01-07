Package.describe({
  name: "grudr:notifications",
  summary: "Grudr notifications package",
  version: "1.0.0",
  git: "https://github.com/vipinlahoti/Grudr.git"
});

Package.onUse(function (api) {

  api.versionsFrom("METEOR@1.0");

  api.use([
    'grudr:core@1.0.0',
    'kestanous:herald',
    'kestanous:herald-email'
  ]);

  api.addAssets([
    'lib/server/templates/emailAccountApproved.handlebars',
    'lib/server/templates/emailNewComment.handlebars',
    'lib/server/templates/emailNewAnswer.handlebars',
    'lib/server/templates/emailNewArticle.handlebars',
    'lib/server/templates/emailNewQuestion.handlebars',
    'lib/server/templates/emailNewPendingArticle.handlebars',
    'lib/server/templates/emailNewPendingQuestion.handlebars',
    'lib/server/templates/emailArticleApproved.handlebars',
    'lib/server/templates/emailQuestionApproved.handlebars',
    'lib/server/templates/emailNewReply.handlebars',
    'lib/server/templates/emailNewUser.handlebars'
  ], ['server']);

  api.addFiles([
    'lib/herald.js',
    'lib/helpers.js',
    'lib/custom_fields.js',
    'lib/notifications.js',
    'lib/callbacks.js',
    'lib/modules.js',
    'lib/routes.js',
    'package-tap.i18n'
  ], ['client', 'server']);

  api.addFiles([
    'lib/client/templates/notification_item.html',
    'lib/client/templates/notification_item.js',
    'lib/client/templates/notifications_mark_as_read.html',
    'lib/client/templates/notifications_mark_as_read.js',
    'lib/client/templates/notification_new_comment.html',
    'lib/client/templates/notification_new_answer.html',
    'lib/client/templates/notification_new_reply.html',
    'lib/client/templates/notification_article_approved.html',
    'lib/client/templates/notification_question_approved.html',
    'lib/client/templates/notifications_menu.html',
    'lib/client/templates/notifications_menu.js',
    'lib/client/templates/unsubscribe.html',
    'lib/client/templates/unsubscribe.js',
  ], ['client']);

  api.addFiles([
    'lib/server/notifications-server.js',
    'lib/server/templates.js',
    'lib/server/routes.js'
  ], ['server']);

  var languages = ["en"];
  var languagesPaths = languages.map(function (language) {
    return "i18n/"+language+".i18n.json";
  });
  api.addFiles(languagesPaths, ["client", "server"]);

  api.export([
    'Herald'
  ]);
});

// TODO: once user profile edit form is generated dynamically, add notification options from this package as well.
