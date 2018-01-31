/*
 * Reviews helpers
 */

import { Reviews } from './index.js';
import { Hospitals } from '../hospitals/index.js';
import Users from 'meteor/vulcan:users';

/**
 * @summary Get URL of a review page.
 * @param {Object} review
 */
Reviews.getPageUrl = function(review, isAbsolute = false){
  const hospital = Hospitals.findOne(review.hospitalId);
  return `${Hospitals.getPageUrl(hospital, isAbsolute)}/#${review._id}`;
};

/**
 * @summary Get a review author's name
 * @param {Object} review
 */
Reviews.getAuthorName = function (review) {
  var user = Users.findOne(review.userId);
  return user ? Users.getDisplayName(user) : review.author;
};
