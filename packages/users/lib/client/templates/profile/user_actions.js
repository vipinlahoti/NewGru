Template.user_actions.helpers({
  arguments: function () {
    var user = this;
    return {      
      terms: {
        view: 'userActions',
        userId: user._id,
        limit: 5,
        enableCache: false,
        subscribeToUsers: false
      }
    };
  }
});
