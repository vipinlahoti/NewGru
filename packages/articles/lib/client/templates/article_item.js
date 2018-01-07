Template.article_item.helpers({
  articleClass: function () {
    var article = this;
    var articleClass = "card ";
    
    articleClass += "author-"+Grudr.utils.slugify(article.author)+" ";

    if (this.sticky) {
      articleClass += "sticky ";
    }
    articleClass = Grudr.callbacks.run("articleClass", articleClass, article);
    return articleClass;
  }
});
