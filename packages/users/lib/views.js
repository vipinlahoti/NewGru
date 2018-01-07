/**
 * User views are filters used for subscribing to and viewing answers
 * @namespace Users.views
 */
Users.views = {};

/**
 * Add a module to a answer view
 * @param {string} viewName - The name of the view
 * @param {function} [viewFunction] - The function used to calculate query terms. Takes terms and baseParameters arguments
 */
Users.views.add = function (viewName, viewFunction) {
  Users.views[viewName] = viewFunction;
};

// will be common to all other view unless specific properties are overwritten
Users.views.baseParameters = {
  options: {
    limit: 10
  }
};
