Users.addField({
  fieldName: 'grudr.followedItems',
  fieldSchema: {
    type: Object,
    optional: true,
    blackbox: true,
    autoform: {
      omit: true
    }
  }
});

Users.addField({
  fieldName: 'followers',
  fieldSchema: {
    type: [String],
    optional: true,
    autoform: {
      omit: true
    }
  }
});

Users.addField({
  fieldName: 'followerCount',
  fieldSchema: {
    type: Number,
    optional: true,
    autoform: {
      omit: true
    }
  }
});

Grudr.modules.add("profileEdit", {
  template: 'user_followed_users',
  order: 5
});

// Grudr.modules.add("commentThreadBottom", {
//   template: 'user_follow',
//   order: 10
// });

Users.views.add("userFollowedUsers", function (terms) {
  var user = Meteor.users.findOne(terms.userId),
      usersIds = [];

  if (user && user.grudr.followedItems && user.grudr.followedItems.Users) {
    usersIds = _.pluck(user.grudr.followedItems.Users, "itemId");
  }

  return {
    find: {_id: {$in: usersIds}},
    options: {limit: 5, sort: {postedAt: -1}}
  };
});

var hasFollowedItem = function (item, user) {
  return item.followers && item.followers.indexOf(user._id) != -1;
};

var addFollowedItem = function (userId, item, collectionName) {
  var field = 'grudr.followedItems.' + collectionName;
  var add = {};
  add[field] = item;
  Meteor.users.update({_id: userId}, {
    $addToSet: add
  });
};

var removeFollowedItem = function (userId, itemId, collectionName) {
  var field = 'grudr.followedItems.' + collectionName;
  var remove = {};
  remove[field] = {itemId: itemId};
  Meteor.users.update({_id: userId}, {
    $pull: remove
  });
};

followItem = function (collection, itemId, user) {
  var item = collection.findOne(itemId),
      collectionName = collection._name.slice(0,1).toUpperCase() + collection._name.slice(1);

  if (!user || !item || hasFollowedItem(item, user))
    return false;

  // author can't follow item
  if (item.userId && item.userId === user._id)
    return false

  // Subscribe
  var result = collection.update({_id: itemId, followers: { $ne: user._id }}, {
    $addToSet: {followers: user._id},
    $inc: {followerCount: 1}
  });

  if (result > 0) {
    // Add item to list of followed items
    var obj = {
      itemId: item._id,
      followedAt: new Date()
    };
    addFollowedItem(user._id, obj, collectionName);
  }

  return true;
};

unfollowItem = function (collection, itemId, user) {
  var user = Meteor.user(),
      item = collection.findOne(itemId),
      collectionName = collection._name.slice(0,1).toUpperCase()+collection._name.slice(1);

  if (!user || !item  || !hasFollowedItem(item, user))
    return false;

  // Unfollow
  var result = collection.update({_id: itemId, followers: user._id }, {
    $pull: {followers: user._id},
    $inc: {followerCount: -1}
  });

  if (result > 0) {
    // Remove item from list of followed items
    removeFollowedItem(user._id, itemId, collectionName);
  }
  return true;
};

Meteor.methods({
  followUser: function(userId) {
    check(userId, String);
    return followItem.call(this, Users, userId, Meteor.user());
  },
  unfollowUser: function(userId) {
    check(userId, String);
    return unfollowItem.call(this, Users, userId, Meteor.user());
  }
});
