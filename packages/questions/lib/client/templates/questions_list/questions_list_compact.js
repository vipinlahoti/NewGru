Template.questions_list_compact.helpers({
  questionsCursor: function () {
    if (this.questionsCursor) { // not sure why this should ever be undefined, but it can apparently
      var questions = this.questionsCursor.map(function (question, index) {
        question.rank = index;
        return question;
      });
      return questions;
    } else {
      console.log('questionsCursor not defined');
    }
  },
  fieldLabel: function () {
    return this.controllerOptions.fieldLabel;
  },
  fieldValue: function () {
    var controllerOptions = Template.parentData(3).data.controllerOptions;
    return controllerOptions.fieldValue(this);
  }
});

Template.questions_list_compact.events({
  'click .more-button': function (event) {
    event.preventDefault();
    if (this.controllerInstance) {
      // controller is a template
      this.loadMoreHandler(this.controllerInstance);
    } else {
      // controller is router
      this.loadMoreHandler();
    }
  }
});
