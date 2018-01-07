Template.story_controller.onCreated(function () {
  
  var template = this;
  var storyId = FlowRouter.getParam("_id");

  template.subscribe('singleStoryAndChildren', storyId);

  if (FlowRouter.getRouteName() === "storyPage") {
    template.subscribe('storyUsers', storyId);
    template.subscribe('storyUser', storyId);
  }

});

Template.story_controller.helpers({
  data: function () {
    return {story: Stories.findOne(FlowRouter.getParam("_id"))};
  }
});
