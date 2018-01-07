Questions._ensureIndex({"status": 1, "postedAt": 1});

// Publish a list of questions

Meteor.publish('questionsList', function(terms) {

  this.unblock();
  
  if (this.userId) { // add currentUserId to terms if a user is logged in
    terms.currentUserId = this.userId; 
  }

  if(Users.can.viewById(this.userId)){
    var parameters = Questions.parameters.get(terms),
        questions = Questions.find(parameters.find, parameters.options);

    return questions;
  }
  return [];
});

// Publish all the users that have posted the currently displayed list of questions
// plus the answerers for each question

Meteor.publish('questionsListUsers', function(terms) {
  
  this.unblock();
  
  if (this.userId) {
    terms.currentUserId = this.userId; // add userId to terms
  }

  if(Users.can.viewById(this.userId)){
    var parameters = Questions.parameters.get(terms),
        questions = Questions.find(parameters.find, parameters.options),
        userIds = _.pluck(questions.fetch(), 'userId');

    // for each question, add first four answerer's userIds to userIds array
    questions.forEach(function (question) {
      userIds = userIds.concat(_.first(question.answerers,4));
    });

    userIds = _.unique(userIds);

    return Meteor.users.find({_id: {$in: userIds}}, {fields: Users.pubsub.avatarProperties, multi: true});
  }
  return [];
});

// Publish a single question

Meteor.publish('singleQuestion', function(questionId) {

  check(questionId, String);
  this.unblock();

  var user = Meteor.users.findOne(this.userId);
  var question = Questions.findOne(questionId);

  if (Users.can.viewQuestion(user, question)){
    return Questions.find(questionId);
  } else {
    return [];
  }

});

// Publish author of the current question, authors of its answers of the question

Meteor.publish('questionUsers', function(questionId) {

  check(questionId, String);
  this.unblock();

  if (Users.can.viewById(this.userId)){
    // publish question author and question answerers
    var question = Questions.findOne(questionId);
    var users = [];

    if (question) {

      users.push(question.userId); // publish question author's ID

      // get IDs from all answerers on the question
      var answers = Answers.find({questionId: question._id}).fetch();
      if (answers.length) {
        users = users.concat(_.pluck(answers, "userId"));
      }

    }

    // remove any duplicate IDs
    users = _.unique(users);

    return Meteor.users.find({_id: {$in: users}}, {fields: Users.pubsub.publicProperties});
  }
  return [];
});
