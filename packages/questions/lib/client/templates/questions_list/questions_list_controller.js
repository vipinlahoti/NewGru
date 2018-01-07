// see https://www.discovermeteor.com/blog/template-level-subscriptions/

/*

This template acts as the controller that sets and manages the reactive context 
for the embedded questionsList template. It receives its parameters from a "caller" template.

The goal is to resubscribe when either one of the following events happens: 
- The external data context passed to the template from its parent changes
- The template's own internal rLimit ReactiveVar changes

In both cases, the template should resubscribe to the publication, and then once the subscription is ready
update the terms used by the template helper's Questions.find(). 

*/

Template.questions_list_controller.onCreated(function () {

  // 1. Initialization (*not* reactive!)
  var template = this;
  var terms = _.clone(template.data.terms);
  template.terms = terms;

  // initialize the reactive variables
  template.rTerms = new ReactiveVar(terms);
  template.rLimit = new ReactiveVar(Settings.get('questionsPerPage', 10));
  template.rReady = new ReactiveVar(false);

  // if caching is set to true, use Subs Manager. Else use template.subscribe. Default to false
  var enableCache = (typeof terms.enableCache === "undefined") ? false : terms.enableCache;
  var subscriber = enableCache ? Grudr.subsManager : template;

  // enable not subscribing to users on a per-controller basis
  var subscribeToUsers = (typeof terms.subscribeToUsers === "undefined") ? true : terms.subscribeToUsers;

  template.autorun(function () {

    // set controller as not ready
    template.rReady.set(false);

    // depend on terms
    var newTerms = _.clone(Template.currentData().terms); // ⚡ reactive ⚡

    // depend on rLimit
    var rLimit = template.rLimit.get(); // ⚡ reactive ⚡

    // complete terms with rLimit
    newTerms.limit = rLimit;

    // subscribe to questions and (optionally) users
    var questionsSubscription = subscriber.subscribe('questionsList', newTerms);
    if (subscribeToUsers) {
      var usersSubscription = subscriber.subscribe('questionsListUsers', newTerms);
    }

    // check if subscriptions are ready
    var subscriptionsReady;
    if (subscribeToUsers) {
      subscriptionsReady = questionsSubscription.ready() && usersSubscription.ready(); // ⚡ reactive ⚡
    } else {
      subscriptionsReady = questionsSubscription.ready(); // ⚡ reactive ⚡
    }

    // console.log('// ------ autorun ------ //');
    // console.log("newTerms: ", newTerms);
    // console.log("rLimit: ", rLimit);
    // console.log("subscriptionsReady: ", subscriptionsReady);

    // if subscriptions are ready, set terms to newTerms
    if (subscriptionsReady) {
      template.rTerms.set(newTerms);
      template.rReady.set(true);
    }

  });

});

// runs whenever the template's data context changes to reset rLimit
Template.questions_list_controller.onDataChanged(function (data) {

  var template = this;
  var oldTerms = template.terms;
  var newTerms = data.terms;
  
  // console.log("// ------ onDataChanged ------ //")
  // console.log("oldTerms: ", _.clone(oldTerms));
  // console.log("newTerms: ", _.clone(newTerms));
  // console.log("isEqual?: ", _.isEqual(newTerms, oldTerms));

  // if terms have changed, we reset rLimit
  if (!_.isEqual(oldTerms, newTerms)) {
    template.terms = newTerms;
    template.rLimit.set(Settings.get('questionsPerPage', 10));
  }
});

Template.questions_list_controller.helpers({
  template: function () {
    return !!this.template? this.template: "questions_list";
  },
  data: function () {

    var context = this;

    var template = Template.instance();

    var terms = template.rTerms.get(); // ⚡ reactive ⚡
    var questionsReady = template.rReady.get(); // ⚡ reactive ⚡

    var parameters = Questions.parameters.get(terms);
    var questionsCursor = Questions.find(parameters.find, parameters.options);

    // if (debug) {
    //   console.log("// -------- data -------- //")
    //   console.log("terms: ", terms);
    // }

    var data = {

      // questions cursor
      questionsCursor: questionsCursor,

      // questions subscription readiness, used to show spinner
      questionsReady: questionsReady,

      // whether to show the load more button or not
      hasMoreQuestions: questionsCursor.count() >= terms.limit,

      // what to do when user clicks "load more"
      loadMoreHandler: function (template) {
        // increase limit by 5 and update it
        var limit = template.rLimit.get();
        limit += Settings.get('questionsPerPage', 10);
        template.rLimit.set(limit);
      },

      // the current instance
      controllerInstance: template,

      controllerOptions: context.options // pass any options on to the template

    };

    return data;
  }
});
