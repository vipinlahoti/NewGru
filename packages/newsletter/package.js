Package.describe({
  name: "grudr:newsletter",
  summary: "Grudr email newsletter package",
  version: "1.0.0",
  git: "https://github.com/GrudrJS/grudr-newsletter.git"
});

Npm.depends({
  "html-to-text": "1.3.1"
});

Package.onUse(function (api) {

  api.versionsFrom("METEOR@1.0");

  api.use([
    'grudr:core@1.0.0',
    'miro:mailchimp',
  ]);

  api.addAssets([
    'lib/server/templates/emailDigest.handlebars',
    'lib/server/templates/emailDigestConfirmation.handlebars',
    'lib/server/templates/emailArticleItem.handlebars'
  ], ['server']);

  api.addFiles([
    'package-tap.i18n',
    'lib/newsletter.js'
  ], ['client', 'server']);

  api.addFiles([
    'lib/client/templates/newsletter_banner.html',
    'lib/client/templates/newsletter_banner.js',
    'lib/client/stylesheets/newsletter_banner.scss'
  ], ['client']);

  api.addFiles([
    'lib/server/campaign.js',
    'lib/server/cron.js',
    'lib/server/mailchimp.js',
    'lib/server/routes.js',
    'lib/server/templates.js'
  ], ['server']);

  var languages = ["en"];
  var languagesPaths = languages.map(function (language) {
    return "i18n/"+language+".i18n.json";
  });
  api.addFiles(languagesPaths, ["client", "server"]);

  api.export([
    'resetNewsletterSchedule'
  ]);
});
