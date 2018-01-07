Template.user_info.helpers({
  canEditProfile: function() {
    var currentUser = Meteor.user();
    return currentUser && (this._id === currentUser._id || Users.is.admin(currentUser));
  },
  createdAtFormatted: function() {
    return this.createdAt;
  },
  canInvite: function() {
    // if the user is logged in, the target user hasn't been invited yet, invites are enabled, and user is not viewing their own profile
    return Meteor.user() && Meteor.user()._id !== this._id && !Users.is.invited(this) && Grudr.utils.invitesEnabled() && Users.can.invite(Meteor.user());
  },
  inviteCount: function() {
    return Meteor.user().grudr.inviteCount;
  },
  getTwitterName: function () {
    return Users.getTwitterName(this);
  },
  getGitHubName: function () {
    return Users.getGitHubName(this);
  },
  publicProfileFields: function () {
    var user = this;
    var schema = Users.simpleSchema();
    var publicData = _.compact(_.map(schema.getProfileFields(), function (fieldName) {
      if (Grudr.getNestedProperty(user, fieldName)) {
        var field = schema._schema[fieldName];
        var item = {
          label: !!field.label ? field.label: fieldName.replace("grudr.", ""),
          value: Grudr.getNestedProperty(user, fieldName)
        };
        if (!!field.template) {
          item.template = field.template;
        }
        return item;
      }
    }));
    return publicData;
  },
  isUsingPassword: function () {
    return !!this.services.password;
  }
});

Template.user_info.events({
  'click .invite-link': function(e, instance){
    var user = this;
    Meteor.call('inviteUser', {userId: user._id}, function(error, success){
      if (error) {
        Bert.alert( error, 'danger', 'growl-top-right' );
      } else {
        Bert.alert( 'Thanks, user has been invited.', 'success', 'growl-top-right' );
      }
    });
  }
});

Template.user_info.usersOnline = function() {
  return Meteor.users.find({ "status.online": true })
};
