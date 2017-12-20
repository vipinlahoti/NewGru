Template.user_comments.helpers({
  arguments: function () {
    var user = this;
    return {
      template: 'comments_list_compact',
      options: {
        currentUser: user,
        fieldLabel: 'commented at',
        fieldValue: function (comment) {
          return moment(comment.createdAt).format('MM/DD/YYYY, HH:mm');
        }
      },
      terms: {
        view: 'userComments',
        userId: user._id,
        limit: 5,
        enableCache: false,
        subscribeToUsers: false
      }
    };
  }
});
