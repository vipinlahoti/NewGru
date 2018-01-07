Template.user_follow.helpers({
  canSubscribe: function() {
    // you cannot follow to your own users
    return Meteor.userId() && this.userId !== Meteor.userId();
  },
  followed: function() {
    var user = Meteor.user();
    if (!user) return false;

    return _.include(this.followers, user._id);
  }
});

Template.user_follow.events({
  'click .follow-link': function(e, instance) {
    e.preventDefault();
    if (this.userId === Meteor.userId())
      return;

    var user = this;

    if (!Meteor.user()) {
      FlowRouter.go('signIn');
      Messages.flash("Please log in first", "info");
    }

    Meteor.call('followUser', user._id, function(error, result) {
      if (result)
        Events.track("user followed", {'_id': user._id});
    });
  },

  'click .unfollow-link': function(e, instance) {
    e.preventDefault();
    var user = this;

    if (!Meteor.user()) {
      FlowRouter.go('signIn');
      Messages.flash("Please log in first", "info");
    }

    Meteor.call('unfollowUser', user._id, function(error, result) {
      if (result)
        Events.track("user unfollowed", {'_id': user._id});
    });
  }
});
