Template.article_submit.onRendered(function () {
  tinymce.EditorManager.editors = []; //we need to remove the old instances.
  tinymce.init({
    selector: 'textarea',
    skin_url: '/packages/teamon_tinymce/skins/lightgray',
    height: 300,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor autosave',
      'searchreplace visualblocks code fullscreen autoresize',
      'insertdatetime media table contextmenu paste code'
    ],
    autosave_ask_before_unload: true,
    autosave_interval: '20s',
    toolbar: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | restoredraft',
  });
  
  // $('textarea').summernote({
  //   height: 300,
  //   dialogsInBody: true,
  //   toolbar: [
  //     // [groupName, [list of button]]
  //     ['style', ['style', 'bold', 'italic', 'underline', 'clear']],
  //     ['font', ['fontname', 'strikethrough', 'superscript', 'subscript']],
  //     ['para', ['ul', 'ol', 'paragraph']],
  //     ['Insert', ['table']],
  //     ['Misc', ['fullscreen', 'undo', 'redo']]
  //   ]
  // });
});

Template.article_submit.onCreated(function () {
  Grudr.subsManager.subscribe('allUsersAdmin');
});

Template.article_submit.helpers({
  articleFields: function () {
    return Articles.simpleSchema().getEditableFields(Meteor.user());
  }
});

AutoForm.hooks({
  submitArticleForm: {

    before: {
      method: function(doc) {

        var article = doc;

        this.template.$('button[type=submit]').addClass('loading');
        this.template.$('input, textarea').not(":disabled").addClass("disabled").prop("disabled", true);

        // ------------------------------ Checks ------------------------------ //
        if (!Meteor.user()) {
          Bert.alert( 'You must be logged in', 'danger', 'growl-top-right' );
          return false;
        }

        // ------------------------------ Callbacks ------------------------------ //
        // run all article submit client callbacks on properties object successively
        article = Grudr.callbacks.run("articleSubmitClient", article);

        return article;
      }
    },

    onSuccess: function(operation, article) {
      Events.track("new article", {'articleId': article._id});
      var template = this.template;
      Grudr.subsManager.subscribe('singleArticle', article._id, function () {
        template.$('button[type=submit]').removeClass('loading');
        FlowRouter.go('articlePage', article);
      });
    },

    onError: function(operation, error) {
      this.template.$('button[type=submit]').removeClass('loading');
      this.template.$('.disabled').removeClass("disabled").prop("disabled", false);

      Bert.alert( error.message.split('|')[0], 'danger', 'growl-top-right' );
      
      // $(e.target).removeClass('disabled');
      if (error.error === "603") {
        var dupeArticleId = error.reason.split('|')[1];
        FlowRouter.go('articlePage', {slug: '_', _id: dupeArticleId});
      }
    }

  }
});
