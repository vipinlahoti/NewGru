/*

Answers views

*/

import { Answers } from './index.js';

Answers.addView('questionAnswers', function (terms) {
  return {
    selector: {questionId: terms.questionId},
    options: {sort: {postedAt: -1}}
  };
});

Answers.addView('userAnswers', function (terms) {
  return {
    selector: {userId: terms.userId},
    options: {sort: {postedAt: -1}}
  };
});
