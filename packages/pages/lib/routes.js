
Grudr.adminRoutes.route('/pages', {
  name: "adminPages",
  action: function(params, queryParams) {
    BlazeLayout.render("layout", {main: "admin_wrapper", admin: "pages"});
  }
});

FlowRouter.route('/', {
  name: "homePage",
  action: function(params, queryParams) {
    BlazeLayout.render("layout", {main: "homePage"});
  }
});
FlowRouter.route('/:slug', {
  name: "page",
  action: function(params, queryParams) {
    BlazeLayout.render("layout", {main: "page"});
  }
});
