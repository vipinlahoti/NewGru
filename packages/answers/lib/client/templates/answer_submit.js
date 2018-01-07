Template.answer_submit.helpers({
  answerFields: function () {
    return Answers.simpleSchema().getEditableFields(Meteor.user());
  },
  isLoggedIn: function () {
    return !!Meteor.user();
  }
});

AutoForm.hooks({
  submitAnswerForm: {

    before: {
      method: function(doc) {

        var answer = doc;

        this.template.$('button[type=submit]').addClass('loading');
        this.template.$('input, textarea').not(":disabled").addClass("disabled").prop("disabled", true);

        var parent = this.formAttributes.parentContext;

        if (!!parent.answer) { // child answer
          var parentAnswer = parent.answer;
          answer.parentAnswerId = parentAnswer._id;
          answer.questionId = parentAnswer.questionId;

          if(!parentAnswer.topLevelAnswerId) { // root answer
            answer.topLevelAnswerId = parentAnswer._id;
          } else { // nested answer
            answer.topLevelAnswerId = parentAnswer.topLevelAnswerId;
          }
        } else { // root answer
          var question = parent;
          answer.questionId = question._id;
        }

        // ------------------------------ Checks ------------------------------ //
        if (!Meteor.user()) {
          Bert.alert( 'You must be logged in', 'danger', 'growl-top-right' );
          return false;
        }

        // ------------------------------ Callbacks ------------------------------ //
        // run all answer submit client callbacks on properties object successively
        answer = Grudr.callbacks.run("answerSubmitClient", answer);

        return answer;
      }
    },

    onSuccess: function(operation, answer) {
      this.template.$('button[type=submit]').removeClass('loading');
      this.template.$('.disabled').removeClass("disabled").prop("disabled", false);
      var question = Questions.findOne(answer.questionId);
      Events.track("new answer", {'answerId': answer._id});
      FlowRouter.go('questionPage', {_id: answer.questionId, slug: question.slug});
      if (answer.status === Questions.config.STATUS_PENDING) {
        Bert.alert( 'Thanks, your question is awaiting approval.', 'success', 'growl-top-right' );
      }
    },

    onError: function(operation, error) {
      this.template.$('button[type=submit]').removeClass('loading');
      this.template.$('.disabled').removeClass("disabled").prop("disabled", false);

      Bert.alert( error.message.split('|')[0], 'danger', 'growl-top-right' );
    }

  }
});

Template.answer_submit.onRendered(function() {
  var self = this;
  this.$("textarea").keydown(function (e) {

    if(((e.metaKey || e.ctrlKey) && e.keyCode == 13) || (e.ctrlKey && e.keyCode == 13)){
      self.$('#submitAnswerForm').submit();
    }
    
  });
});
