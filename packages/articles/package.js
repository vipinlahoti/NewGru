Package.describe({
  name: "grudr:articles",
  summary: "Grudr articles package",
  version: "1.0.0",
  git: "https://github.com/vipinlahoti/Grudr.git"
});

Package.onUse(function (api) {

  api.versionsFrom(['METEOR@1.0']);

  api.use([
    'grudr:lib@1.0.0',
    'grudr:i18n@1.0.0',
    'grudr:settings@1.0.0',
    'grudr:users@1.0.0',
    'grudr:comments@1.0.0'
  ]);

  api.addFiles([
    'lib/namespace.js',
    'lib/config.js',
    'lib/articles.js',
    'lib/parameters.js',
    'lib/views.js',
    'lib/helpers.js',
    'lib/modules.js',
    'lib/callbacks.js',
    'lib/methods.js',
    'lib/transitions.js',
    'lib/menus.js',
    'lib/routes.js'
  ], ['client', 'server']);

  api.addFiles([
    'lib/client/templates/articles-menu.html',
    'lib/client/templates/after_article_item.html',
    'lib/client/templates/before_article_item.html',
    'lib/client/templates/modules/article_actions.html',
    'lib/client/templates/modules/article_actions.js',
    'lib/client/templates/modules/article_admin.html',
    'lib/client/templates/modules/article_admin.js',
    'lib/client/templates/modules/article_author.html',
    'lib/client/templates/modules/article_author.js',
    'lib/client/templates/modules/article_avatars.html',
    'lib/client/templates/modules/article_avatars.js',
    'lib/client/templates/modules/article_comments_link.html',
    'lib/client/templates/modules/article_content.html',
    'lib/client/templates/modules/article_content.js',
    'lib/client/templates/modules/article_discuss.html',
    'lib/client/templates/modules/article_domain.html',
    'lib/client/templates/modules/article_domain.js',
    'lib/client/templates/modules/article_info.html',
    'lib/client/templates/modules/article_info.js',
    'lib/client/templates/modules/article_rank.html',
    'lib/client/templates/modules/article_rank.js',
    'lib/client/templates/modules/article_thumbnail.html',
    'lib/client/templates/modules/article_title.html',
    'lib/client/templates/modules/article_excerpt.html',
    'lib/client/templates/modules/article_vote.html',
    'lib/client/templates/modules/article_vote.js',
    'lib/client/templates/article_body.html',
    'lib/client/templates/article_edit.html',
    'lib/client/templates/article_edit.js',
    'lib/client/templates/article_item.html',
    'lib/client/templates/article_item.js',
    'lib/client/templates/article_page.html',
    'lib/client/templates/article_page.js',
    'lib/client/templates/article_submit.html',
    'lib/client/templates/article_submit.js',
    'lib/client/templates/views_menu.html',
    'lib/client/templates/views_menu.js',
    'lib/client/templates/main_articles_list.html',
    'lib/client/templates/main_articles_list.js',
    'lib/client/templates/articles_list/articles_list.html',
    'lib/client/templates/articles_list/articles_list.js',
    'lib/client/templates/articles_list/articles_list_compact.html',
    'lib/client/templates/articles_list/articles_list_compact.js',
    'lib/client/templates/articles_list/articles_list_controller.html',
    'lib/client/templates/articles_list/articles_list_controller.js'
  ], ['client']);

  api.addFiles([
    'lib/server/publications.js',
    'lib/server/fastrender.js'
  ], ['server']);

  var languages = ["en"];
  var languagesPaths = languages.map(function (language) {
    return "i18n/"+language+".i18n.json";
  });
  api.addFiles(languagesPaths, ["client", "server"]);

  api.export('Articles');

});
