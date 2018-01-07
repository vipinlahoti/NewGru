//////////////////
// Link Helpers //
//////////////////

/**
 * Return a question's link if it has one, else return its question page URL
 * @param {Object} question
 */
Questions.getLink = function (question, isAbsolute) {
  return this.getPageUrl(question, isAbsolute);
};
Questions.helpers({getLink: function (isAbsolute) {return Questions.getLink(this, isAbsolute);}});

/**
 * Depending on the settings, return either a question's URL link (if it has one) or its page URL.
 * @param {Object} question
 */
Questions.getShareableLink = function (question) {
  return Settings.get("outsideLinksPointTo", "link") === "link" ? Questions.getLink(question) : Questions.getPageUrl(question, true);
};
Questions.helpers({getShareableLink: function () {return Questions.getShareableLink(this);}});

/**
 * Get URL of a question page.
 * @param {Object} question
 */
Questions.getPageUrl = function(question, isAbsolute){
  var isAbsolute = typeof isAbsolute === "undefined" ? false : isAbsolute; // default to false
  var prefix = isAbsolute ? Grudr.utils.getSiteUrl().slice(0,-1) : "";
  return prefix + FlowRouter.path("questionPage", question);
};
Questions.helpers({getPageUrl: function (isAbsolute) {return Questions.getPageUrl(this, isAbsolute);}});

/**
 * Get question edit page URL.
 * @param {String} id
 */
Questions.getEditUrl = function(question, isAbsolute){
  var isAbsolute = typeof isAbsolute === "undefined" ? false : isAbsolute; // default to false
  var prefix = isAbsolute ? Grudr.utils.getSiteUrl().slice(0,-1) : "";
  return prefix + FlowRouter.path("questionEdit", question);
};
Questions.helpers({getEditUrl: function (isAbsolute) {return Questions.getEditUrl(this, isAbsolute);}});

///////////////////
// Other Helpers //
///////////////////

/**
 * Get a question author's name
 * @param {Object} question
 */
Questions.getAuthorName = function (question) {
  var user = Meteor.users.findOne(question.userId);
  if (user) {
    return user.getDisplayName();
  } else {
    return question.author;
  }
};
Questions.helpers({getAuthorName: function () {return Questions.getAuthorName(this);}});

/**
 * Get default status for new questions.
 * @param {Object} user
 */
Questions.getDefaultStatus = function (user) {
  var hasAdminRights = typeof user === 'undefined' ? false : Users.is.admin(user);
  if (hasAdminRights || !Settings.get('requireQuestionsApproval', false)) {
    // if user is admin, or else question approval is not required
    return Questions.config.STATUS_APPROVED;
  } else {
    return Questions.config.STATUS_PENDING;
  }
};

/**
 * Check if a question is approved
 * @param {Object} question
 */
Questions.isApproved = function (question) {
  return question.status === Questions.config.STATUS_APPROVED;
};
Questions.helpers({isApproved: function () {return Questions.isApproved(this);}});

/**
 * Check to see if question URL is unique.
 * We need the current user so we know who to upvote the existing question as.
 * @param {String} url
 */
Questions.checkForSameUrl = function (url) {

  // check that there are no previous questions with the same link in the past 6 months
  var sixMonthsAgo = moment().subtract(6, 'months').toDate();
  var questionWithSameLink = Questions.findOne({url: url, postedAt: {$gte: sixMonthsAgo}});

  if (typeof questionWithSameLink !== 'undefined') {
    throw new Meteor.Error('603', 'This link has already been posted', questionWithSameLink._id);
  }
};

/**
 * When on a question page, return the current question
 */
Questions.current = function () {
  return Questions.findOne(FlowRouter.getParam("_id"));
};

/**
 * Check to see if a question is a link to a video
 * @param {Object} question
 */
Questions.isVideo = function (question) {
  return question.media && question.media.type === "video";
};
Questions.helpers({isVideo: function () {return Questions.isVideo(this);}});
