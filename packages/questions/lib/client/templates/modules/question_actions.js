Template.question_actions.events({
  'click .toggle-actions-link': function(e){
    e.preventDefault();
    var $question = $(e.target).parents('.question');
    var h = $question.height();
    if ($question.hasClass('show-actions')) {
      $question.height('auto');
      $question.removeClass('show-actions');
    } else {
      $question.height(h+'px');
      $question.addClass('show-actions');
    }
  }
});
