/*

Callbacks to:

- Increment a user's question count
- Run question approved callbacks
- Update a user's question count
- Remove a user's questions when it's deleted
- Track clicks

*/

import { Questions } from '../../../modules/questions/index.js'
import Users from 'meteor/vulcan:users';
import { addCallback, getSetting, registerSetting, runCallbacks, runCallbacksAsync } from 'meteor/vulcan:core';
import Events from 'meteor/vulcan:events';

registerSetting('forum.trackClickEvents', true, 'Track clicks to questions pages');

/**
 * @summary Increment the user's question count
 */
function QuestionsNewIncrementQuestionCount (question) {
  var userId = question.userId;
  Users.update({_id: userId}, {$inc: {'questionCount': 1}});
}
addCallback('questions.new.async', QuestionsNewIncrementQuestionCount);

//////////////////////////////////////////////////////
// questions.edit.sync                                  //
//////////////////////////////////////////////////////

function QuestionsEditRunQuestionApprovedSyncCallbacks (modifier, question) {
  if (modifier.$set && Questions.isApproved(modifier.$set) && !Questions.isApproved(question)) {
    modifier = runCallbacks('questions.approve.sync', modifier, question);
  }
  return modifier;
}
addCallback('questions.edit.sync', QuestionsEditRunQuestionApprovedSyncCallbacks);

//////////////////////////////////////////////////////
// questions.edit.async                                 //
//////////////////////////////////////////////////////

function QuestionsEditRunQuestionApprovedAsyncCallbacks (question, oldQuestion) {
  if (Questions.isApproved(question) && !Questions.isApproved(oldQuestion)) {
    runCallbacksAsync('questions.approve.async', question);
  }
}
addCallback('questions.edit.async', QuestionsEditRunQuestionApprovedAsyncCallbacks);

//////////////////////////////////////////////////////
// questions.remove.sync                                //
//////////////////////////////////////////////////////

function QuestionsRemoveOperations (question) {
  Users.update({_id: question.userId}, {$inc: {'questionCount': -1}});
  return question;
}
addCallback('questions.remove.sync', QuestionsRemoveOperations);

//////////////////////////////////////////////////////
// users.remove.async                               //
//////////////////////////////////////////////////////

function UsersRemoveDeleteQuestions (user, options) {
  if (options.deleteQuestions) {
    Questions.remove({userId: user._id});
  } else {
    // not sure if anything should be done in that scenario yet
    // Questions.update({userId: userId}, {$set: {author: '\[deleted\]'}}, {multi: true});
  }
}
addCallback('users.remove.async', UsersRemoveDeleteQuestions);

//////////////////////////////////////////////////////
// questions.click.async                                //
//////////////////////////////////////////////////////

// /**
//  * @summary Increase the number of clicks on a question
//  * @param {string} questionId – the ID of the question being edited
//  * @param {string} ip – the IP of the current user
//  */
Questions.increaseClicks = (question, ip) => {
  const clickEvent = {
    name: 'click',
    properties: {
      questionId: question._id,
      ip: ip
    }
  };

  if (getSetting('forum.trackClickEvents', true)) {
    // make sure this IP hasn't previously clicked on this question
    const existingClickEvent = Events.findOne({name: 'click', 'properties.questionId': question._id, 'properties.ip': ip});

    if(!existingClickEvent) {
      // Events.log(clickEvent); // Sidebar only: don't log event
      return Questions.update(question._id, { $inc: { clickCount: 1 }});
    }
  } else {
    return Questions.update(question._id, { $inc: { clickCount: 1 }});
  }
};

function QuestionsClickTracking(question, ip) {
  return Questions.increaseClicks(question, ip);
}

// track links clicked, locally in Events collection
// note: this event is not sent to segment cause we cannot access the current user 
// in our server-side route /out -> sending an event would create a new anonymous 
// user: the free limit of 1,000 unique users per month would be reached quickly
addCallback('questions.click.async', QuestionsClickTracking);

//////////////////////////////////////////////////////
// questions.approve.sync                              //
//////////////////////////////////////////////////////

function QuestionsApprovedSetPostedAt (modifier, question) {
  modifier.postedAt = new Date();
  return modifier;
}
addCallback('questions.approve.sync', QuestionsApprovedSetPostedAt);
