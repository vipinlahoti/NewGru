/*

HosReviews collection

*/

import schema from './schema.js';
import { createCollection, getDefaultResolvers, getDefaultMutations } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';

/**
 * @summary The global namespace for HosReviews.
 * @namespace HosReviews
 */
 export const HosReviews = createCollection({

   collectionName: 'HosReviews',

   typeName: 'HosReview',

   schema,

   resolvers: getDefaultResolvers('HosReviews'),

   mutations: getDefaultMutations('HosReviews'),

});

HosReviews.checkAccess = (currentUser, hosReview) => {
  if (Users.isAdmin(currentUser) || Users.owns(currentUser, hosReview)) { // admins can always see everything, users can always see their own hospitals
    return true;
  } else if (hosReview.isDeleted) {
    return false;
  } else { 
    return true;
  }
}
