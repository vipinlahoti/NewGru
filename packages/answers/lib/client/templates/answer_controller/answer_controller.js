Template.answer_controller.onCreated(function () {
  
  var template = this;
  var answerId = FlowRouter.getParam("_id");

  template.subscribe('singleAnswerAndChildren', answerId);

  if (FlowRouter.getRouteName() === "answerPage") {
    template.subscribe('answerUsers', answerId);
    template.subscribe('answerQuestion', answerId);
  }

});

Template.answer_controller.helpers({
  data: function () {
    return {answer: Answers.findOne(FlowRouter.getParam("_id"))};
  }
});
