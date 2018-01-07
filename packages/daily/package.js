Package.describe({
  name: "grudr:daily",
  summary: "Grudr daily view",
  version: "1.0.0",
  git: "https://github.com/vipinlahoti/Grudr.git"
});

Package.onUse(function (api) {

  api.versionsFrom(['METEOR@1.0']);

  api.use([
    'grudr:core@1.0.0'
  ]);

  api.addFiles([
    'package-tap.i18n',
    'lib/daily.js'
  ], ['client', 'server']);

  api.addFiles([
    'lib/client/templates/after_day.html',
    'lib/client/templates/before_day.html',
    'lib/client/templates/articles_daily.html',
    'lib/client/templates/articles_daily.js',
    'lib/client/templates/questions_daily.html',
    'lib/client/templates/questions_daily.js',
    'lib/client/templates/day_heading.html',
    'lib/client/templates/load_more_days.html',
    'lib/client/templates/load_more_days.js',
    'lib/client/stylesheets/daily.scss',
    ], ['client']);

  api.addFiles([
  ], ['server']);

  var languages = ["en"];
  var languagesPaths = languages.map(function (language) {
    return "i18n/"+language+".i18n.json";
  });
  api.addFiles(languagesPaths, ["client", "server"]);

});
