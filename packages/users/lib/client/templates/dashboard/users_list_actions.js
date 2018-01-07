Template.users_list_actions.helpers({
  isInvited: function() {
    return this.grudr.isInvited;
  },
  userIsAdmin: function(){
    return Users.is.admin(this);
  },
});

Template.users_list_actions.events({
  'click .invite-link': function(e){
    e.preventDefault();
    Meteor.users.update(this._id, {$set: {"grudr.isInvited": true}});

  },
  'click .uninvite-link': function(e){
    e.preventDefault();
    Meteor.users.update(this._id, {$set: {"grudr.isInvited": false}});
  },
  'click .admin-link': function(e){
    e.preventDefault();
    Users.updateAdmin(this._id, true);
  },
  'click .unadmin-link': function(e){
    e.preventDefault();
    Users.updateAdmin(this._id, false);
  },
  'click .delete-link': function(e){
    e.preventDefault();
    if(confirm("Are you sure you want to delete " + Users.getDisplayName(this) + "?")) {
      if(confirm("Delete user's articles, auestions, journals, comments, and answers as well?")) {
        Meteor.call("removeUser", this._id, true, function (error, result) {
          if (result) {
            Bert.alert( result, 'growl-top-right' );
          }
        });
      } else {
        Meteor.call("removeUser", this._id, false, function (error, result) {
          if (result) {
            Bert.alert( result, 'growl-top-right' );
          }
        });
      }
    }
  }
});
