/*
 * Reviews collection
 */

import schema from './schema.js';
import { createCollection, getDefaultResolvers, getDefaultMutations } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';

/**
 * @summary The global namespace for Reviews.
 * @namespace Reviews
 */
 export const Reviews = createCollection({
   collectionName: 'Reviews',
   typeName: 'Review',
   schema,
   resolvers: getDefaultResolvers('Reviews'),
   mutations: getDefaultMutations('Reviews')
});

Reviews.checkAccess = (currentUser, review) => {
  if (Users.isAdmin(currentUser) || Users.owns(currentUser, review)) { // admins can always see everything, users can always see their own hospitals
    return true;
  } else if (review.isDeleted) {
    return false;
  } else { 
    return true;
  }
}
