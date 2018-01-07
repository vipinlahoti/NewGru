Template.comment_reply.helpers({
  article: function () {
    if(this.comment){
      var article = Articles.findOne(this.comment.articleId);
      return article;
    }
  }
});
