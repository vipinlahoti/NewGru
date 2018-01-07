Package.describe({
  name: "grudr:debug",
  summary: "Grudr debug package",
  version: "1.0.0",
  git: "https://github.com/vipinlahoti/Grudr.git",
  debugOnly: true
});

Package.onUse(function (api) {

  api.versionsFrom(['METEOR@1.0']);

  api.use(['grudr:core@1.0.0']);

  api.addFiles([
    'lib/debug.js'
  ], ['client', 'server']);

  api.addFiles([
    'lib/client/templates.js',
    'lib/client/stylesheets/highlight.scss'
  ], ['client']);

});
