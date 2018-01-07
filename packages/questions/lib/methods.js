/**
 *
 * Question Methods
 *
 */

/**
 * Insert a question in the database (note: optional question properties not listed here)
 * @param {Object} question - the question being inserted
 * @param {string} question.userId - the id of the user the question belongs to
 * @param {string} question.body - the question's body
 */
Questions.submit = function (question) {

  var userId = question.userId, // at this stage, a userId is expected
      user = Users.findOne(userId);

  // ------------------------------ Checks ------------------------------ //
  // check that a question is asked
  if(!question.body)
    throw new Meteor.Error(602, 'Please fill in a question');

  // ------------------------------ Properties ------------------------------ //
  var defaultProperties = {
    createdAt: new Date(),
    author: Users.getDisplayNameById(userId),
    answerCount: 0,
    clickCount: 0,
    viewCount: 0,
    baseScore: 0,
    score: 0,
    inactive: false,
    sticky: false,
    status: Questions.getDefaultStatus()
  };

  question = _.extend(defaultProperties, question);

  // if question is approved but doesn't have a postedAt date, give it a default date
  // note: pending questions get their postedAt date only once theyre approved
  if (question.status === Questions.config.STATUS_APPROVED && !question.postedAt)
    question.postedAt = new Date();

  // clean up question body
  question.body = Grudr.utils.cleanUp(question.body);

  // generate slug
  question.slug = Grudr.utils.slugify(question.body);

  // ------------------------------ Callbacks ------------------------------ //
  // run all question submit server callbacks on question object successively
  question = Grudr.callbacks.run("questionSubmit", question);

  // -------------------------------- Insert ------------------------------- //
  question._id = Questions.insert(question);

  // --------------------- Server-Side Async Callbacks --------------------- //
  // note: query for question to get fresh document with collection-hooks effects applied
  Grudr.callbacks.runAsync("questionSubmitAsync", Questions.findOne(question._id));

  return question;
};

/**
 * Edit a question in the database
 * @param {string} questionId – the ID of the question being edited
 * @param {Object} modifier – the modifier object
 * @param {Object} question - the current question object
 */
Questions.edit = function (questionId, modifier, question) {

  if (typeof question === "undefined") {
    question = Questions.findOne(questionId);
  }

  // ------------------------------ Callbacks ------------------------------ //
  modifier = Grudr.callbacks.run("questionEdit", modifier, question);

  // ------------------------------ Update ------------------------------ //
  Questions.update(questionId, modifier);

  // ------------------------------ Callbacks ------------------------------ //
  Grudr.callbacks.runAsync("questionEditAsync", Questions.findOne(questionId), question);

  // ------------------------------ After Update ------------------------------ //
  return Questions.findOne(questionId);
};

// ------------------------------------------------------------------------------------------- //
// ----------------------------------------- Methods ----------------------------------------- //
// ------------------------------------------------------------------------------------------- //

var questionViews = [];

Meteor.methods({

  /**
   * Meteor method for submitting a question from the client
   * @memberof Questions
   * @param {Object} question - the question being inserted
   */
  submitQuestion: function(question){

    check(question, Questions.simpleSchema());

    // required properties:
    // body

    // optional properties
    // body
    // categories
    // thumbnailUrl

    // NOTE: the current user and the question author user might be two different users!
    var user = Meteor.user(),
        hasAdminRights = Users.is.admin(user),
        schema = Questions.simpleSchema()._schema;

    // ------------------------------ Checks ------------------------------ //
    // check that user can question
    if (!user || !Users.can.question(user))
      throw new Meteor.Error(601, 'You need to login or be invited to question new stories');

    // --------------------------- Rate Limiting -------------------------- //
    if(!hasAdminRights){

      var timeSinceLastQuestion = Users.timeSinceLast(user, Questions),
        numberOfQuestionsInPast24Hours = Users.numberOfItemsInPast24Hours(user, Questions),
        questionInterval = Math.abs(parseInt(Settings.get('questionInterval', 30))),
        maxQuestionsPer24Hours = Math.abs(parseInt(Settings.get('maxQuestionsPerDay', 30)));

      // check that user waits more than X seconds between questions
      if(timeSinceLastQuestion < questionInterval)
        throw new Meteor.Error(604, 'Please wait' + (questionInterval-timeSinceLastQuestion) + 'Seconds before questioning again');

      // check that the user doesn't question more than Y questions per day
      if(numberOfQuestionsInPast24Hours > maxQuestionsPer24Hours)
        throw new Meteor.Error(605, 'Sorry you cannot submit more than ' + maxQuestionsPer24Hours + 'Questions per day');

    }

    // ------------------------------ Properties ------------------------------ //
    // admin-only properties
    // status
    // postedAt
    // userId
    // sticky (default to false)
    // go over each schema field and throw an error if it's not editable
    _.keys(question).forEach(function (fieldName) {

      var field = schema[fieldName];
      if (!Users.can.submitField(user, field)) {
        throw new Meteor.Error("disallowed_property", 'Disallowed property detected' + ": " + fieldName);
      }

    });

    // if no question status has been set, set it now
    if (!question.status) {
      question.status = Questions.getDefaultStatus(user);
    }

    // if no userId has been set, default to current user id
    if (!question.userId) {
      question.userId = user._id;
    }

    if (Meteor.isServer && this.connection) {
      question.userIP = this.connection.clientAddress;
      question.userAgent = this.connection.httpHeaders["user-agent"];
    }

    return Questions.submit(question);
  },

  /**
   * Meteor method for editing a question from the client
   * @memberof Questions
   * @param {Object} modifier - the update modifier
   * @param {Object} questionId - the id of the question being updated
   */
  editQuestion: function (modifier, questionId) {

    // checking might be redundant because SimpleSchema already enforces the schema, but you never know
    check(modifier, Match.OneOf({$set: Questions.simpleSchema()}, {$unset: Object}, {$set: Questions.simpleSchema(), $unset: Object}));
    check(questionId, String);

    var user = Meteor.user(),
        question = Questions.findOne(questionId),
        schema = Questions.simpleSchema()._schema;

    // ------------------------------ Checks ------------------------------ //
    // check that user can edit document
    if (!user || !Users.can.edit(user, question)) {
      throw new Meteor.Error(601, 'Sorry you cannot edit this question');
    }

    // go over each field and throw an error if it's not editable
    // loop over each operation ($set, $unset, etc.)
    _.each(modifier, function (operation) {
      // loop over each property being operated on
      _.keys(operation).forEach(function (fieldName) {

        var field = schema[fieldName];
        if (!Users.can.editField(user, field, question)) {
          throw new Meteor.Error("disallowed_property", 'Disallowed property detected' + ": " + fieldName);
        }

      });
    });

    return Questions.edit(questionId, modifier, question);

  },

  approveQuestion: function(questionId){

    check(questionId, String);
    
    var question = Questions.findOne(questionId);
    var now = new Date();

    if(Users.is.admin(Meteor.user())){

      var set = {status: Questions.config.STATUS_APPROVED};

      if (!question.postedAt) {
        set.postedAt = now;
      }
      
      Questions.update(question._id, {$set: set});
      Grudr.callbacks.runAsync("questionApproveAsync", question);

    }else{
      Bert.alert( 'You need to be an admin to do that.', 'danger', 'growl-top-right' );
    }
  },

  rejectQuestion: function(questionId){

    check(questionId, String);
    var question = Questions.findOne(questionId);
    
    if(Users.is.admin(Meteor.user())){
      Questions.update(question._id, {$set: {status: Questions.config.STATUS_REJECTED}});
      Grudr.callbacks.runAsync("questionRejectAsync", question);
    }else{
      Bert.alert( 'You need to be an admin to do that.', 'danger', 'growl-top-right' );
    }
  },

  increaseQuestionViews: function(questionId, sessionId){

    check(questionId, String);
    check(sessionId, Match.Any);

    this.unblock();

    // only let users increment a question's view counter once per session
    var view = {_id: questionId, userId: this.userId, sessionId: sessionId};

    if(_.where(questionViews, view).length === 0){
      questionViews.push(view);
      Questions.update(questionId, { $inc: { viewCount: 1 }});
    }
  },

  deleteQuestionById: function(questionId) {

    check(questionId, String);
    
    var question = Questions.findOne({_id: questionId});

    if(!Meteor.userId() || !Users.can.editById(Meteor.userId(), question)) throw new Meteor.Error(606, 'You need permission to edit or delete a question');

    // decrement question count
    Users.update({_id: question.userId}, {$inc: {"grudr.questionCount": -1}});

    // delete question
    Questions.remove(questionId);
    Grudr.callbacks.runAsync("questionDeleteAsync", question);

  }

});
