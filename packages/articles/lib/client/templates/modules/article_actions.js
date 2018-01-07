Template.article_actions.events({
  'click .toggle-actions-link': function(e){
    e.preventDefault();
    var $article = $(e.target).parents('.article');
    var h = $article.height();
    if ($article.hasClass('show-actions')) {
      $article.height('auto');
      $article.removeClass('show-actions');
    } else {
      $article.height(h+'px');
      $article.addClass('show-actions');
    }
  }
});
