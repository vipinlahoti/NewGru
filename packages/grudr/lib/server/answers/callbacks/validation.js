import Users from 'meteor/vulcan:users';
import { addCallback, getSetting, registerSetting } from 'meteor/vulcan:core';
import { Answers } from '../../../modules/answers/index.js';

registerSetting('forum.answerInterval', 15, 'How long users should wait in between answers (in seconds)');

function AnswersNewRateLimit (answer, user) {
  if (!Users.isAdmin(user)) {
    const timeSinceLastAnswer = Users.timeSinceLast(user, Answers);
    const answerInterval = Math.abs(parseInt(getSetting('forum.answerInterval',15)));

    // check that user waits more than 15 seconds between answers
    if((timeSinceLastAnswer < answerInterval)) {
      throw new Error(Utils.encodeIntlError({id: 'answers.rate_limit_error', value: answerInterval-timeSinceLastAnswer}));
    }
  }
  return answer;
}
addCallback('answers.new.validate', AnswersNewRateLimit);
