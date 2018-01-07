Package.describe({
  name: "grudr:comments",
  summary: "Grudr comments package",
  version: "1.0.0",
  git: "https://github.com/vipinlahoti/Grudr.git"
});

Package.onUse(function (api) {

  api.versionsFrom(['METEOR@1.0']);

  api.use([
    'grudr:lib@1.0.0',
    'grudr:i18n@1.0.0',
    'grudr:settings@1.0.0',
    'grudr:users@1.0.0'
  ]);

  api.addFiles([
    'lib/comments.js',
    'lib/methods.js',
    'lib/callbacks.js',
    'lib/views.js',
    'lib/parameters.js',
    'lib/helpers.js',
    'lib/routes.js'
  ], ['client', 'server']);

  api.addFiles([
    'lib/client/templates/comment_edit.html',
    'lib/client/templates/comment_edit.js',
    'lib/client/templates/comment_submit.html',
    'lib/client/templates/comment_submit.js',
    'lib/client/templates/comment_item.html',
    'lib/client/templates/comment_item.js',
    'lib/client/templates/comment_list.html',
    'lib/client/templates/comment_list.js',
    'lib/client/templates/comment_reply.html',
    'lib/client/templates/comment_reply.js',
    'lib/client/templates/comments_list/comments_list.html',
    'lib/client/templates/comments_list/comments_list.js',
    'lib/client/templates/comments_list/comments_list_compact.html',
    'lib/client/templates/comments_list/comments_list_compact.js',
    'lib/client/templates/comments_list/comments_list_controller.html',
    'lib/client/templates/comments_list/comments_list_controller.js',
    'lib/client/templates/comment_controller/comment_controller.html',
    'lib/client/templates/comment_controller/comment_controller.js'
  ], ['client']);

  api.addFiles([
    'lib/server/publications.js',
  ], ['server']);

  var languages = ["en"];
  var languagesPaths = languages.map(function (language) {
    return "i18n/"+language+".i18n.json";
  });
  api.addFiles(languagesPaths, ["client", "server"]);

  api.export('Comments');

});
