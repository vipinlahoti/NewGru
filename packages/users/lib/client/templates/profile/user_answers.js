Template.user_answers.helpers({
  arguments: function () {
    var user = this;
    return {
      template: "answers_list_compact",
      options: {
        currentUser: user,
        fieldLabel: "Answered at",
        fieldValue: function (answer) {
          return moment(answer.createdAt).format("MMM Do, YYYY, hh:mm A");
        }
      },
      terms: {
        view: 'userAnswers',
        userId: user._id,
        limit: 5,
        enableCache: false,
        subscribeToUsers: true
      }
    };
  }
});
