/**
 * Answer views are filters used for subscribing to and viewing answers
 * @namespace Answers.views
 */
Answers.views = {};

/**
 * Add a module to a answer view
 * @param {string} viewName - The name of the view
 * @param {function} [viewFunction] - The function used to calculate query terms. Takes terms and baseParameters arguments
 */
Answers.views.add = function (viewName, viewFunction) {
  Answers.views[viewName] = viewFunction;
};

// will be common to all other view unless specific properties are overwritten
Answers.views.baseParameters = {
  options: {
    limit: 10
  }
};

Answers.views.add("questionAnswers", function (terms) {
  return {
    find: {questionId: terms.questionId},
    options: {limit: 0, sort: {score: -1, postedAt: -1}}
  };
});

Answers.views.add("userAnswers", function (terms) {
  return {
    find: {userId: terms.userId},
    options: {sort: {postedAt: -1}}
  };
});
