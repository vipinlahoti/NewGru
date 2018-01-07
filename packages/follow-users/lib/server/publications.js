Meteor.publish('userFollowedUsers', function(terms) {

  if (this.userId) {
    terms.currentUserId = this.userId; // add userId to terms
  }

  var parameters = Users.parameters.get(terms);
  var users = Users.find(parameters.find, parameters.options);
  return users;
});
