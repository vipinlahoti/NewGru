Package.describe({
  name: 'telescope:settings',
  summary: 'Telescope settings package',
  version: '0.25.7',
  git: 'https://github.com/TelescopeJS/Telescope.git'
});

Package.onUse(function(api) {
  var both = ['server', 'client'];

  api.versionsFrom(['METEOR@1.0']);

  api.use([
    'telescope:lib',
    'hausor:autoform-bs-minicolors'
  ]);

  api.addFiles([
    'lib/settings.js',
    'lib/routes.js',
    'lib/menus.js'
  ], both);

  api.addFiles([
    'lib/server/publications.js',
  ], 'server');

  api.addFiles([
    'lib/client/helpers.js',
    'lib/client/templates/settings.html',
    'lib/client/templates/settings.js'
  ], 'client');

  api.export('Settings', both);
});
