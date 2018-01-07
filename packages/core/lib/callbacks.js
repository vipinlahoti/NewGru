var modifyKarma = function (userId, karma) {
  Meteor.users.update({_id: userId}, {$inc: {"grudr.karma": karma}});
};

/**
 * Update an item's (article or comment) score
 * @param {object} item - The item being operated on
 * @param {object} user - The user doing the operation
 * @param {object} collection - The collection the item belongs to
 * @param {string} operation - The operation being performed
 */
function updateScore (item, user, collection, operation) {
  Grudr.updateScore({collection: collection, item: item, forceUpdate: true});
}
Grudr.callbacks.add("upvoteAsync", updateScore);
Grudr.callbacks.add("downvoteAsync", updateScore);
Grudr.callbacks.add("cancelUpvoteAsync", updateScore);
Grudr.callbacks.add("cancelDownvoteAsync", updateScore);

/**
 * Update the profile of the user doing the operation
 * @param {object} item - The item being operated on
 * @param {object} user - The user doing the operation
 * @param {object} collection - The collection the item belongs to
 * @param {string} operation - The operation being performed
 */
function updateUser (item, user, collection, operation) {

  var update = {};
  var votePower = Grudr.getVotePower(user);
  var vote = {
    itemId: item._id,
    votedAt: new Date(),
    power: votePower
  };

  switch (operation) {
    case "upvote":
      update.$addToSet = {'grudr.upvotedArticles': vote};
      break;
    case "downvote":
      update.$addToSet = {'grudr.downvotedArticles': vote};
      break;
    case "cancelUpvote": 
      update.$pull = {'grudr.upvotedArticles': {itemId: item._id}};
      break;
    case "cancelDownvote": 
      update.$pull = {'grudr.downvotedArticles': {itemId: item._id}};
      break;
  }

  Meteor.users.update({_id: user._id}, update);

}
Grudr.callbacks.add("upvoteAsync", updateUser);
Grudr.callbacks.add("downvoteAsync", updateUser);
Grudr.callbacks.add("cancelUpvoteAsync", updateUser);
Grudr.callbacks.add("cancelDownvoteAsync", updateUser);

/**
 * Update the karma of the item's owner
 * @param {object} item - The item being operated on
 * @param {object} user - The user doing the operation
 * @param {object} collection - The collection the item belongs to
 * @param {string} operation - The operation being performed
 */
function updateKarma (item, user, collection, operation) {

  var votePower = Grudr.getVotePower(user);
  var karmaAmount = (operation === "upvote" || operation === "cancelDownvote") ? votePower : -votePower;
  
  // only update karma is the operation isn't done by the item's author
  if (item.userId !== user._id) {
    Meteor.users.update({_id: item.userId}, {$inc: {"grudr.karma": karmaAmount}});
  }

}
Grudr.callbacks.add("upvoteAsync", updateKarma);
Grudr.callbacks.add("downvoteAsync", updateKarma);
Grudr.callbacks.add("cancelUpvoteAsync", updateKarma);
Grudr.callbacks.add("cancelDownvoteAsync", updateKarma);
