Template.story_edit.helpers({
  storyFields: function () {
    return Stories.simpleSchema().getEditableFields(Meteor.user());
  }
});

AutoForm.hooks({
  editStoryForm: {

    before: {
      "method-update": function() {
        
        var story = this.currentDoc;
        var modifier = this.updateDoc;

        // ------------------------------ Checks ------------------------------ //
        if (!Meteor.user()) {
          Bert.alert( 'You must be logged in.', 'warning', 'growl-top-right' );
          return false;
        }

        // ------------------------------ Callbacks ------------------------------ //

        // run all user edit client callbacks on modifier object successively
        modifier = Grudr.callbacks.run("storyEditClient", modifier, story);
        return modifier;
      }
    },

    onSuccess: function(formType, story) {
      // TODO: find out why story is undefined here
      story = this.currentDoc;
      Events.track("edit story", {'storyId': story._id});
      FlowRouter.go("userPage", {_id: story.userId});
    },

    onError: function(formType, error) {
      Bert.alert( error.reason.split('|')[0], 'danger', 'growl-top-right' );
    }

  }
});

// delete link
Template.story_edit.events({
  'click .delete-link': function(e){
    var story = this.story;

    e.preventDefault();

    if(confirm("Are you sure?")){
      FlowRouter.go("usersDefault");
      Meteor.call("deleteStoryById", story._id, function(error) {
        if (error) {
          console.log(error);
          Bert.alert(error.reason, 'danger', 'growl-top-right' );
        } else {
          Bert.alert( 'Your story has been deleted.', 'success', 'growl-top-right' );
        }
      });
    }
  }
});

Template.story_edit.onRendered(function() {
  var self = this;
  this.$("textarea").keydown(function (e) {
    if(((e.metaKey || e.ctrlKey) && e.keyCode == 13) || (e.ctrlKey && e.keyCode == 13)){
      self.$('#editStoryForm').submit();
    }
  });
});
