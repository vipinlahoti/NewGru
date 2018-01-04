Package.describe({
  name: "grudr",
  summary: "Vulcan forum package",
  version: '1.8.0',
  git: "https://github.com/VulcanJS/Vulcan.git"
});

Package.onUse(function (api) {

  api.versionsFrom('METEOR@1.5.2');

  api.use([

    'fourseven:scss',

    'vulcan:core',
    'vulcan:voting',
    'vulcan:accounts',
    'vulcan:email',
    // 'vulcan:forms',
    'vulcan:newsletter',
    'vulcan:events',
    // 'vulcan:forms-tags',
    'vulcan:forms-upload',
    'vulcan:admin',
    'vulcan:debug'

  ]);

  var packages = [
    'jquery'
  ];

  api.use(packages);
  api.imply(packages);

  api.addAssets([
    'lib/assets/images/stackoverflow.png',
    'lib/assets/images/telescope.png',
  ], ['client']);

  api.addAssets([
    'lib/assets/content/read_this_first.md',
    'lib/assets/content/deploying.md',
    'lib/assets/content/customizing.md',
    'lib/assets/content/getting_help.md',
    'lib/assets/content/removing_getting_started_posts.md',

    'lib/server/email/templates/common/test.handlebars',
    'lib/server/email/templates/common/wrapper.handlebars',
    'lib/server/email/templates/comments/newComment.handlebars',
    'lib/server/email/templates/comments/newReply.handlebars',
    'lib/server/email/templates/posts/newPendingPost.handlebars',
    'lib/server/email/templates/posts/newPost.handlebars',
    'lib/server/email/templates/posts/postApproved.handlebars',
    'lib/server/email/templates/users/accountApproved.handlebars',
    'lib/server/email/templates/users/newUser.handlebars',
    'lib/server/email/templates/newsletter/newsletter.handlebars',
    'lib/server/email/templates/newsletter/newsletterConfirmation.handlebars',
    'lib/server/email/templates/newsletter/postItem.handlebars',
    
  ], ['server']);

  api.addFiles([
    // 'lib/stylesheets/bootstrap.css',
    'lib/styles/scss/main.scss',

    // Js
    // 'lib/styles/js/bootstrap.js',
    // 'lib/styles/js/bootstrap-selectpicker.js',
    'lib/styles/js/global.js',
    'lib/styles/js/waves.js',
    'lib/styles/js/forms.js',
    // 'lib/styles/js/material-kit.js',
  ], ['client']);

  api.mainModule("lib/server/main.js", "server");
  api.mainModule("lib/client/main.js", "client");

});
