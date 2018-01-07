Template.user_downvoted_articles.helpers({
  arguments: function () {
    var user = this;
    return {
      template: "articles_list_compact",
      options: {
        currentUser: user,
        fieldLabel: "Downvoted at",
        fieldValue: function (article) {
          var user = this.currentUser;
          var vote = _.findWhere(user.grudr.downvotedArticles, {itemId: article._id});
          return moment(vote.votedAt).format("MMM Do, YYYY, hh:mm A");
        }
      },
      terms: {
        view: 'userDownvotedArticles',
        userId: user._id,
        limit: 5,
        enableCache: false,
        subscribeToUsers: false
      }
    };
  }
});
