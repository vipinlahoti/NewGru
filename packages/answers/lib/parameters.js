Answers.parameters = {};

/**
 * Gives an object containing the appropriate find
 * and options arguments for the subscriptions's Answers.find()
 * @param {Object} terms
 */
Answers.parameters.get = function (terms) {

  // add this to ensure all question publications pass audit-arguments-check
  check(terms, Match.Any);
  
  // console.log(terms)

  // note: using jquery's extend() with "deep" parameter set to true instead of shallow _.extend()
  // see: http://api.jquery.com/jQuery.extend/

  // initialize parameters by extending baseParameters object, to avoid passing it by reference
  var parameters = Grudr.utils.deepExtend(true, {}, Answers.views.baseParameters);

  // get query parameters according to current view
  if (typeof Answers.views[terms.view] !== 'undefined')
    parameters = Grudr.utils.deepExtend(true, parameters, Answers.views[terms.view](terms));

  // iterate over answersParameters callbacks
  parameters = Grudr.callbacks.run("answersParameters", parameters, terms);

  // console.log(parameters);

  return parameters;
};

// limit the number of items that can be requested at once
function limitAnswers (parameters, terms) {
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
Grudr.callbacks.add("answersParameters", limitAnswers);
