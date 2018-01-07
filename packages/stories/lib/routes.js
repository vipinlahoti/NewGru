FlowRouter.route('/stories/:_id', {
  name: "storyPage",
  action: function(params, queryParams) {
    BlazeLayout.render("layout", {main: "story_controller", storyTemplate: "story_reply"});
  }
});

FlowRouter.route('/stories/:_id/edit', {
  name: "storyEdit",
  action: function(params, queryParams) {
    BlazeLayout.render("layout", {main: "story_controller", storyTemplate: "story_edit"});
  }
});
