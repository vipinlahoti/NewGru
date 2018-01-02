/*

Answers collection

*/

import schema from './schema.js';
import { createCollection, getDefaultResolvers, getDefaultMutations } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';

/**
 * @summary The global namespace for Answers.
 * @namespace Answers
 */
 export const Answers = createCollection({

   collectionName: 'Answers',

   typeName: 'Answer',

   schema,

   resolvers: getDefaultResolvers('Answers'),

   mutations: getDefaultMutations('Answers'),

});

Answers.checkAccess = (currentUser, answer) => {
  if (Users.isAdmin(currentUser) || Users.owns(currentUser, answer)) { // admins can always see everything, users can always see their own questions
    return true;
  } else if (answer.isDeleted) {
    return false;
  } else { 
    return true;
  }
}
