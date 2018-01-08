Package.describe({
  name: "telescope:core",
  summary: "Telescope core package",
  version: "0.25.7",
  git: "https://github.com/TelescopeJS/Telescope.git"
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");
  
  var packages = [
    'telescope:lib',
    // 'telescope:messages',
    'telescope:i18n',
    'telescope:events',
    'telescope:settings',
    'telescope:users',
    'telescope:comments',
    'telescope:posts'
  ];

  api.use(packages);
  
  api.imply(packages);

  api.addFiles([
    'lib/vote.js',
    'lib/subscriptions.js',
    'lib/callbacks.js',
    'lib/modules.js'
  ], ['client', 'server']);

  api.addFiles([
    'lib/client/handlebars.js',
    'lib/client/main.html',
    'lib/client/main.js',

    'lib/client/messages.js',

    'lib/client/templates/modules/modules.html',
    'lib/client/templates/modules/modules.js',

    'lib/client/templates/messages/message_item.html',
    'lib/client/templates/messages/message_item.js',
    'lib/client/templates/messages/messages.html',
    'lib/client/templates/messages/messages.js',

  ], 'client');

  api.addFiles([
    // 'lib/server/start.js',
    'lib/server/fastrender.js',
    'lib/server/routes.js'
  ], ['server']);

  api.export('Messages', 'client');
});
