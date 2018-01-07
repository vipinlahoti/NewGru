Package.describe({
  name: "grudr:datetimepicker",
  summary: "Custom bootstrap-datetimepicker input type for AutoForm",
  version: "1.0.0",
  git: "https://github.com/vipinlahoti/Grudr.git"
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");

  api.use([
    'grudr:core@1.0.0',
    'tsega:bootstrap3-datetimepicker'
  ]);

  api.addFiles([
    'datetimepicker.scss',
    'autoform-bs-datetimepicker.html',
    'autoform-bs-datetimepicker.js',
    'bootstrap-collapse-transitions.js'
  ], 'client');

  api.addAssets([
    'fonts/glyphicons-halflings-regular.eot',
    'fonts/glyphicons-halflings-regular.svg',
    'fonts/glyphicons-halflings-regular.ttf',
    'fonts/glyphicons-halflings-regular.woff'
  ], "client");

});
