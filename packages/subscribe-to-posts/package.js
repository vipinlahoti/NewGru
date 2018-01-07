Package.describe({
  name: "grudr:subscribe-to-articles",
  summary: "Subscribe to articles to be notified when they get new comments",
  version: "1.0.0",
  git: "https://github.com/GrudrJS/grudr-subscribe-to-articles.git"
});


Package.onUse(function (api) {

  api.versionsFrom("METEOR@1.0");

  // --------------------------- 1. Meteor packages dependencies ---------------------------

  // automatic (let the package specify where it's needed)

  api.use(['grudr:core@1.0.0']);

  // ---------------------------------- 2. Files to include ----------------------------------

  // i18n config (must come first)

  api.addFiles([
    'package-tap.i18n'
  ], ['client', 'server']);

  // both

  api.addFiles([
    'lib/subscribe-to-articles.js',
  ], ['client', 'server']);

  // client

  api.addFiles([
    'lib/client/templates/article_subscribe.html',
    'lib/client/templates/article_subscribe.js',
    'lib/client/templates/user_subscribed_articles.html',
    'lib/client/templates/user_subscribed_articles.js'
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
    'subscribeItem',
    'unsubscribeItem'
  ]);

});
