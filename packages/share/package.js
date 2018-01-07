Package.describe({
  name: "grudr:share",
  summary: "Grudr share module package",
  version: "1.0.0",
  git: "https://github.com/GrudrJS/grudr-share.git"
});

Package.onUse(function (api) {

  api.versionsFrom("METEOR@1.0");

  api.use(['grudr:core@1.0.0']);

  api.addFiles([
    'lib/share.js'
  ], ['client', 'server']);

  api.addFiles([
    'lib/client/article_share.html',
    'lib/client/article_share.js'
  ], ['client']);

  // api.export();
});
