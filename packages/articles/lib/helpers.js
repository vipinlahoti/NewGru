//////////////////
// Link Helpers //
//////////////////

/**
 * Return a article's link if it has one, else return its article page URL
 * @param {Object} article
 */
Articles.getLink = function (article, isAbsolute) {
  return !!article.url ? Grudr.utils.getOutgoingUrl(article.url) : this.getPageUrl(article, isAbsolute);
};
Articles.helpers({getLink: function (isAbsolute) {return Articles.getLink(this, isAbsolute);}});

/**
 * Depending on the settings, return either a article's URL link (if it has one) or its page URL.
 * @param {Object} article
 */
Articles.getShareableLink = function (article) {
  return Settings.get("outsideLinksPointTo", "link") === "link" ? Articles.getLink(article) : Articles.getPageUrl(article, true);
};
Articles.helpers({getShareableLink: function () {return Articles.getShareableLink(this);}});

/**
 * Whether a article's link should open in a new tab or not
 * @param {Object} article
 */
Articles.getLinkTarget = function (article) {
  return !!article.url ? "_blank" : "";
};
Articles.helpers({getLinkTarget: function () {return Articles.getLinkTarget(this);}});

/**
 * Get URL of a article page.
 * @param {Object} article
 */
Articles.getPageUrl = function(article, isAbsolute){
  var isAbsolute = typeof isAbsolute === "undefined" ? false : isAbsolute; // default to false
  var prefix = isAbsolute ? Grudr.utils.getSiteUrl().slice(0,-1) : "";
  return prefix + FlowRouter.path("articlePage", article);
};
Articles.helpers({getPageUrl: function (isAbsolute) {return Articles.getPageUrl(this, isAbsolute);}});

/**
 * Get article edit page URL.
 * @param {String} id
 */
Articles.getEditUrl = function(article, isAbsolute){
  var isAbsolute = typeof isAbsolute === "undefined" ? false : isAbsolute; // default to false
  var prefix = isAbsolute ? Grudr.utils.getSiteUrl().slice(0,-1) : "";
  return prefix + FlowRouter.path("articleEdit", article);
};
Articles.helpers({getEditUrl: function (isAbsolute) {return Articles.getEditUrl(this, isAbsolute);}});

///////////////////
// Other Helpers //
///////////////////

/**
 * Get a article author's name
 * @param {Object} article
 */
Articles.getAuthorName = function (article) {
  var user = Meteor.users.findOne(article.userId);
  if (user) {
    return user.getDisplayName();
  } else {
    return article.author;
  }
};
Articles.helpers({getAuthorName: function () {return Articles.getAuthorName(this);}});

/**
 * Get default status for new articles.
 * @param {Object} user
 */
Articles.getDefaultStatus = function (user) {
  var hasAdminRights = typeof user === 'undefined' ? false : Users.is.admin(user);
  if (hasAdminRights || !Settings.get('requireArticlesApproval', false)) {
    // if user is admin, or else article approval is not required
    return Articles.config.STATUS_APPROVED;
  } else {
    return Articles.config.STATUS_PENDING;
  }
};

/**
 * Check if a article is approved
 * @param {Object} article
 */
Articles.isApproved = function (article) {
  return article.status === Articles.config.STATUS_APPROVED;
};
Articles.helpers({isApproved: function () {return Articles.isApproved(this);}});

/**
 * Check to see if article URL is unique.
 * We need the current user so we know who to upvote the existing article as.
 * @param {String} url
 */
Articles.checkForSameUrl = function (url) {

  // check that there are no previous articles with the same link in the past 6 months
  var sixMonthsAgo = moment().subtract(6, 'months').toDate();
  var articleWithSameLink = Articles.findOne({url: url, postedAt: {$gte: sixMonthsAgo}});

  if (typeof articleWithSameLink !== 'undefined') {
    throw new Meteor.Error('603', 'This link has already been posted', articleWithSameLink._id);
  }
};

/**
 * When on a article page, return the current article
 */
Articles.current = function () {
  return Articles.findOne(FlowRouter.getParam("_id"));
};

/**
 * Check to see if a article is a link to a video
 * @param {Object} article
 */
Articles.isVideo = function (article) {
  return article.media && article.media.type === "video";
};
Articles.helpers({isVideo: function () {return Articles.isVideo(this);}});
