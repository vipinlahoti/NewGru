Template.user_articles.helpers({
  arguments: function () {
    var user = this;
    var args = {
      template: "articles_list_compact",
      options: {
        currentUser: user,
        fieldLabel: "Posted at",
        fieldValue: function (article) {
          return moment(article.postedAt).format("MMM Do, YYYY, hh:mm A");
        }
      },
      terms: {
        view: 'userArticles',
        userId: user._id,
        limit: 5,
        enableCache: false,
        subscribeToUsers: true
      }
    };
    return args;
  }
});
