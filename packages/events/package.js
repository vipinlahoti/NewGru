Package.describe({
  name: "grudr:events",
  summary: "Grudr event tracking package",
  version: "1.0.0",
  git: "https://github.com/vipinlahoti/Grudr.git"
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");
  
  api.use([
    'grudr:lib@1.0.0',
    'grudr:i18n@1.0.0'
  ]);

  api.addFiles([
    'lib/events.js'
  ], ['client', 'server']);

  api.addFiles([
    'lib/client/analytics.js'
  ], ['client']);

  api.export([
    'Events'
  ]);
});
