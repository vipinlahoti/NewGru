/*

Questions helpers

*/

import moment from 'moment';
import { Questions } from './collection.js';
import Users from 'meteor/vulcan:users';
import { Utils, getSetting, registerSetting } from 'meteor/vulcan:core';

registerSetting('forum.requireQuestionsApproval', false, 'Require questions to be approved manually');
registerSetting('siteUrl', null, 'Main site URL');

//////////////////
// Link Helpers //
//////////////////

/**
 * @summary Get URL of a question page.
 * @param {Object} question
 */
Questions.getPageUrl = function(question, isAbsolute = false){
  const prefix = isAbsolute ? Utils.getSiteUrl().slice(0,-1) : '';
  return `${prefix}/questions/${question._id}/${question.slug}`;
};


/**
 * @summary Get URL of a edit question page.
 * @param {Object} question
 */
Questions.getEditPageUrl = function(question, isAbsolute = false){
  const prefix = isAbsolute ? Utils.getSiteUrl().slice(0,-1) : '';
  return `${prefix}/questions/${question._id}/${question.slug}/edit`;
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
