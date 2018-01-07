Package.describe({
  name: "grudr:theme-grudr",
  summary: "Grudr base theme package",
  version: "1.0.0",
  git: "https://github.com/vipinlahoti/Grudr.git"
});

Package.onUse(function (api) {

  api.versionsFrom("METEOR@1.0");

  api.use([
    'grudr:core@1.0.0'
  ]);

  api.addFiles([
    // Scss
    // 'lib/client/scss/bootstrap.scss',
    'lib/client/scss/main.scss',

    // Js
    'lib/client/js/global.js',
    'lib/client/js/waves.js',
    'lib/client/js/forms.js',
    //'lib/client/js/materialize.js',
    'lib/client/js/bootstrap.js'

  ], ['client']);
});
