// accept either an ID or a slug
Meteor.publish('singleUser', function(idOrSlug) {
  
  this.unblock();

  var findById = Meteor.users.findOne(idOrSlug);
  var findBySlug = Meteor.users.findOne({"grudr.slug": idOrSlug});
  var user = typeof findById !== 'undefined' ? findById : findBySlug;
  var options = Users.is.adminById(this.userId) ? {} : {fields: Users.pubsub.publicProperties};
  if (user) {
    return Meteor.users.find({_id: user._id}, options);
  }
  return [];
});

Meteor.publish('userArticles', function(terms) {

  this.unblock();

  terms.currentUserId = this.userId; // add userId to terms

  var parameters = Articles.parameters.get(terms);
  var articles = Articles.find(parameters.find, parameters.options);
  return articles;
});

Meteor.publish('userUpvotedArticles', function(terms) {

  this.unblock();

  terms.currentUserId = this.userId; // add userId to terms

  var parameters = Articles.parameters.get(terms);
  var articles = Articles.find(parameters.find, parameters.options);
  return articles;
});

Meteor.publish('userDownvotedArticles', function(terms) {

  this.unblock();

  terms.currentUserId = this.userId; // add userId to terms

  var parameters = Articles.parameters.get(terms);
  var articles = Articles.find(parameters.find, parameters.options);
  return articles;
});

Meteor.publish('userQuestions', function(terms) {

  this.unblock();

  terms.currentUserId = this.userId; // add userId to terms

  var parameters = Questions.parameters.get(terms);
  var questions = Questions.find(parameters.find, parameters.options);
  return questions;
});

// Publish the current user

Meteor.publish('currentUser', function() {

  this.unblock();

  var user = Meteor.users.find({_id: this.userId}, {fields: Users.pubsub.hiddenProperties});
  return user;
});


// publish all users for admins to make autocomplete work
// TODO: find a better way

Meteor.publish('allUsersAdmin', function() {

  this.unblock();

  var selector = (Settings.get('requireArticleInvite') || Settings.get('requireQuestionInvite')) ? {isInvited: true} : {}; // only users that can article
  if (Users.is.adminById(this.userId)) {
    return Meteor.users.find(selector, {fields: Users.pubsub.avatarProperties});
  }
  return [];
});

// Publish all users to reactive-table (if admin)
// Limit, filter, and sort handled by reactive-table.
// https://github.com/aslagle/reactive-table#server-side-pagination-and-filtering-beta

ReactiveTable.publish("all-users", function() {

  this.unblock();
  
  if(Users.is.adminById(this.userId)){
    return Meteor.users;
  } else {
    return [];
  }
});


AccountsTemplates.configure({
  reCaptcha: {
    secretKey: '6LeDphgUAAAAAMYpOMtx0nmTStUuL7ITZMCXv_VZ'
  },
});
