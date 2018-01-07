Template.story_reply.helpers({
  user: function () {
    if(this.story){
      var user = Users.findOne(this.story.userId);
      return user;
    }
  }
});
