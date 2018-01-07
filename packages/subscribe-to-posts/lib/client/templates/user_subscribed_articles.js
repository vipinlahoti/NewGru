Template.user_subscribed_articles.helpers({
  arguments: function () {
    var user = this;
    return {
      template: "articles_list_compact",
      options: {
        currentUser: user,
        fieldLabel: "Subscribed at",
        fieldValue: function (article) {
          var user = this.currentUser;
          var item = _.findWhere(user.grudr.subscribedItems.Articles, {itemId: article._id});
          return moment(item.subscribedAt).format("MMM Do, YYYY, hh:mm A");
        }
      },
      terms: {
        view: 'userSubscribedArticles',
        userId: user._id,
        limit: 5
      }
    }
  }
});
