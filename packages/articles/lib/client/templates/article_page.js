var doSEOStuff = function (article) {

  // clear previously added meta tags
  DocHead.removeDocHeadAddedTags();

  var link = {rel: "canonical", href: article.getPageUrl(true)};
  DocHead.addLink(link);
  
  // Set SEO properties
  
  var seoProperties = {meta: {}};

  // Set site name
  DocHead.addMeta({property: "og:site_name", content: Settings.get("title")});

  // Set title
  Grudr.SEO.setTitle(article.title);

  // Set description
  if (!!article.body) {
    var description = Grudr.utils.trimWords(article.body, 100);
    Grudr.SEO.setDescription(description);
  }

  // Set image
  if (!!article.thumbnailUrl) {
    var image = Grudr.utils.addHttp(article.thumbnailUrl);
    DocHead.addMeta({property: "twitter:card", content: "summary_large_image"});
    Grudr.SEO.setImage(image);
  }

  // Set Twitter username
  if (!!Settings.get("twitterAccount")) {
    DocHead.addMeta({property: "twitter:site", content: Settings.get("twitterAccount")});
  }
  
};

Template.article_page.onCreated(function () {

  var template = this;
  var articleId = FlowRouter.getParam("_id");

  // initialize the reactive variables
  template.ready = new ReactiveVar(false);

  var articleSubscription = Grudr.subsManager.subscribe('singleArticle', articleId);
  var articleUsersSubscription = Grudr.subsManager.subscribe('articleUsers', articleId);
  var commentSubscription = Grudr.subsManager.subscribe('commentsList', {view: 'articleComments', articleId: articleId});
  
  // Autorun 3: when subscription is ready, update the data helper's terms
  template.autorun(function () {

    var subscriptionsReady = articleSubscription.ready(); // ⚡ reactive ⚡

    // if subscriptions are ready, set terms to subscriptionsTerms and update SEO stuff
    if (subscriptionsReady) {
      template.ready.set(true);
      var article = Articles.findOne(FlowRouter.getParam("_id"));
      if (article) {
        doSEOStuff(article);
      } else {
        DocHead.addMeta({
          name: "name",
          property: "prerender-status-code",
          content: "404"
        });
        DocHead.addMeta({
          name: "name",
          property: "robots",
          content: "noindex, nofollow"
        });
      }
    }
  });

});

Template.article_page.helpers({
  ready: function () {
    return Template.instance().ready.get();
  },
  article: function () {
    return Articles.findOne(FlowRouter.getParam("_id"));
  },
  canView: function () {
    var article = this;
    return Users.can.viewArticle(Meteor.user(), article);
  },
  isPending: function () {
    return this.status === Articles.config.STATUS_PENDING;
  }
});

Template.article_page.rendered = function(){
  $('body').scrollTop(0);
};
