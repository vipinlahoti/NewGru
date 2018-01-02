/*

Questions helpers

*/

import moment from 'moment';
import { Questions } from './collection.js';
import Users from 'meteor/vulcan:users';
import { Utils, getSetting, registerSetting } from 'meteor/vulcan:core';

registerSetting('forum.outsideLinksPointTo', 'link', 'Whether to point RSS links to the linked URL (“link”) or back to the question page (“page”)');
registerSetting('forum.requireQuestionsApproval', false, 'Require questions to be approved manually');
registerSetting('twitterAccount', null, 'Twitter account associated with the app');
registerSetting('siteUrl', null, 'Main site URL');

//////////////////
// Link Helpers //
//////////////////

/**
 * @summary Return a question's link if it has one, else return its question page URL
 * @param {Object} question
 */
Questions.getLink = function (question, isAbsolute = false, isRedirected = true) {
  const url = isRedirected ? Utils.getOutgoingUrl(question.url) : question.url;
  return !!question.url ? url : Questions.getPageUrl(question, isAbsolute);
};

/**
 * @summary Depending on the settings, return either a question's URL link (if it has one) or its page URL.
 * @param {Object} question
 */
Questions.getShareableLink = function (question) {
  return getSetting('forum.outsideLinksPointTo', 'link') === 'link' ? Questions.getLink(question) : Questions.getPageUrl(question, true);
};

/**
 * @summary Whether a question's link should open in a new tab or not
 * @param {Object} question
 */
Questions.getLinkTarget = function (question) {
  return !!question.url ? '_blank' : '';
};

/**
 * @summary Get URL of a question page.
 * @param {Object} question
 */
Questions.getPageUrl = function(question, isAbsolute = false){
  const prefix = isAbsolute ? Utils.getSiteUrl().slice(0,-1) : '';
  return `${prefix}/questions/${question._id}/${question.slug}`;
};

///////////////////
// Other Helpers //
///////////////////

/**
 * @summary Get a question author's name
 * @param {Object} question
 */
Questions.getAuthorName = function (question) {
  var user = Users.findOne(question.userId);
  if (user) {
    return Users.getDisplayName(user);
  } else {
    return question.author;
  }
};

/**
 * @summary Get default status for new questions.
 * @param {Object} user
 */
Questions.getDefaultStatus = function (user) {
  const canQuestionApproved = typeof user === 'undefined' ? false : Users.canDo(user, 'questions.new.approved');
  if (!getSetting('forum.requireQuestionsApproval', false) || canQuestionApproved) {
    // if user can question straight to 'approved', or else question approval is not required
    return Questions.config.STATUS_APPROVED;
  } else {
    return Questions.config.STATUS_PENDING;
  }
};

/**
 * @summary Get status name
 * @param {Object} user
 */
Questions.getStatusName = function (question) {
  return Utils.findWhere(Questions.statuses, {value: question.status}).label;
};

/**
 * @summary Check if a question is approved
 * @param {Object} question
 */
Questions.isApproved = function (question) {
  return question.status === Questions.config.STATUS_APPROVED;
};

/**
 * @summary Check if a question is pending
 * @param {Object} question
 */
Questions.isPending = function (question) {
  return question.status === Questions.config.STATUS_PENDING;
};


/**
 * @summary Check to see if question URL is unique.
 * We need the current user so we know who to upvote the existing question as.
 * @param {String} url
 */
Questions.checkForSameUrl = function (url) {

  // check that there are no previous questions with the same link in the past 6 months
  var sixMonthsAgo = moment().subtract(6, 'months').toDate();
  var questionWithSameLink = Questions.findOne({url: url, postedAt: {$gte: sixMonthsAgo}});

  return !!questionWithSameLink;
};

/**
 * @summary When on a question page, return the current question
 */
Questions.current = function () {
  return Questions.findOne('foo');
};

/**
 * @summary Check to see if a question is a link to a video
 * @param {Object} question
 */
Questions.isVideo = function (question) {
  return question.media && question.media.type === 'video';
};

/**
 * @summary Get the complete thumbnail url whether it is hosted on Embedly or on an external website, or locally in the app.
 * @param {Object} question
 */
Questions.getThumbnailUrl = (question) => {
  const thumbnailUrl = question.thumbnailUrl;
  if (!!thumbnailUrl) {
    return thumbnailUrl.indexOf('//') > -1 ? Utils.addHttp(thumbnailUrl) : Utils.getSiteUrl().slice(0,-1) + thumbnailUrl;
  }
};

/**
 * @summary Get URL for sharing on Twitter.
 * @param {Object} question
 */
Questions.getTwitterShareUrl = question => {
  const via = getSetting('twitterAccount', null) ? `&via=${getSetting('twitterAccount')}` : '';
  return `https://twitter.com/intent/tweet?text=${ encodeURIComponent(question.title) }%20${ encodeURIComponent(Questions.getLink(question, true)) }${via}`;
};

/**
 * @summary Get URL for sharing on Facebook.
 * @param {Object} question
 */
Questions.getFacebookShareUrl = question => {
  return `https://www.facebook.com/sharer/sharer.php?u=${ encodeURIComponent(Questions.getLink(question, true)) }`;
};

/**
 * @summary Get URL for sharing by Email.
 * @param {Object} question
 */
Questions.getEmailShareUrl = question => {
  const subject = `Interesting link: ${question.title}`;
  const body = `I thought you might find this interesting:

${question.title}
${Questions.getLink(question, true, false)}

(found via ${getSetting('siteUrl')})
  `;
  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};
