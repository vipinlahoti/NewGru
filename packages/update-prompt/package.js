Package.describe({
  name: "grudr:update-prompt",
  summary: "Grudr update prompt package.",
  version: "1.0.0",
  git: "https://github.com/GrudrJS/grudr-update-prompt.git"
});

Package.onUse(function (api) {

  api.versionsFrom("METEOR@1.0");

  api.use(['grudr:core@1.0.0']);


  api.addFiles([
    'lib/package_versions.js'
  ], ['client','server']);

  api.addFiles([
    'lib/client/update.js',
    'lib/client/templates/update_banner.html',
    'lib/client/templates/update_banner.js',
    'lib/client/templates/update_banner.css'
  ], ['client']);

  api.addFiles([
    'lib/server/phone_home.js'
  ], ['server']);

  api.export([
    'compareVersions'
  ]);
});
