FlowRouter.route('/answers/:_id', {
  name: "answerPage",
  action: function(params, queryParams) {
    BlazeLayout.render("layout", {main: "answer_controller", answerTemplate: "answer_reply"});
  }
});

FlowRouter.route('/answers/:_id/edit', {
  name: "answerEdit",
  action: function(params, queryParams) {
    BlazeLayout.render("layout", {main: "answer_controller", answerTemplate: "answer_edit"});
  }
});
