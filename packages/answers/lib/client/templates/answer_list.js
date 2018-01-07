Template.answer_list.helpers({
  answerListClass: function () {
    var question = this;
    var answers = Answers.find({questionId: question._id, parentAnswerId: null}, {sort: {score: -1, postedAt: -1}});
    return !!answers.count() ? "has-answers" : "no-answers";
  },
  childAnswers: function(){
    var question = this;
    var answers = Answers.find({questionId: question._id, parentAnswerId: null}, {sort: {score: -1, postedAt: -1}});
    return answers;
  }
});

Template.answer_list.rendered = function(){
  // once all answers have been rendered, activate answer queuing for future real-time answers
  window.queueAnswers = true;
};
