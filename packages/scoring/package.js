Package.describe({
  name: "grudr:scoring",
  summary: "Grudr scoring package.",
  version: "1.0.0",
  git: "https://github.com/GrudrJS/Grudr.git"
});

Package.onUse(function (api) {

  api.versionsFrom("METEOR@1.0");

  api.use(['grudr:core@1.0.0']);

  api.addFiles([
    'lib/scoring.js',
  ], ['client','server']);

  api.addFiles([
    'lib/server/cron.js',
  ], ['server']);


});
