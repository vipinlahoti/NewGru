Template.article_edit.onRendered(function () {
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


Template.article_edit.onCreated(function () {

  var template = this;

  // initialize the reactive variables
  template.ready = new ReactiveVar(false);

  var articleSubscription = Grudr.subsManager.subscribe('singleArticle', FlowRouter.getParam("_id"));
  
  // Autorun 3: when subscription is ready, update the data helper's terms
  template.autorun(function () {

    var subscriptionsReady = articleSubscription.ready(); // ⚡ reactive ⚡

    // if subscriptions are ready, set terms to subscriptionsTerms
    if (subscriptionsReady) {
      template.ready.set(true);
    }
  });

});

Template.article_edit.helpers({
  ready: function () {
    return Template.instance().ready.get();
  },
  article: function () {
    return Articles.findOne(FlowRouter.getParam("_id"));
  },
  articleFields: function () {
    return Articles.simpleSchema().getEditableFields(Meteor.user());
  }
});

AutoForm.hooks({
  editArticleForm: {

    before: {
      "method-update": function() {
        
        var article = this.currentDoc;
        var modifier = this.updateDoc;

        // ------------------------------ Checks ------------------------------ //
        if (!Meteor.user()) {
          Bert.alert( 'You must be logged in', 'warning', 'growl-top-right' );
          return false;
        }

        // ------------------------------ Callbacks ------------------------------ //
        modifier = Grudr.callbacks.run("articleEditClient", modifier, article);
        return modifier;
      }
    },

    onSuccess: function(formType, article) {
      Events.track("edit article", {'articleId': article._id});
      FlowRouter.go('articlePage', article);
    },

    onError: function(formType, error) {
      Bert.alert( error.reason.split('|')[0], 'danger', 'growl-top-right' );
    }

  }
});
