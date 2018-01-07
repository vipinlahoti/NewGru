Template.stories_list_compact.helpers({
  storiesCursor: function () {
    if (this.storiesCursor) { // not sure why this should ever be undefined, but it can apparently
      var stories = this.storiesCursor.map(function (story, index) {
        story.rank = index;
        return story;
      });
      return stories;
    } else {
      console.log('storiesCursor not defined');
    }
  },
  userTitle: function () {
    var user = Users.findOne(this.userId);
    return !!user && user.title;
  },
  fieldLabel: function () {
    return this.controllerOptions.fieldLabel;
  },
  fieldValue: function () {
    var controllerOptions = Template.parentData(3).data.controllerOptions;
    return controllerOptions.fieldValue(this);
  }
});

Template.stories_list_compact.events({
  'click .more-button': function (event) {
    event.preventDefault();
    if (this.controllerInstance) {
      // controller is a template
      this.loadMoreHandler(this.controllerInstance);
    } else {
      // controller is router
      this.loadMoreHandler();
    }
  }
});
