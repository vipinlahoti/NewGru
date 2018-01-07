Questions.getRoute = function () {
  FlowRouter.watchPathChange()
  var viewName = this.name;
  var currentQuery = _.clone(FlowRouter.current().queryParams);
  var defaultView = Settings.get("defaultView", "top");
  var newQuery;

  if (viewName === defaultView) {
    // for the default view, just remove the "view" parameter altogether
    delete currentQuery.view;
    newQuery = currentQuery;
  } else {
    newQuery = _.extend(currentQuery, {view: viewName});
  }
  
  return FlowRouter.path("questionsDefault", FlowRouter.current().params, newQuery);
};

// array containing items in the views menu
var viewsQuestionMenuItems = [
  {
    route: Questions.getRoute,
    name: 'top',
    label: 'top',
    description: 'most_popular_questions'
  },
  {
    route: Questions.getRoute,
    name: 'new',
    label: 'new',
    description: 'newest_questions'
  },
  {
    route: Questions.getRoute,
    name: 'best',
    label: 'best',
    description: 'highest_ranked_questions_ever'
  },
  {
    route: Questions.getRoute,
    name: 'pending',
    label: 'pending',
    description: 'questions_awaiting_moderation',
    adminOnly: true
  },
  {
    route: Questions.getRoute,
    name: 'rejected',
    label: 'rejected',
    description: 'rejected_questions',
    adminOnly: true
  },
  {
    route: Questions.getRoute,
    name: 'scheduled',
    label: 'scheduled',
    description: 'future_scheduled_questions',
    adminOnly: true
  },
];

Grudr.menuItems.add("viewsQuestionMenu", viewsQuestionMenuItems);
