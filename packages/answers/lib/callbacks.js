//////////////////////////////////////////////////////
// Collection Hooks                                 //
//////////////////////////////////////////////////////

Answers.before.insert(function (userId, doc) {
  // note: only actually sanitizes on the server
  doc.htmlBody = Grudr.utils.sanitize(marked(doc.body));
});

Answers.before.update(function (userId, doc, fieldNames, modifier) {
  // if body is being modified, update htmlBody too
  if (Meteor.isServer && modifier.$set && modifier.$set.body) {
    modifier.$set = modifier.$set || {};
    modifier.$set.htmlBody = Grudr.utils.sanitize(marked(modifier.$set.body));
  }
});

/**
 * Disallow $rename
 */
Answers.before.update(function (userId, doc, fieldNames, modifier) {
  if (!!modifier.$rename) {
    throw new Meteor.Error("illegal $rename operator detected!");
  }
});

//////////////////////////////////////////////////////
// Callbacks                                        //
//////////////////////////////////////////////////////

function afterAnswerOperations (answer) {

  var userId = answer.userId;

  // increment answer count
  Meteor.users.update({_id: userId}, {
    $inc:       {'grudr.answerCount': 1}
  });

  // update question
  Questions.update(answer.questionId, {
    $inc:       {answerCount: 1},
    $set:       {lastAnsweredAt: new Date()},
    $addToSet:  {answerers: userId}
  });

  return answer;
}
Grudr.callbacks.add("answerSubmitAsync", afterAnswerOperations);

function upvoteOwnAnswer (answer) {

  var answerAuthor = Meteor.users.findOne(answer.userId);

  // upvote answer
  Grudr.operateOnItem(Answers, answer._id, answerAuthor, "upvote");

  return answer;
}
Grudr.callbacks.add("answerSubmitAsync", upvoteOwnAnswer);
