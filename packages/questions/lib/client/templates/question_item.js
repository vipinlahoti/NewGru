Template.question_item.helpers({
  questionClass: function () {
    var question = this;
    var questionClass = "card ";
    
    questionClass += "author-"+Grudr.utils.slugify(question.author)+" ";

    if (this.sticky) {
      questionClass += "sticky ";
    }
    questionClass = Grudr.callbacks.run("questionClass", questionClass, question);
    return questionClass;
  }
});
