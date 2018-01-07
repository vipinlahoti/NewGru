FlowRouter.route('/articles', {
  name: "articlesDefault",
  action: function(params, queryParams) {
    BlazeLayout.render("layout", {main: "main_articles_list"});
  }
});

FlowRouter.route('/articles/:_id/edit', {
  name: "articleEdit",
  action: function(params, queryParams) {
    BlazeLayout.render("layout", {main: "article_edit"});
  }
});

FlowRouter.route('/articles/:_id/:slug?', {
  name: "articlePage",
  action: function(params, queryParams) {
    trackRouteEntry(params._id);
    BlazeLayout.render("layout", {main: "article_page"});
  }
});

var trackRouteEntry = function (articleId) {
  var sessionId = Meteor.default_connection && Meteor.default_connection._lastSessionId ? Meteor.default_connection._lastSessionId : null;
  Meteor.call('increaseArticleViews', articleId, sessionId);
}

FlowRouter.route('/add-article', {
  name: "articleSubmit",
  action: function(params, queryParams) {
    BlazeLayout.render("layout", {main: "article_submit"});
  }
});
