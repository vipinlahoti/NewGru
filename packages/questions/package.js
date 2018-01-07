Package.describe({
  name: "grudr:questions",
  summary: "Grudr questions package",
  version: "1.0.0",
  git: "https://github.com/vipinlahoti/Grudr.git"
});

Package.onUse(function (api) {

  api.versionsFrom(['METEOR@1.0']);

  api.use([
    'grudr:lib@1.0.0',
    'grudr:i18n@1.0.0',
    'grudr:settings@1.0.0',
    'grudr:users@1.0.0',
    'grudr:answers@1.0.0'
  ]);

  api.addFiles([
    'lib/namespace.js',
    'lib/config.js',
    'lib/questions.js',
    'lib/parameters.js',
    'lib/views.js',
    'lib/helpers.js',
    'lib/modules.js',
    'lib/callbacks.js',
    'lib/methods.js',
    'lib/transitions.js',
    'lib/menus.js',
    'lib/routes.js'
  ], ['client', 'server']);

  api.addFiles([
    'lib/client/templates/questions-menu.html',
    'lib/client/templates/after_question_item.html',
    'lib/client/templates/before_question_item.html',
    'lib/client/templates/modules/question_actions.html',
    'lib/client/templates/modules/question_actions.js',
    'lib/client/templates/modules/question_admin.html',
    'lib/client/templates/modules/question_admin.js',
    'lib/client/templates/modules/question_author.html',
    'lib/client/templates/modules/question_author.js',
    'lib/client/templates/modules/question_avatars.html',
    'lib/client/templates/modules/question_avatars.js',
    'lib/client/templates/modules/question_answers_link.html',
    'lib/client/templates/modules/question_content.html',
    'lib/client/templates/modules/question_content.js',
    'lib/client/templates/modules/question_discuss.html',
    'lib/client/templates/modules/question_info.html',
    'lib/client/templates/modules/question_info.js',
    'lib/client/templates/modules/question_rank.html',
    'lib/client/templates/modules/question_rank.js',
    'lib/client/templates/modules/question_title.html',
    'lib/client/templates/modules/question_single_title.html',
    'lib/client/templates/question_body.html',
    'lib/client/templates/question_edit.html',
    'lib/client/templates/question_edit.js',
    'lib/client/templates/question_item.html',
    'lib/client/templates/question_item.js',
    'lib/client/templates/question_page.html',
    'lib/client/templates/question_page.js',
    'lib/client/templates/question_submit.html',
    'lib/client/templates/question_submit.js',
    'lib/client/templates/questions_views_menu.html',
    'lib/client/templates/questions_views_menu.js',
    'lib/client/templates/main_questions_list.html',
    'lib/client/templates/main_questions_list.js',
    'lib/client/templates/questions_list/questions_list.html',
    'lib/client/templates/questions_list/questions_list.js',
    'lib/client/templates/questions_list/questions_list_compact.html',
    'lib/client/templates/questions_list/questions_list_compact.js',
    'lib/client/templates/questions_list/questions_list_controller.html',
    'lib/client/templates/questions_list/questions_list_controller.js'
  ], ['client']);

  api.addFiles([
    'lib/server/publications.js',
    'lib/server/fastrender.js'
  ], ['server']);

  var languages = ["en"];
  var languagesPaths = languages.map(function (language) {
    return "i18n/"+language+".i18n.json";
  });
  api.addFiles(languagesPaths, ["client", "server"]);

  api.export('Questions');

});
