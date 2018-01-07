Template.story_list.helpers({
  storyListClass: function () {
    var user = this;
    var stories = Stories.find({userId: user._id, parentStoryId: null}, {sort: {score: -1, postedAt: -1}});
    return !!stories.count() ? "has-stories" : "no-stories";
  },
  childStories: function(){
    var user = this;
    var stories = Stories.find({userId: user._id, parentStoryId: null}, {sort: {score: -1, postedAt: -1}});
    return stories;
  }
});

Template.story_list.rendered = function(){
  // once all stories have been rendered, activate story queuing for future real-time stories
  window.queueStories = true;
};
