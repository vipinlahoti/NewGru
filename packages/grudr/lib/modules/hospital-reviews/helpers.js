/*

HosReviews helpers

*/

import { HosReviews } from './index.js';
import { Hospitals } from '../hospitals/index.js';
import Users from 'meteor/vulcan:users';

//////////////////
// Link Helpers //
//////////////////

/**
 * @summary Get URL of a hosReview page.
 * @param {Object} hosReview
 */
HosReviews.getPageUrl = function(hosReview, isAbsolute = false){
  const hospital = Hospitals.findOne(hosReview.hospitalId);
  return `${Hospitals.getPageUrl(hospital, isAbsolute)}/#${hosReview._id}`;
};

///////////////////
// Other Helpers //
///////////////////

/**
 * @summary Get a hosReview author's name
 * @param {Object} hosReview
 */
HosReviews.getAuthorName = function (hosReview) {
  var user = Users.findOne(hosReview.userId);
  return user ? Users.getDisplayName(user) : hosReview.author;
};
