Package.describe({
  name: "grudr:stories",
  summary: "Grudr stories package",
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
    'lib/stories.js',
    'lib/methods.js',
    'lib/callbacks.js',
    'lib/views.js',
    'lib/parameters.js',
    'lib/helpers.js',
    'lib/routes.js'
  ], ['client', 'server']);

  api.addFiles([
    'lib/client/templates/story_edit.html',
    'lib/client/templates/story_edit.js',
    'lib/client/templates/story_submit.html',
    'lib/client/templates/story_submit.js',
    'lib/client/templates/story_item.html',
    'lib/client/templates/story_item.js',
    'lib/client/templates/story_list.html',
    'lib/client/templates/story_list.js',
    'lib/client/templates/story_reply.html',
    'lib/client/templates/story_reply.js',
    'lib/client/templates/stories_list/stories_list.html',
    'lib/client/templates/stories_list/stories_list.js',
    'lib/client/templates/stories_list/stories_list_compact.html',
    'lib/client/templates/stories_list/stories_list_compact.js',
    'lib/client/templates/stories_list/stories_list_controller.html',
    'lib/client/templates/stories_list/stories_list_controller.js',
    'lib/client/templates/story_controller/story_controller.html',
    'lib/client/templates/story_controller/story_controller.js'
  ], ['client']);

  api.addFiles([
    'lib/server/publications.js',
  ], ['server']);

  var languages = ["en"];
  var languagesPaths = languages.map(function (language) {
    return "i18n/"+language+".i18n.json";
  });
  api.addFiles(languagesPaths, ["client", "server"]);

  api.export('Stories');

});
