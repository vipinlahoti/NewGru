/**
 * Story views are filters used for subscribing to and viewing stories
 * @namespace Stories.views
 */
Stories.views = {};

/**
 * Add a module to a story view
 * @param {string} viewName - The name of the view
 * @param {function} [viewFunction] - The function used to calculate query terms. Takes terms and baseParameters arguments
 */
Stories.views.add = function (viewName, viewFunction) {
  Stories.views[viewName] = viewFunction;
};

// will be common to all other view unless specific properties are overwritten
Stories.views.baseParameters = {
  options: {
    limit: 10
  }
};

Stories.views.add("userStories", function (terms) {
  return {
    find: {userId: terms.userId},
    options: {limit: 0, sort: {score: -1, postedAt: -1}}
  };
});

Stories.views.add("userStories", function (terms) {
  return {
    find: {userId: terms.userId},
    options: {sort: {postedAt: -1}}
  };
});
