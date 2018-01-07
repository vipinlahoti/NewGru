//////////////////
// Link Helpers //
//////////////////

/**
 * Get URL of a answer page.
 * @param {Object} answer
 */
Answers.getPageUrl = function(answer, isAbsolute){
  var isAbsolute = typeof isAbsolute === "undefined" ? false : isAbsolute; // default to false
  var prefix = isAbsolute ? Grudr.utils.getSiteUrl().slice(0,-1) : "";
  return prefix + FlowRouter.path("answerPage", answer);
};
Answers.helpers({getPageUrl: function () {return Answers.getPageUrl(this);}});

///////////////////
// Other Helpers //
///////////////////

/**
 * Get a answer author's name
 * @param {Object} answer
 */
Answers.getAuthorName = function (answer) {
  var user = Meteor.users.findOne(answer.userId);
  if (user) {
    return user.getDisplayName();
  } else {
    return answer.author;
  }
};
Answers.helpers({getAuthorName: function () {return Answers.getAuthorName(this);}});
