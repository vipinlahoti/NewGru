Template.user_questions.helpers({
  arguments: function () {
    var user = this;
    var args = {
      template: "questions_list_compact",
      options: {
        currentUser: user,
        fieldLabel: "Posted at",
        fieldValue: function (question) {
          return moment(question.postedAt).format("MMM Do, YYYY, hh:mm A");
        }
      },
      terms: {
        view: 'userQuestions',
        userId: user._id,
        limit: 5,
        enableCache: false,
        subscribeToUsers: true
      }
    };
    return args;
  }
});
