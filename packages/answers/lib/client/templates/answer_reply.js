Template.answer_reply.helpers({
  question: function () {
    if(this.answer){
      var question = Questions.findOne(this.answer.questionId);
      return question;
    }
  }
});
