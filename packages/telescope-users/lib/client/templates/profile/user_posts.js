Template.user_posts.helpers({
  arguments: function () {
    var user = this;
    var args = {
      template: 'posts_list_compact',
      options: {
        currentUser: user,
        fieldLabel: 'Posted at',
        fieldValue: function (post) {
          return moment(post.postedAt).format('MM/DD/YYYY, HH:mm');
        }
      },
      terms: {
        view: 'userPosts',
        userId: user._id,
        limit: 5,
        enableCache: false,
        subscribeToUsers: false
      }
    };
    return args;
  }
});
