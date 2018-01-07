Template.user_followed_users.helpers({
  arguments: function () {
    var user = this;
    return {
      // template: "users_list_compact",
      // options: {
      //   currentUser: user,
      //   fieldLabel: "Followed at",
      //   fieldValue: function (user) {
      //     var user = this.currentUser;
      //     var item = _.findWhere(user.grudr.followedItems.Users, {itemId: user._id});
      //     return moment(item.followedAt).format("MMM Do, YYYY, hh:mm A");
      //   }
      // },
      terms: {
        view: 'userFollowedUsers',
        userId: user._id,
        limit: 5
      }
    }
  }
});
