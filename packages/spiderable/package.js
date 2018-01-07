Package.describe({
  name: "grudr:spiderable",
  summary: "Grudr Spiderable package.",
  version: "1.0.0",
  git: "https://github.com/GrudrJS/Grudr.git"
});

Package.onUse(function (api) {

  api.versionsFrom("METEOR@1.0");

  api.use(['grudr:core@1.0.0', 'spiderable']);

});
