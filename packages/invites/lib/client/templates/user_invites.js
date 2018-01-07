Template.user_invites.created = function () {

  var user = this.data;
  var instance = this;

  instance.invites = new ReactiveVar({});

  Meteor.autorun(function () {
    Grudr.subsManager.subscribe('invites', user._id);
    var invites = Invites.find({invitingUserId: user._id});
    instance.invites.set(invites);
  });
};

Template.user_invites.helpers({
  canCurrentUserInvite: function () {
    var currentUser = Meteor.user();
    return currentUser && (Users.is.admin(currentUser) || currentUser.grudr.inviteCount > 0 && Users.can.invite(currentUser));
  },
  invitesLeft: function () {
    var currentUser = Meteor.user();
    return (currentUser && !(Users.is.admin(currentUser))) ? (currentUser.grudr.inviteCount - currentUser.grudr.invitedCount) : 0
  },
  // invitesEnable: function () {
  //   if(invitesLeft ===0);
  //   return true;
  // },
  invitesSchema: function () {
    // expose schema for Invites (used by AutoForm)
    return Invites.simpleSchema();
  },
  invites: function () {
    return Template.instance().invites.get();
  }
});

AutoForm.hooks({
  inviteForm: {

    onSuccess: function(operation, result) {
      if(result && result.newUser){
        Bert.alert( 'An invite has been sent out. Thank you!', 'success', 'growl-top-right' );
      } else {
        Bert.alert( 'Thank you!', 'info', 'growl-top-right' );
      }
    },

    onError: function(operation, error) {
      if(error && error.reason){
        Bert.alert( error.message, 'danger', 'growl-top-right' );
      }
    }
  }
});
