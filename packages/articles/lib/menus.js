Articles.getRoute = function () {
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
  
  return FlowRouter.path("articlesDefault", FlowRouter.current().params, newQuery);
};

// array containing items in the views menu
var viewsMenuItems = [
  {
    route: Articles.getRoute,
    name: 'top',
    label: 'top',
    description: 'most_popular_articles'
  },
  {
    route: Articles.getRoute,
    name: 'new',
    label: 'new',
    description: 'newest_articles'
  },
  {
    route: Articles.getRoute,
    name: 'best',
    label: 'best',
    description: 'highest_ranked_articles_ever'
  },
  {
    route: Articles.getRoute,
    name: 'pending',
    label: 'pending',
    description: 'articles_awaiting_moderation',
    adminOnly: true
  },
  {
    route: Articles.getRoute,
    name: 'rejected',
    label: 'rejected',
    description: 'rejected_articles',
    adminOnly: true
  },
  {
    route: Articles.getRoute,
    name: 'scheduled',
    label: 'scheduled',
    description: 'future_scheduled_articles',
    adminOnly: true
  },
];

Grudr.menuItems.add("viewsMenu", viewsMenuItems);
