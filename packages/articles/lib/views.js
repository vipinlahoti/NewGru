/**
 * Article views are filters used for subscribing to and viewing articles
 * @namespace Articles.views
 */
Articles.views = {};

/**
 * Add a article view
 * @param {string} viewName - The name of the view
 * @param {function} [viewFunction] - The function used to calculate query terms. Takes terms and baseParameters arguments
 */
Articles.views.add = function (viewName, viewFunction) {
  Articles.views[viewName] = viewFunction;
};

/**
 * Base parameters that will be common to all other view unless specific properties are overwritten
 */
Articles.views.baseParameters = {
  find: {
    status: Articles.config.STATUS_APPROVED
  },
  options: {
    limit: 10
  }
};

/**
 * Top view
 */
Articles.views.add("top", function (terms) {
  return {
    options: {sort: {sticky: -1, score: -1}}
  };
});

/**
 * New view
 */
Articles.views.add("new", function (terms) {
  return {
    options: {sort: {sticky: -1, postedAt: -1}}
  };
});

/**
 * Best view
 */
Articles.views.add("best", function (terms) {
  return {
    options: {sort: {sticky: -1, baseScore: -1}}
  };
});

/**
 * Pending view
 */
Articles.views.add("pending", function (terms) {
  return {
    find: {
      status: Articles.config.STATUS_PENDING
    },
    options: {sort: {createdAt: -1}},
    showFuture: true
  };
});

/**
 * Rejected view
 */
Articles.views.add("rejected", function (terms) {
  return {
    find: {
      status: Articles.config.STATUS_REJECTED
    },
    options: {sort: {createdAt: -1}},
    showFuture: true
  };
});

/**
 * Scheduled view
 */
Articles.views.add("scheduled", function (terms) {
  return {
    find: {postedAt: {$gte: new Date()}},
    options: {sort: {postedAt: -1}},
    showFuture: true
  };
});

/**
 * User articles view
 */
Articles.views.add("userArticles", function (terms) {
  return {
    find: {userId: terms.userId},
    options: {limit: 5, sort: {postedAt: -1}}
  };
});

/**
 * User upvoted articles view
 */
Articles.views.add("userUpvotedArticles", function (terms) {
  var user = Meteor.users.findOne(terms.userId);
  var articlesIds = _.pluck(user.grudr.upvotedArticles, "itemId");
  return {
    find: {_id: {$in: articlesIds}, userId: {$ne: terms.userId}}, // exclude own articles
    options: {limit: 5, sort: {postedAt: -1}}
  };
});

/**
 * User downvoted articles view
 */
Articles.views.add("userDownvotedArticles", function (terms) {
  var user = Meteor.users.findOne(terms.userId);
  var articlesIds = _.pluck(user.grudr.downvotedArticles, "itemId");
  // TODO: sort based on votedAt timestamp and not postedAt, if possible
  return {
    find: {_id: {$in: articlesIds}},
    options: {limit: 5, sort: {postedAt: -1}}
  };
});
