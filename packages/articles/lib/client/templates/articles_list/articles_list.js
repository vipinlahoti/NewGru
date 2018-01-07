// ----------------------------------- Article List -----------------------------------//

Template.articles_list.created = function() {
  Session.set('listPopulatedAt', new Date());
};

Template.articles_list.helpers({
  articlesLayout: function () {
    return Settings.get('articlesLayout', 'articles-list');
  },
  description: function () {
    var controller = Iron.controller();
    if (typeof controller.getDescription === 'function')
      return Iron.controller().getDescription();
  },
  articlesCursor : function () {
    if (this.articlesCursor) { // not sure why this should ever be undefined, but it can apparently
      var articles = this.articlesCursor.map(function (article, index) {
        article.rank = index;
        return article;
      });
      return articles;
    } else {
      console.log('articlesCursor not defined');
    }
  }
});

// ----------------------------------- Incoming -----------------------------------//

Template.articlesListIncoming.events({
  'click .show-new': function() {
    Session.set('listPopulatedAt', new Date());
  }
});

// ----------------------------------- Load More -----------------------------------//

Template.articlesLoadMore.helpers({
  articlesReady: function () {
    return this.articlesReady;
  },
  showInfiniteScroll: function () {
    if (this.controllerOptions && this.controllerOptions.loadMoreBehavior === "button") {
      return false;
    } else {
      return this.hasMoreArticles;
    }
  },
  showLoadMoreButton: function () {
    if (this.controllerOptions && this.controllerOptions.loadMoreBehavior === "scroll") {
      return false;
    } else {
      return this.hasMoreArticles;
    }
  },
  hasArticles: function () {
    return !!this.articlesCursor.count();
  }
});

Template.articlesLoadMore.onCreated(function () {

  var context = Template.currentData();

  if (context.controllerOptions && context.controllerOptions.loadMoreBehavior === "scroll") {

    $(window).scroll(function() {
      if($(window).scrollTop() + $(window).height() === $(document).height()) {
        context.loadMoreHandler(context.controllerInstance);
      }
    });

  }
});

Template.articlesLoadMore.events({
  'click .more-button': function (event) {
    event.preventDefault();
    this.loadMoreHandler(this.controllerInstance);
  }
});
