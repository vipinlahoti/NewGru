/*

Posts helpers

*/

import moment from 'moment';
import { Posts } from './collection.js';
import Users from 'meteor/vulcan:users';
import { Utils, getSetting, registerSetting } from 'meteor/vulcan:core';

registerSetting('forum.outsideLinksPointTo', 'link', 'Whether to point RSS links to the linked URL (“link”) or back to the post page (“page”)');
registerSetting('forum.requirePostsApproval', false, 'Require posts to be approved manually');
registerSetting('twitterAccount', null, 'Twitter account associated with the app');
registerSetting('siteUrl', null, 'Main site URL');

/**
 * @summary Get URL of a post page.
 * @param {Object} post
 */
Posts.getPageUrl = function(post, isAbsolute = false){
  const prefix = isAbsolute ? Utils.getSiteUrl().slice(0,-1) : '';
  return `${prefix}/posts/${post._id}/${post.slug}`;
};

///////////////////
// Other Helpers //
///////////////////

/**
 * @summary Get a post author's name
 * @param {Object} post
 */
Posts.getAuthorName = function (post) {
  var user = Users.findOne(post.userId);
  if (user) {
    return Users.getDisplayName(user);
  } else {
    return post.author;
  }
};

/**
 * @summary Get default status for new posts.
 * @param {Object} user
 */
Posts.getDefaultStatus = function (user) {
  const canPostApproved = typeof user === 'undefined' ? false : Users.canDo(user, 'posts.new.approved');
  if (!getSetting('forum.requirePostsApproval', false) || canPostApproved) {
    // if user can post straight to 'approved', or else post approval is not required
    return Posts.config.STATUS_APPROVED;
  } else {
    return Posts.config.STATUS_PENDING;
  }
};

/**
 * @summary Get status name
 * @param {Object} user
 */
Posts.getStatusName = function (post) {
  return Utils.findWhere(Posts.statuses, {value: post.status}).label;
};

/**
 * @summary Check if a post is approved
 * @param {Object} post
 */
Posts.isApproved = function (post) {
  return post.status === Posts.config.STATUS_APPROVED;
};

/**
 * @summary Check if a post is pending
 * @param {Object} post
 */
Posts.isPending = function (post) {
  return post.status === Posts.config.STATUS_PENDING;
};

/**
 * @summary When on a post page, return the current post
 */
Posts.current = function () {
  return Posts.findOne('foo');
};

/**
 * @summary Check to see if a post is a link to a video
 * @param {Object} post
 */
Posts.isVideo = function (post) {
  return post.media && post.media.type === 'video';
};

/**
 * @summary Get the complete thumbnail url whether it is hosted on Cloudinary or on an external website, or locally in the app.
 * @param {Object} post
 */
Posts.getThumbnailUrl = (post) => {
  const thumbnailUrl = post.thumbnailUrl;
  if (!!thumbnailUrl) {
    return thumbnailUrl.indexOf('//') > -1 ? Utils.addHttp(thumbnailUrl) : Utils.getSiteUrl().slice(0,-1) + thumbnailUrl;
  }
};

/**
 * @summary Get URL for sharing on Twitter.
 * @param {Object} post
 */
Posts.getTwitterShareUrl = post => {
  const via = getSetting('twitterAccount', null) ? `&via=${getSetting('twitterAccount')}` : '';
  return `https://twitter.com/intent/tweet?text=${ encodeURIComponent(post.title) }%20${ encodeURIComponent(Posts.getLink(post, true)) }${via}`;
};

/**
 * @summary Get URL for sharing on Facebook.
 * @param {Object} post
 */
Posts.getFacebookShareUrl = post => {
  return `https://www.facebook.com/sharer/sharer.php?u=${ encodeURIComponent(Posts.getLink(post, true)) }`;
};

/**
 * @summary Get URL for sharing by Email.
 * @param {Object} post
 */
Posts.getEmailShareUrl = post => {
  const subject = `Interesting link: ${post.title}`;
  const body = `I thought you might find this interesting:

${post.title}
${Posts.getLink(post, true, false)}

(found via ${getSetting('siteUrl')})
  `;
  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};
