// see https://www.discovermeteor.com/blog/template-level-subscriptions/

/*

This template acts as the controller that sets and manages the reactive context 
for the embedded answersList template. It receives its parameters from a "caller" template.

*/

Template.answersListController.onCreated(function () {

  // 1. Initialization (*not* reactive!)
  var instance = this;

  // initialize the reactive variables
  instance.terms = new ReactiveVar(instance.data.terms);
  instance.answersLimit = new ReactiveVar(Settings.get('answersPerPage', 5));

  // 2. Autorun

  // Autorun 1: when terms change, reset the limit
  instance.autorun(function () {
    // add a dependency on data context to trigger the autorun
    var terms = Template.currentData().terms; // ⚡ reactive ⚡
    instance.answersLimit.set(Settings.get('answersPerPage', 5));
  });

  // Autorun 2: will re-run when limit or terms are changed
  instance.autorun(function () {

    // get terms from data context
    var terms = Template.currentData().terms; // ⚡ reactive ⚡

    // get limit from local template variable
    var answersLimit = instance.answersLimit.get(); // ⚡ reactive ⚡

    // create new subscriptionTerms object using the new limit
    var subscriptionTerms = _.extend(_.clone(terms), {limit: answersLimit}); // extend terms with limit

    // use this new object to subscribe
    var answersSubscription = instance.subscribe('answersList', subscriptionTerms);

    var subscriptionsReady = instance.subscriptionsReady(); // ⚡ reactive ⚡

    // console.log('// ------ autorun running ------ //');
    // console.log("terms: ", terms);
    // console.log("limit: ", answersLimit);
    // console.log("ready: ", subscriptionsReady);
    // Tracker.onInvalidate(console.trace.bind(console));

    // if subscriptions are ready, set terms to subscriptionsTerms
    if (subscriptionsReady) {
      instance.terms.set(subscriptionTerms);
    }
  
  });

});

Template.answersListController.helpers({
  template: function () {
    return !!this.template? this.template: "answers_list";
  },
  data: function () {

    var context = this;

    var instance = Template.instance();

    var terms = instance.terms.get(); // ⚡ reactive ⚡
    var answersReady = instance.subscriptionsReady(); // ⚡ reactive ⚡

    var answersLimit = terms.limit;
    var parameters = Answers.parameters.get(terms);
    var answersCursor = Answers.find(parameters.find, parameters.options);

    var data = {

      // answers cursor
      answersCursor: answersCursor,

      // answers subscription readiness, used to show spinner
      answersReady: answersReady,

      // whether to show the load more button or not
      hasMoreanswers: answersCursor.count() >= answersLimit,

      // what to do when user clicks "load more"
      loadMoreHandler: function (instance) {
        event.preventDefault();

        // increase limit by 5 and update it
        var limit = instance.answersLimit.get();
        limit += Settings.get('answersPerPage', 5);
        instance.answersLimit.set(limit);

      },

      // the current instance
      controllerInstance: instance,

      controllerOptions: context.options // pass any options on to the template

    };

    // console.log(data)
    return data;
  }
});
