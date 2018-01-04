import Users from 'meteor/vulcan:users';
import { addCallback, runCallbacksAsync, removeMutation } from 'meteor/vulcan:core';

import { Questions } from '../../../modules/questions/index.js';
import { Answers } from '../../../modules/answers/index.js';

//////////////////////////////////////////////////////
// answers.new.sync                                //
//////////////////////////////////////////////////////

function AnswersNewOperations (answer) {

  var userId = answer.userId;

  // increment answer count
  Users.update({_id: userId}, {
    $inc:       {'answerCount': 1}
  });

  // update question
  Questions.update(answer.questionId, {
    $inc:       {answerCount: 1},
    $set:       {lastAnsweredAt: new Date()},
    $addToSet:  {answerers: userId}
  });

  return answer;
}
addCallback('answers.new.sync', AnswersNewOperations);

//////////////////////////////////////////////////////
// answers.new.async                               //
//////////////////////////////////////////////////////


/**
 * @summary Run the 'upvote.async' callbacks *once* the item exists in the database
 * @param {object} item - The item being operated on
 * @param {object} user - The user doing the operation
 * @param {object} collection - The collection the item belongs to
 */
function UpvoteAsyncCallbacksAfterDocumentInsert(item, user, collection) {
  runCallbacksAsync('upvote.async', item, user, collection, 'upvote');
}

addCallback('answers.new.async', UpvoteAsyncCallbacksAfterDocumentInsert);

//////////////////////////////////////////////////////
// answers.remove.async                            //
//////////////////////////////////////////////////////

function AnswersRemoveQuestionAnswerers (answer, currentUser) {
  const { userId, questionId } = answer;

  // dec user's answer count
  Users.update({_id: userId}, {
    $inc: {'answerCount': -1}
  });

  const questionAnswers = Answers.find({questionId}, {sort: {postedAt: -1}}).fetch();

  const answerers = _.uniq(questionAnswers.map(answer => answer.userId));
  const lastAnsweredAt = questionAnswers[0] && questionAnswers[0].postedAt;

  // update question with a decremented answer count, a unique list of answerers and corresponding last answered at date 
  Questions.update(questionId, {
    $inc: {answerCount: -1},
    $set: {lastAnsweredAt, answerers},
  });

  return answer;
}

addCallback('answers.remove.async', AnswersRemoveQuestionAnswerers);

function AnswersRemoveChildrenAnswers (answer, currentUser) {

  const childrenAnswers = Answers.find({parentAnswerId: answer._id}).fetch();

  childrenAnswers.forEach(childAnswer => {
    removeMutation({
      action: 'answers.remove',
      collection: Answers,
      documentId: childAnswer._id, 
      currentUser: currentUser,
      validate: false
    });
  });

  return answer;
}

addCallback('answers.remove.async', AnswersRemoveChildrenAnswers);

//////////////////////////////////////////////////////
// other                                            //
//////////////////////////////////////////////////////

function UsersRemoveDeleteAnswers (user, options) {
  if (options.deleteAnswers) {
    Answers.remove({userId: user._id});
  } else {
    // not sure if anything should be done in that scenario yet
    // Answers.update({userId: userId}, {$set: {author: '\[deleted\]'}}, {multi: true});
  }
}
addCallback('users.remove.async', UsersRemoveDeleteAnswers);
