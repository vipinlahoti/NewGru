Template.comment_edit.helpers({
  commentFields: function () {
    return Comments.simpleSchema().getEditableFields(Meteor.user());
  }
});

AutoForm.hooks({
  editCommentForm: {

    before: {
      'method-update': function() {
        
        var comment = this.currentDoc;
        var modifier = this.updateDoc;

        // ------------------------------ Checks ------------------------------ //

        if (!Meteor.user()) {
          Messages.flash('You must be logged in', 'info');
          return false;
        }

        // ------------------------------ Callbacks ------------------------------ //

        // run all post edit client callbacks on modifier object successively
        modifier = Telescope.callbacks.run('commentEditClient', modifier, comment);
        return modifier;
      }
    },

    onSuccess: function(formType, comment) {
      // TODO: find out why comment is undefined here
      comment = this.currentDoc;
      Events.track('edit comment', {'commentId': comment._id});
      FlowRouter.go('postPage', {_id: comment.postId});
    },

    onError: function(formType, error) {
      console.log(error);
      Messages.flash(error.reason.split('|')[0], 'error'); // workaround because error.details returns undefined
      Messages.clearSeen();
    }

  }
});

// delete link
Template.comment_edit.events({
  'click .delete-link': function(e){
    var comment = this.comment;

    e.preventDefault();

    if(confirm('Are you sure?')){
      FlowRouter.go('postsDefault');
      Meteor.call('deleteCommentById', comment._id, function(error) {
        if (error) {
          console.log(error);
          Messages.flash(error.reason, 'error');
        } else {
          Messages.flash('Your comment has been deleted', 'success');
        }
      });
    }
  }
});

Template.comment_edit.onRendered(function() {
  var self = this;
  this.$('textarea').keydown(function (e) {
    if(((e.metaKey || e.ctrlKey) && e.keyCode == 13) || (e.ctrlKey && e.keyCode == 13)){
      self.$('#editCommentForm').submit();
    }
  });
});
