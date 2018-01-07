Answers._ensureIndex({questionId: 1});
Answers._ensureIndex({parentAnswerId: 1});

// Publish a list of answers

Meteor.publish('answersList', function(terms) {
  
  this.unblock();

  if (this.userId) { // add currentUserId to terms if a user is logged in
    terms.currentUserId = this.userId; 
  }
  
  if(Users.can.viewById(this.userId)){
    var parameters = Answers.parameters.get(terms);
    var answers = Answers.find(parameters.find, parameters.options);
  
    // if there are answers, find out which questions were answered on
    var answeredQuestionIds = answers.count() ? _.pluck(answers.fetch(), 'questionId') : [];
    return [
      answers,
      Questions.find({_id: {$in: answeredQuestionIds}})
    ];
  }
});

// Publish a single answer

Meteor.publish('singleAnswerAndChildren', function(answerId) {

  check(answerId, String);

  this.unblock();
  
  if(Users.can.viewById(this.userId)){
    // publish both current answer and child answers
    var answerIds = [answerId];
    var childAnswerIds = _.pluck(Answers.find({parentAnswerId: answerId}, {fields: {_id: 1}}).fetch(), '_id');
    answerIds = answerIds.concat(childAnswerIds);
    return Answers.find({_id: {$in: answerIds}}, {sort: {score: -1, postedAt: -1}});
  }
  return [];
});

// Publish the question related to the current answer

Meteor.publish('answerQuestion', function(answerId) {

  check(answerId, String);

  this.unblock();

  if(Users.can.viewById(this.userId)){
    var answer = Answers.findOne(answerId);
    return Questions.find({_id: answer && answer.questionId});
  }
  return [];
});

// Publish author of the current answer, and author of the question related to the current answer

Meteor.publish('answerUsers', function(answerId) {

  check(answerId, String);

  this.unblock();
    
  var userIds = [];

  if(Users.can.viewById(this.userId)){

    var answer = Answers.findOne(answerId);

    if (!!answer) {
      userIds.push(answer.userId);

      var question = Questions.findOne(answer.questionId);
      if (!!question) {
        userIds.push(question.userId);
      }

      return Meteor.users.find({_id: {$in: userIds}}, {fields: Users.pubsub.publicProperties});
    
    }

  }

  return [];

});
