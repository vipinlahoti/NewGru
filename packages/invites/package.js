Package.describe({
  name: "grudr:invites",
  summary: "Grudr invites package",
  version: "1.0.0",
  git: "https://github.com/vipinlahoti/Grudr.git"
});

Package.onUse(function (api) {

  api.versionsFrom("METEOR@1.0");

  // --------------------------- 1. Meteor packages dependencies ---------------------------

  // automatic (let the package specify where it's needed)
  api.use(['grudr:core@1.0.0']);

  // client
  api.use([
    'jquery',
    'underscore',
    'templating'
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
    'lib/invites.js'
  ], ['client', 'server']);

  // client
  api.addFiles([
    'lib/client/templates/user_invites.html',
    'lib/client/templates/user_invites.js'
  ], ['client']);

  // server
  api.addAssets([
    'lib/server/templates/emailInvite.handlebars'
  ], ['server']);

  api.addFiles([
    'lib/server/invites.js',
    'lib/server/publications.js',
    'lib/server/routes.js',
    'lib/server/templates.js'
  ], ['server']);

  // i18n languages (must come last)

  var languages = ["en"];
  var languagesPaths = languages.map(function (language) {
    return "i18n/"+language+".i18n.json";
  });
  api.addFiles(languagesPaths, ["client", "server"]);

  // -------------------------------- 3. Variables to export --------------------------------
  api.export("Invites");

});
