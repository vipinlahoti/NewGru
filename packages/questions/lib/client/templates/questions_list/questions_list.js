// ----------------------------------- Question List -----------------------------------//

Template.questions_list.created = function() {
  Session.set('listPopulatedAt', new Date());
};

Template.questions_list.helpers({
  questionsLayout: function () {
    return Settings.get('questionsLayout', 'questions-list');
  },
  description: function () {
    var controller = Iron.controller();
    if (typeof controller.getDescription === 'function')
      return Iron.controller().getDescription();
  },
  questionsCursor : function () {
    if (this.questionsCursor) { // not sure why this should ever be undefined, but it can apparently
      var questions = this.questionsCursor.map(function (question, index) {
        question.rank = index;
        return question;
      });
      return questions;
    } else {
      console.log('questionsCursor not defined');
    }
  }
});

// ----------------------------------- Incoming -----------------------------------//

Template.questionsListIncoming.events({
  'click .show-new': function() {
    Session.set('listPopulatedAt', new Date());
  }
});

// ----------------------------------- Load More -----------------------------------//

Template.questionsLoadMore.helpers({
  questionsReady: function () {
    return this.questionsReady;
  },
  showInfiniteScroll: function () {
    if (this.controllerOptions && this.controllerOptions.loadMoreBehavior === "button") {
      return false;
    } else {
      return this.hasMoreQuestions;
    }
  },
  showLoadMoreButton: function () {
    if (this.controllerOptions && this.controllerOptions.loadMoreBehavior === "scroll") {
      return false;
    } else {
      return this.hasMoreQuestions;
    }
  },
  hasQuestions: function () {
    return !!this.questionsCursor.count();
  }
});

Template.questionsLoadMore.onCreated(function () {

  var context = Template.currentData();

  if (context.controllerOptions && context.controllerOptions.loadMoreBehavior === "scroll") {

    $(window).scroll(function() {
      if($(window).scrollTop() + $(window).height() === $(document).height()) {
        context.loadMoreHandler(context.controllerInstance);
      }
    });

  }
});

Template.questionsLoadMore.events({
  'click .more-button': function (event) {
    event.preventDefault();
    this.loadMoreHandler(this.controllerInstance);
  }
});
