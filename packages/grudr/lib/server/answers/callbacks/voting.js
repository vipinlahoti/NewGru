import Users from 'meteor/vulcan:users';
import { addCallback } from 'meteor/vulcan:core';
import { Answers } from '../../../modules/answers/index.js';

import { performVoteServer } from 'meteor/vulcan:voting';

/**
 * @summary Make users upvote their own new answers
 */
function AnswersNewUpvoteOwnAnswer(answer) {
  var answerAuthor = Users.findOne(answer.userId);
  const votedComent = performVoteServer({ document: answer, voteType: 'upvote', collection: Answers, user: answerAuthor })
  return {...answer, ...votedComent};
}

addCallback('answers.new.after', AnswersNewUpvoteOwnAnswer);
