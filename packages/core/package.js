Package.describe({
  name: "grudr:core",
  summary: "Grudr core package",
  version: "1.0.0",
  git: "https://github.com/vipinlahoti/Grudr.git"
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");
  
  var packages = [
    'grudr:lib@1.0.0', //  no dependencies
    'grudr:i18n@1.0.0', // lib
    'grudr:events@1.0.0', // lib, i18n
    'grudr:settings@1.0.0', // lib, i18n
    'grudr:users@1.0.0', // lib, i18n, settings
    'grudr:comments@1.0.0', // lib, i18n, settings, users
    'grudr:articles@1.0.0', // lib, i18n, settings, users, comments
    'grudr:answers@1.0.0', // lib, i18n, settings, users
    'grudr:questions@1.0.0', // lib, i18n, settings, users, answers
    'grudr:dropdown-menu@1.0.0'
  ];

  api.use(packages);
  
  api.imply(packages);

  api.addFiles([
    'lib/modules.js',
    'lib/vote.js',
    'lib/subscriptions.js',
    'lib/callbacks.js'
  ], ['client', 'server']);

  api.addFiles([
    'lib/client/handlebars.js',
    'lib/client/main.html',
    'lib/client/main.js',
    'lib/client/scripts/jquery.quickfit.js',
    'lib/client/templates/modules/modules.html',
    'lib/client/templates/modules/modules.js',
    'lib/client/templates/admin/admin_menu.html',
    'lib/client/templates/admin/admin_menu.js',
    'lib/client/templates/admin/admin_wrapper.html',
    'lib/client/templates/common/css.html',
    'lib/client/templates/common/css.js',
    'lib/client/templates/common/footer_code.html',
    'lib/client/templates/common/footer_code.js',
    'lib/client/templates/common/loader.html',
    'lib/client/templates/common/checker.html',
    'lib/client/templates/common/checker.js',
    'lib/client/templates/common/layout.html',
    'lib/client/templates/common/layout.js',
    'lib/client/templates/errors/already_logged_in.html',
    'lib/client/templates/errors/loading.html',
    'lib/client/templates/errors/loading.js',
    'lib/client/templates/errors/no_account.html',
    'lib/client/templates/errors/no_account.js',
    'lib/client/templates/errors/no_invite.html',
    'lib/client/templates/errors/no_invite.js',
    'lib/client/templates/errors/no_rights.html',
    'lib/client/templates/errors/no_rights.js',
    'lib/client/templates/errors/not_found.html',
    'lib/client/templates/forms/urlCustomType.html',
    'lib/client/templates/forms/urlCustomType.js',
    'lib/client/templates/nav/logo.html',
    'lib/client/templates/nav/logo.js',
    'lib/client/templates/nav/mobile_nav.html',
    'lib/client/templates/nav/mobile_nav.js',
    'lib/client/templates/nav/header.html',
    'lib/client/templates/nav/header.js',
    'lib/client/templates/nav/submit_article_button.html',
    'lib/client/templates/nav/submit_question.html'
  ], 'client');

  api.addAssets([
    'public/img/loading.svg',
  ], 'client');

  api.addFiles([
    'lib/server/start.js',
    'lib/server/fastrender.js',
    'lib/server/routes.js'
  ], ['server']);

  var languages = ["en"];
  var languagesPaths = languages.map(function (language) {
    return "i18n/"+language+".i18n.json";
  });
  api.addAssets(languagesPaths, ["client", "server"]);

});
