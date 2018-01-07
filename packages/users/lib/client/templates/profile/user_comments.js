Template.user_comments.helpers({
  arguments: function () {
    var user = this;
    return {
      template: "comments_list_compact",
      options: {
        currentUser: user,
        fieldLabel: "Commented at",
        fieldValue: function (comment) {
          return moment(comment.createdAt).format("MMM Do, YYYY, hh:mm A");
        }
      },
      terms: {
        view: 'userComments',
        userId: user._id,
        limit: 5,
        enableCache: false,
        subscribeToUsers: true
      }
    };
  }
});
