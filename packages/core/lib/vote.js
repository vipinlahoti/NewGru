// The equation to determine voting power. Defaults to returning 1 for everybody
Grudr.getVotePower = function (user) {
  return 1;
};

Grudr.operateOnItem = function (collection, itemId, user, operation) {

  user = typeof user === "undefined" ? Meteor.user() : user;

  var item = collection.findOne(itemId);
  var votePower = Grudr.getVotePower(user);
  var hasUpvotedItem = user.hasUpvotedItem(item);
  var hasDownvotedItem = user.hasDownvotedItem(item);
  var update = {};

  // console.log(collection)
  // console.log(item)
  // console.log(user)
  // console.log(operation)

  // make sure item and user are defined, and user can perform the operation
  if (
    !item ||
    !user || 
    !user.canVote() || 
    operation === "upvote" && hasUpvotedItem ||
    operation === "downvote" && hasDownvotedItem
  ) {
    return false; 
  }

  // ------------------------------ Sync Callbacks ------------------------------ //
  item = Grudr.callbacks.run(operation, item, user);

  switch (operation) {

    case "upvote":

      if (hasDownvotedItem) {
        Grudr.operateOnItem(collection, itemd, user, "cancelDownvote");
      }
      update = {
        $addToSet: {upvoters: user._id},
        $inc: {upvotes: 1, baseScore: votePower}
      }
      break;

    case "downvote":

      if (hasUpvotedItem) {
        Grudr.operateOnItem(collection, itemId, user, "cancelUpvote");
      }
      update = {
        $addToSet: {downvoters: user._id},
        $inc: {downvotes: 1, baseScore: -votePower}
      }
      break;

    case "cancelUpvote":

      update = {
        $pull: {upvoters: user._id},
        $inc: {upvotes: -1, baseScore: -votePower}
      };
      break;

    case "cancelDownvote":

      update = {
        $pull: {downvoters: user._id},
        $inc: {downvotes: -1, baseScore: votePower}
      };
      break;
  }



  update["$set"] = {inactive: false};
  var result = collection.update({_id: item._id}, update);


  if (result > 0) {

    // extend item with baseScore to help calculate newScore
    item = _.extend(item, {baseScore: (item.baseScore + votePower)});
    
    // --------------------- Server-Side Async Callbacks --------------------- //
    Grudr.callbacks.runAsync(operation+"Async", item, user, collection, operation);
    
    return true;

  }

}

Meteor.methods({
  // Articles
  upvoteArticle: function (articleId) {
    check(articleId, String);
    return Grudr.operateOnItem.call(this, Articles, articleId, Meteor.user(), "upvote");
  },
  downvoteArticle: function (articleId) {
    check(articleId, String);
    return Grudr.operateOnItem.call(this, Articles, articleId, Meteor.user(), "downvote");
  },
  cancelUpvoteArticle: function (articleId) {
    check(articleId, String);
    return Grudr.operateOnItem.call(this, Articles, articleId, Meteor.user(), "cancelUpvote");
  },
  cancelDownvoteArticle: function (articleId) {
    check(articleId, String);
    return Grudr.operateOnItem.call(this, Articles, articleId, Meteor.user(), "cancelDownvote");
  },

  // Answers
  upvoteAnswer: function (answerId) {
    check(answerId, String);
    return Grudr.operateOnItem.call(this, Answers, answerId, Meteor.user(), "upvote");
  },
  downvoteAnswer: function (answerId) {
    check(answerId, String);
    return Grudr.operateOnItem.call(this, Answers, answerId, Meteor.user(), "downvote");
  },
  cancelUpvoteAnswer: function (answerId) {
    check(answerId, String);
    return Grudr.operateOnItem.call(this, Answers, answerId, Meteor.user(), "cancelUpvote");
  },
  cancelDownvoteAnswer: function (answerId) {
    check(answerId, String);
    return Grudr.operateOnItem.call(this, Answers, answerId, Meteor.user(), "cancelDownvote");
  }
});
