var InviteSchema = new SimpleSchema({
  _id: {
    type: String,
    optional: true
  },
  invitingUserId: {
    type: String,
    optional: true
  },
  invitedUserEmail: {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  accepted: {
    type: Boolean,
    optional: true
  }
});

Invites = new Meteor.Collection("invites");
Invites.attachSchema(InviteSchema);

Users.addField([
  /**
    A count of the user's remaining invites
  */
  {
    fieldName: "grudr.inviteCount",
    fieldSchema: {
      type: Number,
      optional: true
    }
  },
  /**
    A count of how many users have been invited by the user
  */
  {
    fieldName: "grudr.invitedCount",
    fieldSchema: {
      type: Number,
      optional: true
    }
  },
  /**
    Whether the user is invited or not
  */
  {
    fieldName: "grudr.isInvited",
    fieldSchema: {
      type: Boolean,
      public: true,
      optional: true,
      editableBy: ["admin"],
      autoform: {
        omit: true
      }
    }
  },
  /**
    The _id of the user who invited the current user
  */
  {
    fieldName: "grudr.invitedBy",
    fieldSchema: {
      type: String,
      optional: true,
      autoform: {
        omit: true
      }
    }
  },
  /**
    The name of the user who invited the current user
  */
  {
    fieldName: "grudr.invitedByName",
    fieldSchema: {
      type: String,
      optional: true,
      autoform: {
        omit: true
      }
    }
  }
]);

// invites are managed through Meteor method

Invites.deny({
  insert: function(){ return true; },
  update: function(){ return true; },
  remove: function(){ return true; }
});

Grudr.modules.add("secondaryNav", {
  template: 'user_invites',
  order: 2
});

function setStartingInvites (user) {
  // give new users a few invites (default to 3)
  user.grudr.inviteCount = Settings.get('startInvitesCount', 5);
  return user;
}
Grudr.callbacks.add("onCreateUser", setStartingInvites);

// on profile completion, check if the new user has been invited
// if so set her status accordingly and update invitation info
function checkIfInvited (user) {

  var invite = Invites.findOne({ invitedUserEmail : Users.getEmail(user) });

  if(invite){

    var invitedBy = Meteor.users.findOne({ _id : invite.invitingUserId });

    Users.update(user._id, { $set: {
      "grudr.isInvited": true,
      "grudr.invitedBy": invitedBy._id,
      "grudr.invitedByName": Users.getDisplayName(invitedBy)
    }});

    Invites.update(invite._id, {$set : {
      accepted : true
    }});

  }
}
Grudr.callbacks.add("profileCompletedAsync", checkIfInvited);
