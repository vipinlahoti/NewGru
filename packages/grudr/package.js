Package.describe({
  name: "grudr",
  version: '1.0.0'
});

Package.onUse(function (api) {

  api.versionsFrom('METEOR@1.5.2');

  api.use([

    'promise',
    'fourseven:scss@4.5.0',

    'vulcan:core@1.8.9',
    'vulcan:voting@1.8.9',
    'vulcan:accounts@1.8.9',
    'vulcan:email@1.8.9',
    'vulcan:forms-upload@1.8.9',
    'vulcan:newsletter@1.8.9',
    'vulcan:events@1.8.9',
    'vulcan:admin',
    'vulcan:debug',

  ]);

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
    'lib/styles/scss/main.scss'
  ], ['client']);

  api.mainModule("lib/server/main.js", "server");
  api.mainModule("lib/client/main.js", "client");

});
