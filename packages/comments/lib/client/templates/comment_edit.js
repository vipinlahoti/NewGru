Template.comment_edit.helpers({
  commentFields: function () {
    return Comments.simpleSchema().getEditableFields(Meteor.user());
  }
});

AutoForm.hooks({
  editCommentForm: {

    before: {
      "method-update": function() {
        
        var comment = this.currentDoc;
        var modifier = this.updateDoc;

        // ------------------------------ Checks ------------------------------ //
        if (!Meteor.user()) {
          Bert.alert( 'You must be logged in.', 'warning', 'growl-top-right' );
          return false;
        }

        // ------------------------------ Callbacks ------------------------------ //

        // run all article edit client callbacks on modifier object successively
        modifier = Grudr.callbacks.run("commentEditClient", modifier, comment);
        return modifier;
      }
    },

    onSuccess: function(formType, comment) {
      // TODO: find out why comment is undefined here
      comment = this.currentDoc;
      Events.track("edit comment", {'commentId': comment._id});
      FlowRouter.go("articlePage", {_id: comment.articleId});
    },

    onError: function(formType, error) {
      Bert.alert( error.reason.split('|')[0], 'danger', 'growl-top-right' );
    }

  }
});

// delete link
Template.comment_edit.events({
  'click .delete-link': function(e){
    var comment = this.comment;

    e.preventDefault();

    if(confirm("Are you sure?")){
      FlowRouter.go("articlesDefault");
      Meteor.call("deleteCommentById", comment._id, function(error) {
        if (error) {
          console.log(error);
          Bert.alert(error.reason, 'danger', 'growl-top-right' );
        } else {
          Bert.alert( 'Your comment has been deleted.', 'success', 'growl-top-right' );
        }
      });
    }
  }
});

Template.comment_edit.onRendered(function() {
  var self = this;
  this.$("textarea").keydown(function (e) {
    if(((e.metaKey || e.ctrlKey) && e.keyCode == 13) || (e.ctrlKey && e.keyCode == 13)){
      self.$('#editCommentForm').submit();
    }
  });
});
