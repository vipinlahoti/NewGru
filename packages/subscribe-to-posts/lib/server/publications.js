Meteor.publish('userSubscribedArticles', function(terms) {

  if (this.userId) {
    terms.currentUserId = this.userId; // add userId to terms
  }

  var parameters = Articles.parameters.get(terms);
  var articles = Articles.find(parameters.find, parameters.options);
  return articles;
});
