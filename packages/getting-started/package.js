Package.describe({
  name: "grudr:getting-started",
  summary: "Getting started articles",
  version: "1.0.0",
  git: "https://github.com/vipinlahoti/Grudr.git"
});

Npm.depends({
  // NPM package dependencies
});

Package.onUse(function (api) {

  api.versionsFrom(['METEOR@1.0']);

  // --------------------------- 1. Meteor packages dependencies ---------------------------

  // automatic (let the package specify where it's needed)

  api.use(['grudr:core@1.0.0']);

  // client

  api.use([
    'jquery',                     // useful for DOM interactions
    'underscore',                 // JavaScript swiss army knife library
    'templating'                  // required for client-side templates
  ], ['client']);

  // server

  api.use([
    //
  ], ['server']);

  // ---------------------------------- 2. Files to include ----------------------------------

  // i18n config (must come first)

  api.addFiles([
    'package-tap.i18n'
  ], ['client', 'server']);

  // both

  api.addFiles([
    'lib/getting_started.js'
  ], ['client', 'server']);

  // client

  api.addAssets([
    'content/images/stackoverflow.png',
    'content/images/grudr.png'
  ], ['client']);

  // server

  api.addFiles([
    'lib/server/dummy_content.js'
  ], ['server']);

  api.addAssets('content/read_this_first.md', 'server');
  api.addAssets('content/deploying_grudr.md', 'server');
  api.addAssets('content/customizing_grudr.md', 'server');
  api.addAssets('content/getting_help.md', 'server', 'server');
  api.addAssets('content/removing_getting_started_articles.md', 'server');

  // i18n languages (must come last)

  var languages = ["en"];
  var languagesPaths = languages.map(function (language) {
    return "i18n/"+language+".i18n.json";
  });
  api.addFiles(languagesPaths, ["client", "server"]);

});
