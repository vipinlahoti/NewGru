daysPerPage = 5;

Grudr.menuItems.add("viewsMenu", {
  route: Articles.getRoute,
  name: 'daily',
  label: 'daily',
  description: 'day_by_day_view',
  viewTemplate: 'articles_daily'
});

Grudr.menuItems.add("viewsQuestionMenu", {
  route: Questions.getRoute,
  name: 'daily',
  label: 'daily',
  description: 'day_by_day_view',
  viewTemplate: 'questions_daily'
});


