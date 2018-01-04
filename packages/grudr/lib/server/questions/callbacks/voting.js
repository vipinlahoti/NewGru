/*

Voting callbacks

*/

import { Questions } from '../../../modules/questions/index.js';
import Users from 'meteor/vulcan:users';
import { addCallback } from 'meteor/vulcan:core';
import { performVoteServer } from 'meteor/vulcan:voting';

/**
 * @summary Make users upvote their own new questions
 */
function QuestionsNewUpvoteOwnQuestion(question) {
  var questionAuthor = Users.findOne(question.userId);
  return {...question, ...performVoteServer({ document: question, voteType: 'upvote', collection: Questions, user: questionAuthor })};
}

addCallback('questions.new.after', QuestionsNewUpvoteOwnQuestion);
