Template.articles_list_compact.helpers({
  articlesCursor: function () {
    if (this.articlesCursor) { // not sure why this should ever be undefined, but it can apparently
      var articles = this.articlesCursor.map(function (article, index) {
        article.rank = index;
        return article;
      });
      return articles;
    } else {
      console.log('articlesCursor not defined');
    }
  },
  fieldLabel: function () {
    return this.controllerOptions.fieldLabel;
  },
  fieldValue: function () {
    var controllerOptions = Template.parentData(3).data.controllerOptions;
    return controllerOptions.fieldValue(this);
  }
});

Template.articles_list_compact.events({
  'click .more-button': function (event) {
    event.preventDefault();
    if (this.controllerInstance) {
      // controller is a template
      this.loadMoreHandler(this.controllerInstance);
    } else {
      // controller is router
      this.loadMoreHandler();
    }
  }
});
