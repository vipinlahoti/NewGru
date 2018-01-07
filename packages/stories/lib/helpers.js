//////////////////
// Link Helpers //
//////////////////

/**
 * Get URL of a story page.
 * @param {Object} story
 */
Stories.getPageUrl = function(story, isAbsolute){
  var isAbsolute = typeof isAbsolute === "undefined" ? false : isAbsolute; // default to false
  var prefix = isAbsolute ? Grudr.utils.getSiteUrl().slice(0,-1) : "";
  return prefix + FlowRouter.path("storyPage", story);
};
Stories.helpers({getPageUrl: function () {return Stories.getPageUrl(this);}});

///////////////////
// Other Helpers //
///////////////////

/**
 * Get a story author's name
 * @param {Object} story
 */
Stories.getAuthorName = function (story) {
  var user = Meteor.users.findOne(story.userId);
  if (user) {
    return user.getDisplayName();
  } else {
    return story.author;
  }
};
Stories.helpers({getAuthorName: function () {return Stories.getAuthorName(this);}});
