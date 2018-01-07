Stories.parameters = {};

/**
 * Gives an object containing the appropriate find
 * and options arguments for the subscriptions's Stories.find()
 * @param {Object} terms
 */
Stories.parameters.get = function (terms) {

  // add this to ensure all user publications pass audit-arguments-check
  check(terms, Match.Any);
  
  // console.log(terms)

  // note: using jquery's extend() with "deep" parameter set to true instead of shallow _.extend()
  // see: http://api.jquery.com/jQuery.extend/

  // initialize parameters by extending baseParameters object, to avoid passing it by reference
  var parameters = Grudr.utils.deepExtend(true, {}, Stories.views.baseParameters);

  // get query parameters according to current view
  if (typeof Stories.views[terms.view] !== 'undefined')
    parameters = Grudr.utils.deepExtend(true, parameters, Stories.views[terms.view](terms));

  // iterate over storiesParameters callbacks
  parameters = Grudr.callbacks.run("storiesParameters", parameters, terms);

  // console.log(parameters);

  return parameters;
};

// limit the number of items that can be requested at once
function limitStories (parameters, terms) {
  var maxLimit = 1000;
  // if a limit was provided with the terms, add it too (note: limit=0 means "no limit")
  if (typeof terms.limit !== 'undefined') {
    _.extend(parameters.options, {limit: parseInt(terms.limit)});
  }

  // limit to "maxLimit" items at most when limit is undefined, equal to 0, or superior to maxLimit
  if(!parameters.options.limit || parameters.options.limit === 0 || parameters.options.limit > maxLimit) {
    parameters.options.limit = maxLimit;
  }
  return parameters;
}
Grudr.callbacks.add("storiesParameters", limitStories);
