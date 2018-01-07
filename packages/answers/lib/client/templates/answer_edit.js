Template.answer_edit.helpers({
  answerFields: function () {
    return Answers.simpleSchema().getEditableFields(Meteor.user());
  }
});

AutoForm.hooks({
  editAnswerForm: {

    before: {
      "method-update": function() {
        
        var answer = this.currentDoc;
        var modifier = this.updateDoc;

        // ------------------------------ Checks ------------------------------ //
        if (!Meteor.user()) {
          Bert.alert( 'You must be logged in', 'info', 'growl-top-right' );
          return false;
        }

        // ------------------------------ Callbacks ------------------------------ //
        // run all question edit client callbacks on modifier object successively
        modifier = Grudr.callbacks.run("answerEditClient", modifier, answer);
        return modifier;
      }
    },

    onSuccess: function(formType, answer) {
      // TODO: find out why answer is undefined here
      answer = this.currentDoc;
      Events.track("edit answer", {'answerId': answer._id});
      FlowRouter.go("questionPage", {_id: answer.questionId});
    },

    onError: function(formType, error) {
      Bert.alert( error.reason.split('|')[0], 'danger', 'growl-top-right' );
    }

  }
});

// delete link
Template.answer_edit.events({
  'click .delete-link': function(e){
    var answer = this.answer;

    e.preventDefault();

    if(confirm("Are you sure?")){
      FlowRouter.go("questionsDefault");
      Meteor.call("deleteAnswerById", answer._id, function(error) {

        if (error) {
          Bert.alert(error.reason, 'danger', 'growl-top-right' );
        } else {
          Bert.alert( 'Your answer has been deleted.', 'success', 'growl-top-right' );
        }

      });
    }
  }
});

Template.answer_edit.onRendered(function() {
  var self = this;
  this.$("textarea").keydown(function (e) {

    if(((e.metaKey || e.ctrlKey) && e.keyCode == 13) || (e.ctrlKey && e.keyCode == 13)){
      self.$('#editAnswerForm').submit();
    }
    
  });
});
