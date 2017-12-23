Package.describe({
  name: "telescope:getting-started",
  summary: "Getting started posts",
  version: '0.25.7',
  git: "https://github.com/TelescopeJS/telescope-getting-started.git"
});

Package.onUse(function (api) {

  api.versionsFrom(['METEOR@1.0']);
  api.use(['telescope:core@0.25.7']);

  api.use([
    'jquery',                     // useful for DOM interactions
    'underscore',                 // JavaScript swiss army knife library
    'templating'                  // required for client-side templates
  ], ['client']);

  api.addFiles([
    'lib/getting_started.js'
  ], ['client', 'server']);

  api.addAssets([
    'content/images/stackoverflow.png',
    'content/images/telescope.png'
  ], ['client']);

  api.addFiles([
    'lib/server/dummy_content.js'
  ], ['server']);

  api.addAssets('content/read_this_first.md', 'server');
  api.addAssets('content/deploying_telescope.md', 'server');
  api.addAssets('content/customizing_telescope.md', 'server');
  api.addAssets('content/getting_help.md', 'server', 'server');
  api.addAssets('content/removing_getting_started_posts.md', 'server');

});
