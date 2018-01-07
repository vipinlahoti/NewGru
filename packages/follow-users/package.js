Package.describe({
  name: "grudr:follow-users",
  summary: "Subscribe to users to be notified when they get new comments",
  version: "1.0.0",
  git: "https://github.com/GrudrJS/grudr-follow-to-users.git"
});


Package.onUse(function (api) {

  api.versionsFrom("METEOR@1.0");

  // --------------------------- 1. Meteor packages dependencies ---------------------------
  api.use(['grudr:core@1.0.0']);

  // i18n config (must come first)

  api.addFiles([
    'package-tap.i18n'
  ], ['client', 'server']);

  // both
  api.addFiles([
    'lib/follow-users.js',
  ], ['client', 'server']);

  // client
  api.addFiles([
    'lib/client/templates/user_follow.html',
    'lib/client/templates/user_follow.js',
    'lib/client/templates/user_followed_users.html',
    'lib/client/templates/user_followed_users.js'
  ], ['client']);

  // server
  api.addFiles([
    'lib/server/publications.js'
  ], ['server']);

  // i18n languages (must come last)
  var languages = ["en"];
  var languagesPaths = languages.map(function (language) {
    return "i18n/"+language+".i18n.json";
  });
  api.addFiles(languagesPaths, ["client", "server"]);

  api.export([
    'followItem',
    'unfollowItem'
  ]);

});
