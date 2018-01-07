Template.article_vote.helpers({
  enableDownvotes: function () {
    return Settings.get("enableDownvotes", false);
  },
  actionsClass: function () {
    var user = Meteor.user();
    var actionsClass = "";
    if(!user) return false;
    if (user.hasUpvoted(this)) {
      actionsClass += " voted upvoted";
    }
    if (user.hasDownvoted(this)) {
      actionsClass += " voted downvoted";
    }
    if (Settings.get("enableDownvotes", false)) {
      actionsClass += " downvotes-enabled";
    }
    return actionsClass;
  }
});

Template.article_vote.events({
  'click .upvote-link': function(e){
    var article = this;
    var user = Meteor.user();
    e.preventDefault();
    if(!user){
      FlowRouter.go('signIn');
      Bert.alert( 'Please log in first', 'info', 'growl-top-right' );
    } else if (user.hasUpvoted(article)) {
      Meteor.call('cancelUpvoteArticle', article._id, function(){
        Events.track("article upvote cancelled", {'_id': article._id});
      });        
    } else {
      Meteor.call('upvoteArticle', article._id, function(){
        Events.track("article upvoted", {'_id': article._id});
      });  
    }
  },
  'click .downvote-link': function(e){
    var article = this;
    var user = Meteor.user();
    e.preventDefault();
    if(!user){
      FlowRouter.go('signIn');
      Bert.alert( 'Please log in first', 'info', 'growl-top-right' );
    }
    if (user.hasDownvoted(article)) {
      Meteor.call('cancelDownvoteArticle', article._id, function(){
        Events.track("article downvote cancelled", {'_id': article._id});
      });        
    } else {
      Meteor.call('downvoteArticle', article._id, function(){
        Events.track("article downvoted", {'_id': article._id});
      });  
    }
  }  
});
