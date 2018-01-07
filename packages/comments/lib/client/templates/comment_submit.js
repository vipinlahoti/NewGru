Template.comment_submit.helpers({
  commentFields: function () {
    return Comments.simpleSchema().getEditableFields(Meteor.user());
  },
  isLoggedIn: function () {
    return !!Meteor.user();
  }
});

AutoForm.hooks({
  submitCommentForm: {

    before: {
      method: function(doc) {

        var comment = doc;

        this.template.$('button[type=submit]').addClass('loading');
        this.template.$('input, textarea').not(":disabled").addClass("disabled").prop("disabled", true);

        var parent = this.formAttributes.parentContext;

        if (!!parent.comment) { // child comment
          var parentComment = parent.comment;
          comment.parentCommentId = parentComment._id;
          comment.articleId = parentComment.articleId;

          if(!parentComment.topLevelCommentId) { // root comment
            comment.topLevelCommentId = parentComment._id;
          } else { // nested comment
            comment.topLevelCommentId = parentComment.topLevelCommentId;
          }
        } else { // root comment
          var article = parent;
          comment.articleId = article._id;
        }

        // ------------------------------ Checks ------------------------------ //
        if (!Meteor.user()) {
          Bert.alert( 'You must be logged in', 'danger', 'growl-top-right' );
          return false;
        }

        // ------------------------------ Callbacks ------------------------------ //
        // run all comment submit client callbacks on properties object successively
        comment = Grudr.callbacks.run("commentSubmitClient", comment);

        return comment;
      }
    },

    onSuccess: function(operation, comment) {
      this.template.$('button[type=submit]').removeClass('loading');
      this.template.$('.disabled').removeClass("disabled").prop("disabled", false);
      var article = Articles.findOne(comment.articleId);
      Events.track("new comment", {'commentId': comment._id});
      FlowRouter.go('articlePage', {_id: comment.articleId, slug: article.slug});
      if (comment.status === Articles.config.STATUS_PENDING) {
        Bert.alert( 'Thanks, your article is awaiting approval.', 'success', 'growl-top-right' );
      }
    },

    onError: function(operation, error) {
      this.template.$('button[type=submit]').removeClass('loading');
      this.template.$('.disabled').removeClass("disabled").prop("disabled", false);

      Bert.alert( error.message.split('|')[0], 'danger', 'growl-top-right' );
    }

  }
});

Template.comment_submit.onRendered(function() {
  var self = this;
  this.$("textarea").keydown(function (e) {
    if(((e.metaKey || e.ctrlKey) && e.keyCode == 13) || (e.ctrlKey && e.keyCode == 13)){
      self.$('#submitCommentForm').submit();
    }
  });
});
