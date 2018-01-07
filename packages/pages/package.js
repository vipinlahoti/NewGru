Package.describe({
  name: "grudr:pages",
  summary: "Grudr static pages package",
  version: "1.0.0",
  git: "https://github.com/GrudrJS/grudr-pages.git"
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");
  
  api.use(['grudr:core@1.0.0']);

  api.addFiles([
    'lib/pages.js',
    'lib/routes.js',
    'package-tap.i18n'
  ], ['client', 'server']);

  api.addFiles([
    'lib/client/stylesheets/pages.scss',
    'lib/client/templates/page.html',
    'lib/client/templates/home-page.html',
    'lib/client/templates/page.js',
    'lib/client/templates/page_item.html',
    'lib/client/templates/page_item.js',
    'lib/client/templates/pages.html',
    'lib/client/templates/pages.js',
    'lib/client/templates/pages_menu.html',
    'lib/client/templates/pages_menu.js'
  ], 'client');

  api.addFiles([
    'lib/server/publications.js'
  ], ['server']);

  var languages = ["en"];
  var languagesPaths = languages.map(function (language) {
    return "i18n/"+language+".i18n.json";
  });
  api.addFiles(languagesPaths, ["client", "server"]);

  api.export([
    'Pages'
  ]);
});
