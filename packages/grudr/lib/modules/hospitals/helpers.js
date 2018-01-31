/*
 * Hospitals helpers
 */

import { Hospitals } from './collection.js';
import Users from 'meteor/vulcan:users';
import { Utils, getSetting, registerSetting } from 'meteor/vulcan:core';

registerSetting('twitterAccount', null, 'Twitter account associated with the app');
registerSetting('siteUrl', null, 'Main site URL');

/**
 * @summary Get URL of a hospital page.
 * @param {Object} hospital
 */
Hospitals.getPageUrl = function(hospital, isAbsolute = false){
  const prefix = isAbsolute ? Utils.getSiteUrl().slice(0,-1) : '';
  return `${prefix}/hospitals/${hospital._id}/${hospital.slug}`;
};

/**
 * @summary Get a hospital author's name
 * @param {Object} hospital
 */
Hospitals.getAuthorName = function (hospital) {
  var user = Users.findOne(hospital.userId);
  if (user) {
    return Users.getDisplayName(user);
  } else {
    return hospital.author;
  }
};

/**
 * @summary Get the complete thumbnail url whether it is hosted on Cloudinary or on an external website, or locally in the app.
 * @param {Object} hospital
 */
Hospitals.getThumbnailUrl = (hospital) => {
  const thumbnailUrl = hospital.thumbnailUrl;
  if (!!thumbnailUrl) {
    return thumbnailUrl.indexOf('//') > -1 ? Utils.addHttp(thumbnailUrl) : Utils.getSiteUrl().slice(0,-1) + thumbnailUrl;
  }
};

/**
 * @summary Get URL for sharing on Twitter.
 * @param {Object} hospital
 */
Hospitals.getTwitterShareUrl = hospital => {
  const via = getSetting('twitterAccount', null) ? `&via=${getSetting('twitterAccount')}` : '';
  return `https://twitter.com/intent/tweet?text=${ encodeURIComponent(hospital.title) }%20${ encodeURIComponent(Hospitals.getLink(hospital, true)) }${via}`;
};

/**
 * @summary Get URL for sharing on Facebook.
 * @param {Object} hospital
 */
Hospitals.getFacebookShareUrl = hospital => {
  return `https://www.facebook.com/sharer/sharer.php?u=${ encodeURIComponent(Hospitals.getLink(hospital, true)) }`;
};

/**
 * @summary Get URL for sharing by Email.
 * @param {Object} hospital
 */
Hospitals.getEmailShareUrl = hospital => {
  const subject = `Interesting link: ${hospital.title}`;
  const body = `I thought you might find this interesting:

${hospital.title}
${Hospitals.getLink(hospital, true, false)}

(found via ${getSetting('siteUrl')})
  `;
  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};
