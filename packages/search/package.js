Package.describe({
  name: "grudr:search",
  summary: "Grudr search package",
  version: "1.0.0",
  git: "https://github.com/GrudrJS/grudr-pages.git"
});

Package.onUse(function (api) {

  api.versionsFrom("METEOR@1.0");

  api.use(['grudr:core@1.0.0']);

  api.addFiles([
    'lib/search.js',
    'lib/parameters.js',
    'package-tap.i18n'
  ], ['client', 'server']);

  api.addFiles([
    'lib/client/templates/search.html',
    'lib/client/templates/search.js',
    'lib/client/stylesheets/search.scss'
    ], ['client']);

  api.addFiles([
    ], ['server']);

  var languages = ["ar", "bg", "cs", "da", "de", "el", "en", "es", "et", "fr", "hu", "id", "it", "ja", "kk", "ko", "nl", "pl", "pt-BR", "ro", "ru", "sl", "sv", "th", "tr", "vi", "zh-CN"];
  var languagesPaths = languages.map(function (language) {
    return "i18n/"+language+".i18n.json";
  });
  api.addFiles(languagesPaths, ["client", "server"]);

});
