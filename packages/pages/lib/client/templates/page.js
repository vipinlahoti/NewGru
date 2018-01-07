Template.page.onCreated(function () {
  Grudr.SEO.setTitle(Pages.findOne({slug: FlowRouter.getParam("slug")}).title);
});

Template.page.helpers({
  page: function () {
    return Pages.findOne({slug: FlowRouter.getParam("slug")});
  }
});
