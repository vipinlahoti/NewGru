Package.describe({
  name: "grudr:email",
  summary: "Grudr email package",
  version: "1.0.0",
  git: "https://github.com/vipinlahoti/Grudr.git"
});

Npm.depends({
  "html-to-text": "0.1.0"
});

Package.onUse(function (api) {

  api.versionsFrom(['METEOR@1.0']);

  api.use([
    'grudr:core@1.0.0',
    'sacha:juice'
  ]);

  api.addAssets([
    'lib/server/templates/emailTest.handlebars',
    'lib/server/templates/emailWrapper.handlebars'
  ], ['server']);

  // do not use for now since tap:i18n doesn't support server-side templates yet
  api.addFiles([
    'package-tap.i18n'
  ], ['client', 'server']);

  api.addFiles([
    'lib/server/email.js',
    'lib/server/templates.js'
  ], ['server']);

  var languages = ["en"];
  var languagesPaths = languages.map(function (language) {
    return "i18n/"+language+".i18n.json";
  });
  api.addFiles(languagesPaths, ["client", "server"]);

});
