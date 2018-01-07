Package.describe({
  name: "grudr:answers",
  summary: "Grudr answers package",
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
    'lib/answers.js',
    'lib/methods.js',
    'lib/callbacks.js',
    'lib/views.js',
    'lib/parameters.js',
    'lib/helpers.js',
    'lib/routes.js'
  ], ['client', 'server']);

  api.addFiles([
    'lib/client/templates/answer_edit.html',
    'lib/client/templates/answer_edit.js',
    'lib/client/templates/answer_submit.html',
    'lib/client/templates/answer_submit.js',
    'lib/client/templates/answer_item.html',
    'lib/client/templates/answer_item.js',
    'lib/client/templates/answer_list.html',
    'lib/client/templates/answer_list.js',
    'lib/client/templates/answer_reply.html',
    'lib/client/templates/answer_reply.js',
    'lib/client/templates/answers_list/answers_list.html',
    'lib/client/templates/answers_list/answers_list.js',
    'lib/client/templates/answers_list/answers_list_compact.html',
    'lib/client/templates/answers_list/answers_list_compact.js',
    'lib/client/templates/answers_list/answers_list_controller.html',
    'lib/client/templates/answers_list/answers_list_controller.js',
    'lib/client/templates/answer_controller/answer_controller.html',
    'lib/client/templates/answer_controller/answer_controller.js'
  ], ['client']);

  api.addFiles([
    'lib/server/publications.js',
  ], ['server']);

  var languages = ["en"];
  var languagesPaths = languages.map(function (language) {
    return "i18n/"+language+".i18n.json";
  });
  api.addFiles(languagesPaths, ["client", "server"]);

  api.export('Answers');

});
