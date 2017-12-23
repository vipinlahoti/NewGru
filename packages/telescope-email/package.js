Package.describe({
  name: 'telescope:email',
  summary: 'Telescope email package',
  version: '0.25.7',
  git: 'https://github.com/TelescopeJS/telescope-email.git'
});

Npm.depends({
  'html-to-text': '0.1.0'
});

Package.onUse(function (api) {

  api.versionsFrom(['METEOR@1.0']);

  api.use([
    'telescope:core',
    'sacha:juice'
  ]);

  api.addAssets([
    'lib/server/templates/emailTest.handlebars',
    'lib/server/templates/emailWrapper.handlebars'
  ], ['server']);

  api.addFiles([
    'lib/server/email.js',
    'lib/server/templates.js'
  ], ['server']);

});
