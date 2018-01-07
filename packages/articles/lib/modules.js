Grudr.modules.add("primaryNav", [
  {
    template: 'articles_menu',
    order: 10
  }
]);

Grudr.modules.add("articlesListTop", {
  template: "views_menu",
  order: 1
});

Grudr.modules.add("articleComponents", [
  // {
  //   template: 'article_rank',
  //   order: 1
  // },
  {
    template: 'article_content',
    order: 20
  }
]);

Grudr.modules.add("articleThumbnail", [
  {
    template: 'article_thumbnail',
    order: 10
  }
]);

Grudr.modules.add("articleHeading", [
  {
    template: 'article_title',
    order: 10
  },
  {
    template: 'article_domain',
    order: 20
  }
]);

Grudr.modules.add("articleExcerpt", [
  {
    template: 'article_excerpt',
    order: 10
  }
]);

Grudr.modules.add("articleMeta", [
  {
    template: 'article_author',
    order: 10
  },
  {
    template: 'article_info',
    order: 20
  },
  // {
  //   template: 'article_comments_link',
  //   order: 30
  // },
  {
    template: 'article_discuss',
    order: 30
  },
  {
    template: 'article_vote',
    order: 40
  },
  // {
  //   template: 'article_avatars',
  //   order: 30
  // },
  {
    template: 'article_admin',
    order: 50
  },
  // {
  //   template: 'article_actions',
  //   order: 60
  // }
]);
