Template.article_subscribe.helpers({
  canSubscribe: function() {
    // you cannot subscribe to your own articles
    return Meteor.userId() && this.userId !== Meteor.userId();
  },
  subscribed: function() {
    var user = Meteor.user();
    if (!user) return false;

    return _.include(this.subscribers, user._id);
  }
});

Template.article_subscribe.events({
  'click .subscribe-link': function(e, instance) {
    e.preventDefault();
    if (this.userId === Meteor.userId())
      return;

    var article = this;

    if (!Meteor.user()) {
      FlowRouter.go('signIn');
      Messages.flash("Please log in first", "info");
    }

    Meteor.call('subscribeArticle', article._id, function(error, result) {
      if (result)
        Events.track("article subscribed", {'_id': article._id});
    });
  },

  'click .unsubscribe-link': function(e, instance) {
    e.preventDefault();
    var article = this;

    if (!Meteor.user()) {
      FlowRouter.go('signIn');
      Messages.flash("Please log in first", "info");
    }

    Meteor.call('unsubscribeArticle', article._id, function(error, result) {
      if (result)
        Events.track("article unsubscribed", {'_id': article._id});
    });
  }
});
