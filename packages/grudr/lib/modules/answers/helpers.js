/*

Answers helpers

*/

import { Answers } from './index.js';
import { Questions } from '../questions/index.js';
import Users from 'meteor/vulcan:users';

//////////////////
// Link Helpers //
//////////////////

/**
 * @summary Get URL of a answer page.
 * @param {Object} answer
 */
Answers.getPageUrl = function(answer, isAbsolute = false){
  const question = Questions.findOne(answer.questionId);
  return `${Questions.getPageUrl(question, isAbsolute)}/#${answer._id}`;
};

///////////////////
// Other Helpers //
///////////////////

/**
 * @summary Get a answer author's name
 * @param {Object} answer
 */
Answers.getAuthorName = function (answer) {
  var user = Users.findOne(answer.userId);
  return user ? Users.getDisplayName(user) : answer.author;
};
