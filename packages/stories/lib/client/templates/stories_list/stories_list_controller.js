// see https://www.discovermeteor.com/blog/template-level-subscriptions/

/*

This template acts as the controller that sets and manages the reactive context 
for the embedded storiesList template. It receives its parameters from a "caller" template.

*/

Template.storiesListController.onCreated(function () {

  // 1. Initialization (*not* reactive!)
  var instance = this;

  // initialize the reactive variables
  instance.terms = new ReactiveVar(instance.data.terms);
  instance.storiesLimit = new ReactiveVar(Settings.get('storiesPerPage', 5));

  // 2. Autorun

  // Autorun 1: when terms change, reset the limit
  instance.autorun(function () {
    // add a dependency on data context to trigger the autorun
    var terms = Template.currentData().terms; // ⚡ reactive ⚡
    instance.storiesLimit.set(Settings.get('storiesPerPage', 5));
  });

  // Autorun 2: will re-run when limit or terms are changed
  instance.autorun(function () {

    // get terms from data context
    var terms = Template.currentData().terms; // ⚡ reactive ⚡

    // get limit from local template variable
    var storiesLimit = instance.storiesLimit.get(); // ⚡ reactive ⚡

    // create new subscriptionTerms object using the new limit
    var subscriptionTerms = _.extend(_.clone(terms), {limit: storiesLimit}); // extend terms with limit

    // use this new object to subscribe
    var storiesSubscription = instance.subscribe('storiesList', subscriptionTerms);

    var subscriptionsReady = instance.subscriptionsReady(); // ⚡ reactive ⚡

    // console.log('// ------ autorun running ------ //');
    // console.log("terms: ", terms);
    // console.log("limit: ", storiesLimit);
    // console.log("ready: ", subscriptionsReady);
    // Tracker.onInvalidate(console.trace.bind(console));

    // if subscriptions are ready, set terms to subscriptionsTerms
    if (subscriptionsReady) {
      instance.terms.set(subscriptionTerms);
    }
  
  });

});

Template.storiesListController.helpers({
  template: function () {
    return !!this.template? this.template: "stories_list";
  },
  data: function () {

    var context = this;

    var instance = Template.instance();

    var terms = instance.terms.get(); // ⚡ reactive ⚡
    var storiesReady = instance.subscriptionsReady(); // ⚡ reactive ⚡

    var storiesLimit = terms.limit;
    var parameters = Stories.parameters.get(terms);
    var storiesCursor = Stories.find(parameters.find, parameters.options);

    var data = {

      // stories cursor
      storiesCursor: storiesCursor,

      // stories subscription readiness, used to show spinner
      storiesReady: storiesReady,

      // whether to show the load more button or not
      hasMorestories: storiesCursor.count() >= storiesLimit,

      // what to do when user clicks "load more"
      loadMoreHandler: function (instance) {
        event.preventDefault();

        // increase limit by 5 and update it
        var limit = instance.storiesLimit.get();
        limit += Settings.get('storiesPerPage', 5);
        instance.storiesLimit.set(limit);

      },

      // the current instance
      controllerInstance: instance,

      controllerOptions: context.options // pass any options on to the template

    };

    // console.log(data)
    return data;
  }
});
