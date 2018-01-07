Template.question_edit.onCreated(function () {

  var template = this;

  // initialize the reactive variables
  template.ready = new ReactiveVar(false);

  var questionSubscription = Grudr.subsManager.subscribe('singleQuestion', FlowRouter.getParam("_id"));
  
  // Autorun 3: when subscription is ready, update the data helper's terms
  template.autorun(function () {

    var subscriptionsReady = questionSubscription.ready(); // ⚡ reactive ⚡

    // if subscriptions are ready, set terms to subscriptionsTerms
    if (subscriptionsReady) {
      template.ready.set(true);
    }
  });

});

Template.question_edit.helpers({
  ready: function () {
    return Template.instance().ready.get();
  },
  question: function () {
    return Questions.findOne(FlowRouter.getParam("_id"));
  },
  questionFields: function () {
    return Questions.simpleSchema().getEditableFields(Meteor.user());
  }
});

AutoForm.hooks({
  editQuestionForm: {

    before: {
      "method-update": function() {
        
        var question = this.currentDoc;
        var modifier = this.updateDoc;

        // ------------------------------ Checks ------------------------------ //
        if (!Meteor.user()) {
          Bert.alert( 'You must be logged in', 'warning', 'growl-top-right' );
          return false;
        }

        // ------------------------------ Callbacks ------------------------------ //
        modifier = Grudr.callbacks.run("questionEditClient", modifier, question);
        return modifier;
      }
    },

    onSuccess: function(formType, question) {
      Events.track("edit question", {'questionId': question._id});
      FlowRouter.go('questionPage', question);
    },

    onError: function(formType, error) {
      Bert.alert( error.reason.split('|')[0], 'danger', 'growl-top-right' );
    }

  }
});
