Template.question_submit.onCreated(function () {
  Grudr.subsManager.subscribe('allUsersAdmin');
});

Template.question_submit.helpers({
  questionFields: function () {
    return Questions.simpleSchema().getEditableFields(Meteor.user());
  }
});

AutoForm.hooks({
  submitQuestionForm: {

    before: {
      method: function(doc) {

        var question = doc;

        this.template.$('button[type=submit]').addClass('loading');
        this.template.$('input, textarea').not(":disabled").addClass("disabled").prop("disabled", true);

        // ------------------------------ Checks ------------------------------ //

        if (!Meteor.user()) {
          Bert.alert( 'You must be logged in', 'danger', 'growl-top-right' );
          return false;
        }

        // ------------------------------ Callbacks ------------------------------ //

        // run all question submit client callbacks on properties object successively
        question = Grudr.callbacks.run("questionSubmitClient", question);

        return question;
      }
    },

    onSuccess: function(operation, question) {
      Events.track("new question", {'questionId': question._id});
      var template = this.template;
      Grudr.subsManager.subscribe('singleQuestion', question._id, function () {
        template.$('button[type=submit]').removeClass('loading');
        FlowRouter.go('questionPage', question);
      });
    },

    onError: function(operation, error) {
      this.template.$('button[type=submit]').removeClass('loading');
      this.template.$('.disabled').removeClass("disabled").prop("disabled", false);

      Bert.alert( error.message.split('|')[0], 'danger', 'growl-top-right' );

      if (error.error === "603") {
        var dupeQuestionId = error.reason.split('|')[1];
        FlowRouter.go('questionPage', {slug: '_', _id: dupeQuestionId});
      }
    }

  }
});
