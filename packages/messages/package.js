Package.describe({
  name: "grudr:messages",
  summary: "Grudr messages package",
  version: "1.0.0",
  git: "https://github.com/vipinlahoti/Grudr.git"
});

Package.onUse(function(api) {
  
  api.versionsFrom("METEOR@1.0");

  api.use(['grudr:lib@1.0.0']);

  api.addFiles([
    'lib/modules.js'
  ], ['client', 'server']);

  api.addFiles([
    'lib/client/messages.js',

    'lib/client/templates/messages.html',
    'lib/client/templates/messages.js',
    'lib/client/templates/message_item.html',
    'lib/client/templates/message_item.js'
  ], 'client');

  api.export('Messages', 'client');
});
