
// ------------------------------------------------------------------------------------------- //
// -------------------------------------- Submit Answer ------------------------------------- //
// ------------------------------------------------------------------------------------------- //

Answers.submit = function (answer) {

  var userId = answer.userId; // at this stage, a userId is expected

  // ------------------------------ Checks ------------------------------ //
  // Don't allow empty answers
  if (!answer.body)
    throw new Meteor.Error(704, 'Your answer is empty');

  // ------------------------------ Properties ------------------------------ //
  var defaultProperties = {
    createdAt: new Date(),
    postedAt: new Date(),
    upvotes: 0,
    downvotes: 0,
    baseScore: 0,
    score: 0,
    author: Users.getDisplayNameById(userId)
  };

  answer = _.extend(defaultProperties, answer);

  // ------------------------------ Callbacks ------------------------------ //
  // run all question submit server callbacks on answer object successively
  answer = Grudr.callbacks.run("answerSubmit", answer);

  // -------------------------------- Insert -------------------------------- //
  answer._id = Answers.insert(answer);

  // --------------------- Server-side Async Callbacks --------------------- //
  // run all question submit server callbacks on answer object successively
  // note: query for answer to get fresh document with collection-hooks effects applied
  Grudr.callbacks.runAsync("answerSubmitAsync", Answers.findOne(answer._id));

  return answer;
};

Answers.edit = function (answerId, modifier, answer) {

  // ------------------------------ Callbacks ------------------------------ //
  modifier = Grudr.callbacks.run("answerEdit", modifier, answer);

  // ------------------------------ Update ------------------------------ //
  Answers.update(answerId, modifier);

  // ------------------------------ Callbacks ------------------------------ //
  Grudr.callbacks.runAsync("answerEditAsync", Answers.findOne(answerId), answer);

  // ------------------------------ After Update ------------------------------ //
  return Answers.findOne(answerId);
};

// ------------------------------------------------------------------------------------------- //
// ----------------------------------------- Methods ----------------------------------------- //
// ------------------------------------------------------------------------------------------- //

Meteor.methods({
  submitAnswer: function(answer){

    // checking might be redundant because SimpleSchema already enforces the schema, but you never know
    check(answer, Answers.simpleSchema());

    // required properties:
    // questionId
    // body
    // optional properties:
    // parentAnswerId

    var user = Meteor.user(),
        hasAdminRights = Users.is.admin(user),
        schema = Answers.simpleSchema()._schema;

    // ------------------------------ Checks ------------------------------ //
    // check that user can answer
    if (!user || !Users.can.answer(user))
      throw new Meteor.Error('You need to login or be invited to question new answers.');

    // ------------------------------ Rate Limiting ------------------------------ //
    if (!hasAdminRights) {

      var timeSinceLastAnswer = Users.timeSinceLast(user, Answers),
          answerInterval = Math.abs(parseInt(Settings.get('answerInterval',15)));

      // check that user waits more than 15 seconds between answers
      if((timeSinceLastAnswer < answerInterval))
        throw new Meteor.Error(704, `Please wait, ${answerInterval - timeSinceLastAnswer} seconds before answering again`);

    }

    // ------------------------------ Properties ------------------------------ //

    // admin-only properties
    // userId

    // clear restricted properties
    _.keys(answer).forEach(function (fieldName) {

      // make an exception for questionId, which should be setable but not modifiable
      if (fieldName === "questionId") {
        // ok
      } else {
        var field = schema[fieldName];
        if (!Users.can.submitField(user, field)) {
          throw new Meteor.Error("disallowed_property", 'Disallowed property detected' + ": " + fieldName);
        }
      }

    });

    // if no userId has been set, default to current user id
    if (!answer.userId) {
      answer.userId = user._id;
    }

    return Answers.submit(answer);
  },

  editAnswer: function (modifier, answerId) {

    // checking might be redundant because SimpleSchema already enforces the schema, but you never know
    check(modifier, {$set: Answers.simpleSchema()});
    check(answerId, String);

    var user = Meteor.user(),
        answer = Answers.findOne(answerId),
        schema = Answers.simpleSchema()._schema;

    // ------------------------------ Checks ------------------------------ //
    // check that user can edit
    if (!user || !Users.can.edit(user, answer)) {
      throw new Meteor.Error(601, 'Sorry, you cannot edit this answer.');
    }

    // go over each field and throw an error if it's not editable
    // loop over each operation ($set, $unset, etc.)
    _.each(modifier, function (operation) {
      // loop over each property being operated on
      _.keys(operation).forEach(function (fieldName) {

        var field = schema[fieldName];
        if (!Users.can.editField(user, field, answer)) {
          throw new Meteor.Error("disallowed_property", 'Disallowed property detected' + ": " + fieldName);
        }

      });
    });

    Answers.edit(answerId, modifier, answer);
  },

  deleteAnswerById: function (answerId) {

    check(answerId, String);
    
    var answer = Answers.findOne(answerId);
    var user = Meteor.user();

    if(Users.can.edit(user, answer)){

      // decrement question answer count and remove user ID from question
      Questions.update(answer.questionId, {
        $inc:   {answerCount: -1},
        $pull:  {answerers: answer.userId}
      });

      // decrement user answer count and remove answer ID from user
      Meteor.users.update({_id: answer.userId}, {
        $inc:   {'grudr.answerCount': -1}
      });

      // note: should we also decrease user's answer karma ?
      // We don't actually delete the answer to avoid losing all child answers.
      // Instead, we give it a special flag
      Answers.update({_id: answerId}, {$set: {
        body: 'Deleted',
        htmlBody: 'Deleted',
        isDeleted: true
      }});

    } else{
      Bert.alert( 'You don\'t have permission to delete this answer.', 'danger', 'growl-top-right' );
    }
  }
});
