Template.article_admin.helpers({
  showApprove: function () {
    return !!Settings.get('requireArticlesApproval') && (this.status === Articles.config.STATUS_PENDING || this.status === Articles.config.STATUS_REJECTED);
  },
  showReject: function(){
    return !!Settings.get('requireArticlesApproval') && (this.status === Articles.config.STATUS_PENDING || this.status === Articles.config.STATUS_APPROVED);
  },
  shortScore: function(){
    return Math.floor(this.score*100)/100;
  }
});

Template.article_admin.events({
  'click .approve-link': function(e){
    Meteor.call('approveArticle', this._id);
    e.preventDefault();
  },
  'click .reject-link': function(e){
    Meteor.call('rejectArticle', this._id);
    e.preventDefault();
  },
  'click .delete-link': function(e){
    var article = this;

    e.preventDefault();

    if(confirm("Delete “"+article.title+"”?")){
      FlowRouter.go('articlesDefault');
      Meteor.call("deleteArticleById", article._id, function(error) {
        if (error) {
          Bert.alert( error.reason, 'danger', 'growl-top-right' );
        } else {
          Bert.alert( 'Your article has been deleted.', 'danger', 'growl-top-right' );
        }
      });
    }
  }
});
