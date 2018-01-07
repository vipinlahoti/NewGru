FlowRouter.route('/questions', {
  name: "questionsDefault",
  action: function(params, queryParams) {
    BlazeLayout.render("layout", {main: "main_questions_list"});
  }
});

FlowRouter.route('/questions/:_id/edit', {
  name: "questionEdit",
  action: function(params, queryParams) {
    BlazeLayout.render("layout", {main: "question_edit"});
  }
});

FlowRouter.route('/questions/:_id/:slug?', {
  name: "questionPage",
  action: function(params, queryParams) {
    trackRouteEntry(params._id);
    BlazeLayout.render("layout", {main: "question_page"});
  }
});

var trackRouteEntry = function (questionId) {
  var sessionId = Meteor.default_connection && Meteor.default_connection._lastSessionId ? Meteor.default_connection._lastSessionId : null;
  Meteor.call('increaseQuestionViews', questionId, sessionId);
}

FlowRouter.route('/add-question', {
  name: "questionSubmit",
  action: function(params, queryParams) {
    BlazeLayout.render("layout", {main: "question_submit"});
  }
});
