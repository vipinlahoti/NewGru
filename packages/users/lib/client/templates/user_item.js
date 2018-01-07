Template.user_item.helpers({
  createdAtFormatted: function(){
    return this.createdAt ? moment(this.createdAt).fromNow() : '–';
  },
  getEmail: function(){
    return Users.getEmail(this);
  },
  articles: function(){
    return Articles.find({'userId':this._id});
  },
  comments: function(){
    return Comments.find({'userId':this._id});
  },
  questions: function(){
    return Questions.find({'userId':this._id});
  },
  answers: function(){
    return Answers.find({'userId':this._id});
  },
  userIsAdmin: function(){
    return Users.is.admin(this);
  },
  getProfileUrl: function () {
    return Users.getProfileUrl(this);
  },
  getKarma: function() {
    return Math.round(100*this.karma)/100;
  },
  getInvitedUserProfileUrl: function () {
    var user = Meteor.users.findOne(this.invitedId);
    return Users.getProfileUrl(user);
  }
});

Template.user_item.events({
  'click .invite-link': function(e, instance){
    e.preventDefault();
    Meteor.call('inviteUser', { userId : instance.data._id });
  },
  'click .uninvite-link': function(e, instance){
    e.preventDefault();
    Meteor.users.update(instance.data._id,{
      $set:{
        isInvited: false
      }
    });
  },
  'click .admin-link': function(e, instance){
    e.preventDefault();
    Users.updateAdmin(instance.data._id, true);
  },
  'click .unadmin-link': function(e, instance){
    e.preventDefault();
    Users.updateAdmin(instance.data._id, false);
  },
  'click .delete-link': function(e, instance){
    e.preventDefault();
    if(confirm("Are you sure you want to delete " + Users.getDisplayName(instance.data) + "?"))
      Meteor.users.remove(instance.data._id);
  }
});
