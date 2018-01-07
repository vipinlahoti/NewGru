    Package.describe({
  name: 'grudr:lib',
  summary: 'Grudr libraries.',
  version: '1.0.0',
  git: "https://github.com/vipinlahoti/Grudr.git"
});

Package.onUse(function (api) {

  api.versionsFrom(['METEOR@1.0']);
  
  var packages = [
    'meteor-base',
    'mongo',
    'blaze-html-templates',
    'jquery',
    'session',
    'tracker',
    // 'standard-minifiers',
    'service-configuration',
    'accounts-ui',
    'accounts-base',
    'accounts-password',
    // 'accounts-twitter',
    'accounts-google',
    'accounts-facebook',
    'google-config-ui',
    'facebook-config-ui',
    'check',
    'modules',
    'shell-server',
    // 'audit-argument-checks',
    'reactive-var',
    'http',
    'email',
    'ecmascript',
    'aldeed:simple-schema',
    'aldeed:collection2',
    'aldeed:http',
    'aldeed:autoform',
    'aldeed:template-extension',
    'tap:i18n',
    'fourseven:scss',
    'kadira:flow-router',
    'kadira:blaze-layout',
    'arillo:flow-router-helpers',
    'meteorhacks:picker',
    'kadira:dochead',
    'matb33:collection-hooks',
    'chuangbo:marked',
    'meteorhacks:fast-render',
    'meteorhacks:subs-manager',
    'percolatestudio:synced-cron',
    'useraccounts:unstyled',
    'useraccounts:flow-routing',
    'aramk:tinycolor',
    'momentjs:moment',
    'sacha:spin',
    'aslagle:reactive-table',
    'utilities:avatar',
    'fortawesome:fontawesome',
    // 'ccan:cssreset',
    'djedi:sanitize-html',
    'dburles:collection-helpers',
    'jparker:gravatar',
    'sanjo:meteor-files-helpers',
    'cmather:handlebars-server',
    'chuangbo:cookie',
    'ongoworks:speakingurl',
    'okgrow:router-autoscroll',
    'tmeasday:publish-counts',
    'utilities:onsubscribed',
    'seba:minifiers-autoprefixer',
    'dburles:spacebars-tohtml',
    'meteorhacks:unblock',
    'timbrandin:autoform-slingshot',
    'thinksoftware:image-resize-client',
    'themeteorchef:bert',
    'teamon:tinymce'
  ];

  api.use(packages);

  api.imply(packages);

  api.addFiles([
    'lib/core.js',
    'lib/utils.js',
    'lib/callbacks.js',
    'lib/collections.js',
    'lib/modules.js',
    'lib/config.js',
    'lib/templates.js',
    'lib/deep.js',
    'lib/deep_extend.js',
    'lib/autolink.js',
    'lib/themes.js',
    'lib/menus.js',
    'lib/seo.js',
    'lib/base.js',
    'lib/colors.js',
    'lib/icons.js',
    'lib/router.js',
    'lib/custom_template_prefix.js'
  ], ['client', 'server']);

  api.addFiles([
    'lib/client/jquery.exists.js',
    'lib/client/template_replacement.js'
  ], ['client']);

  api.export([
    'Grudr',
    '_',

    'getTemplate',
    'templates',

    'themeSettings'
  ]);

});
