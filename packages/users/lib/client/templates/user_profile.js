Template.user_profile.onCreated(function  () {
  var user = this.data.user;
  Grudr.SEO.setTitle(user.getDisplayName());
});

Template.user_profile.helpers({
  userAvatar: function () {
    // var user = this.user ? this.user :
    //     this.userId ? Meteor.users.findOne(this.userId) : null;
    
    // var avatarUrl = Users.avatar.getUserEmail();
    // console.log(`avatarUrl ${avatarUrl}`);
    // return avatarUrl;
  }
});
