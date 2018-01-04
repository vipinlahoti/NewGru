/*

Questions collection

*/

import schema from './schema.js';
import { createCollection, getDefaultResolvers, getDefaultMutations } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';

/**
 * @summary The global namespace for Questions.
 * @namespace Questions
 */
export const Questions = createCollection({

  collectionName: 'Questions',

  typeName: 'Question',

  schema,

  resolvers: getDefaultResolvers('Questions'),

  mutations: getDefaultMutations('Questions'),

});

// refactor: moved here from schema.js
Questions.config = {};

Questions.config.STATUS_PENDING = 1;
Questions.config.STATUS_APPROVED = 2;
Questions.config.STATUS_REJECTED = 3;
Questions.config.STATUS_SPAM = 4;
Questions.config.STATUS_DELETED = 5;


/**
 * @summary Questions statuses
 * @type {Object}
 */
Questions.statuses = [
  {
    value: 1,
    label: 'pending'
  },
  {
    value: 2,
    label: 'approved'
  },
  {
    value: 3,
    label: 'rejected'
  },
  {
    value: 4,
    label: 'spam'
  },
  {
    value: 5,
    label: 'deleted'
  }
];

Questions.checkAccess = (currentUser, question) => {
  if (Users.isAdmin(currentUser) || Users.owns(currentUser, question)) { // admins can always see everything, users can always see their own questions
    return true;
  } else if (question.isFuture) {
    return false;
  } else { 
    const status = _.findWhere(Questions.statuses, {value: question.status});
    return Users.canDo(currentUser, `questions.view.${status.label}`);
  }
}
