/*

Question validation and rate limiting callbacks

*/

import { Questions } from '../../../modules/questions/index.js'
import Users from 'meteor/vulcan:users';
import { addCallback, getSetting, registerSetting } from 'meteor/vulcan:core';
import { createError } from 'apollo-errors';

registerSetting('forum.questionInterval', 30, 'How long users should wait between each questions, in seconds');
registerSetting('forum.maxQuestionsPerDay', 5, 'Maximum number of questions a user can create in a day');

/**
 * @summary Rate limiting
 */
function QuestionsNewRateLimit (question, user) {

  if(!Users.isAdmin(user)){

    var timeSinceLastQuestion = Users.timeSinceLast(user, Questions),
      numberOfQuestionsInPast24Hours = Users.numberOfItemsInPast24Hours(user, Questions),
      questionInterval = Math.abs(parseInt(getSetting('forum.questionInterval', 30))),
      maxQuestionsPer24Hours = Math.abs(parseInt(getSetting('forum.maxQuestionsPerDay', 5)));

    // check that user waits more than X seconds between questions
    if(timeSinceLastQuestion < questionInterval){
      const RateLimitError = createError('questions.rate_limit_error', {message: 'questions.rate_limit_error'});
      throw new RateLimitError({data: {break: true, value: questionInterval-timeSinceLastQuestion}});
    }
    // check that the user doesn't question more than Y questions per day
    if(numberOfQuestionsInPast24Hours >= maxQuestionsPer24Hours){
      const RateLimitError = createError('questions.max_per_day', {message: 'questions.max_per_day'});
      throw new RateLimitError({data: {break: true, value: maxQuestionsPer24Hours}});
    }
  }

  return question;
}
addCallback('questions.new.validate', QuestionsNewRateLimit);

/**
 * @summary Check for duplicate links
 */
function QuestionsNewDuplicateLinksCheck (question, user) {
  if(!!question.url && Questions.checkForSameUrl(question.url)) {
    const DuplicateError = createError('questions.link_already_questioned', {message: 'questions.link_already_questioned'});
    throw new DuplicateError({data: {break: true, url: question.url}});
  }
  return question;
}
addCallback('questions.new.sync', QuestionsNewDuplicateLinksCheck);


/**
 * @summary Check for duplicate links
 */
function QuestionsEditDuplicateLinksCheck (modifier, question) {
  if(question.url !== modifier.$set.url && !!modifier.$set.url) {
    Questions.checkForSameUrl(modifier.$set.url);
  }
  return modifier;
}
addCallback('questions.edit.sync', QuestionsEditDuplicateLinksCheck);
