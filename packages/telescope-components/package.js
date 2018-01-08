Package.describe({
  name: "telescope:components",
  summary: "Telescope core package",
  version: "0.25.7",
  git: "https://github.com/TelescopeJS/Telescope.git"
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");

  api.use("telescope:core");

  api.addFiles([
    'lib/client/templates/common/footer.html',

    'lib/client/templates/common/loader.html',
    'lib/client/templates/common/loading.html',
    
    'lib/client/templates/common/checker.html',
    'lib/client/templates/common/checker.js',
    
    'lib/client/templates/common/layout.html',
    'lib/client/templates/common/layout.js',
    
    'lib/client/templates/common/no_rights.html',
    'lib/client/templates/common/no_rights.js',
    'lib/client/templates/common/not_found.html',

    'lib/client/templates/common/logo.html',
    'lib/client/templates/common/logo.js',

    'lib/client/templates/common/header.html',
    'lib/client/templates/common/header.js',
  ], 'client');

});
