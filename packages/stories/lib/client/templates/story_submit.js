Template.story_submit.helpers({
  storyFields: function () {
    return Stories.simpleSchema().getEditableFields(Meteor.user());
  },
  isLoggedIn: function () {
    return !!Meteor.user();
  }
});

AutoForm.hooks({
  submitStoryForm: {

    before: {
      method: function(doc) {

        var story = doc;

        this.template.$('button[type=submit]').addClass('loading');
        this.template.$('input, textarea').not(":disabled").addClass("disabled").prop("disabled", true);

        var parent = this.formAttributes.parentContext;

        if (!!parent.story) { // child story
          var parentStory = parent.story;
          story.parentStoryId = parentStory._id;
          story.userId = parentStory.userId;

          if(!parentStory.topLevelStoryId) { // root story
            story.topLevelStoryId = parentStory._id;
          } else { // nested story
            story.topLevelStoryId = parentStory.topLevelStoryId;
          }
        } else { // root story
          var user = parent;
          story.userId = user._id;
        }

        // ------------------------------ Checks ------------------------------ //
        if (!Meteor.user()) {
          Bert.alert( 'You must be logged in', 'danger', 'growl-top-right' );
          return false;
        }

        // ------------------------------ Callbacks ------------------------------ //
        // run all story submit client callbacks on properties object successively
        story = Grudr.callbacks.run("storySubmitClient", story);

        return story;
      }
    },

    onSuccess: function(operation, story) {
      this.template.$('button[type=submit]').removeClass('loading');
      this.template.$('.disabled').removeClass("disabled").prop("disabled", false);
      var user = Users.findOne(story.userId);
      Events.track("new story", {'storyId': story._id});
      FlowRouter.go('userPage', {_id: story.userId, slug: user.slug});
      if (story.status === Users.config.STATUS_PENDING) {
        Bert.alert( 'Thanks, your user is awaiting approval.', 'success', 'growl-top-right' );
      }
    },

    onError: function(operation, error) {
      this.template.$('button[type=submit]').removeClass('loading');
      this.template.$('.disabled').removeClass("disabled").prop("disabled", false);

      Bert.alert( error.message.split('|')[0], 'danger', 'growl-top-right' );
    }

  }
});

Template.story_submit.onRendered(function() {
  var self = this;
  this.$("textarea").keydown(function (e) {
    if(((e.metaKey || e.ctrlKey) && e.keyCode == 13) || (e.ctrlKey && e.keyCode == 13)){
      self.$('#submitStoryForm').submit();
    }
  });
});
