/**
 * Question views are filters used for subscribing to and viewing questions
 * @namespace Questions.views
 */
Questions.views = {};

/**
 * Add a question view
 * @param {string} viewName - The name of the view
 * @param {function} [viewFunction] - The function used to calculate query terms. Takes terms and baseParameters arguments
 */
Questions.views.add = function (viewName, viewFunction) {
  Questions.views[viewName] = viewFunction;
};

/**
 * Base parameters that will be common to all other view unless specific properties are overwritten
 */
Questions.views.baseParameters = {
  find: {
    status: Questions.config.STATUS_APPROVED
  },
  options: {
    limit: 10
  }
};

/**
 * Top view
 */
Questions.views.add("top", function (terms) {
  return {
    options: {sort: {sticky: -1, score: -1}}
  };
});

/**
 * New view
 */
Questions.views.add("new", function (terms) {
  return {
    options: {sort: {sticky: -1, postedAt: -1}}
  };
});

/**
 * Best view
 */
Questions.views.add("best", function (terms) {
  return {
    options: {sort: {sticky: -1, baseScore: -1}}
  };
});

/**
 * Pending view
 */
Questions.views.add("pending", function (terms) {
  return {
    find: {
      status: Questions.config.STATUS_PENDING
    },
    options: {sort: {createdAt: -1}},
    showFuture: true
  };
});

/**
 * Rejected view
 */
Questions.views.add("rejected", function (terms) {
  return {
    find: {
      status: Questions.config.STATUS_REJECTED
    },
    options: {sort: {createdAt: -1}},
    showFuture: true
  };
});

/**
 * Scheduled view
 */
Questions.views.add("scheduled", function (terms) {
  return {
    find: {postedAt: {$gte: new Date()}},
    options: {sort: {postedAt: -1}},
    showFuture: true
  };
});

/**
 * User questions view
 */
Questions.views.add("userQuestions", function (terms) {
  return {
    find: {userId: terms.userId},
    options: {limit: 5, sort: {postedAt: -1}}
  };
});
