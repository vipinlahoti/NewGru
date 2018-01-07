Template.answers_list_compact.helpers({
  answersCursor: function () {
    if (this.answersCursor) { // not sure why this should ever be undefined, but it can apparently
      var answers = this.answersCursor.map(function (answer, index) {
        answer.rank = index;
        return answer;
      });
      return answers;
    } else {
      console.log('answersCursor not defined');
    }
  },
  questionExcerpt: function () {
    var question = Questions.findOne(this.questionId);
    return !!question && question.excerpt;
  },
  fieldLabel: function () {
    return this.controllerOptions.fieldLabel;
  },
  fieldValue: function () {
    var controllerOptions = Template.parentData(3).data.controllerOptions;
    return controllerOptions.fieldValue(this);
  }
});

Template.answers_list_compact.events({
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
