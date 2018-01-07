findQueueContainer = function($answer) {
  // go up and down the DOM until we find either A) a queue container or B) an unqueued answer
  $up = $answer.prevAll(".queue-container, .answer-displayed").first();
  $down = $answer.nextAll(".queue-container, .answer-displayed").first();
  $prev = $answer.prev();
  $next = $answer.next();
  $queuedAncestors = $answer.parents(".answer-queued");
  if ($queuedAncestors.exists()) {
    // console.log("----------- case 1: Queued Ancestor -----------");
    // 1.
    // our answer has one or more queued ancestor, so we look for the root-most
    // ancestor's queue container
    $container = $queuedAncestors.last().data("queue");
  } else if ($prev.hasClass("queue-container")) {
    // console.log("----------- case 2: Queued Brother -----------");
    // 2.
    // the answer just above is queued, so we use the same queue container as him
    $container = $prev.data("queue");
  } else if ($prev.find(".answer").last().hasClass("answer-queued")) {
    // console.log("----------- case 3: Queued Cousin -----------");
    // 3.
    // there are no queued answers going up on the same level,
    // but the bottom-most child of the answer directly above is queued
    $container = $prev.find(".answer").last().data("queue");
  } else if ($down.hasClass("queue-container")) {
    // console.log("----------- case 4: Queued Sister -----------");
    // 3.
    // the answer just below is queued, so we use the same queue container as him
    $container = $next.data("queue");
  } else if ($up.hasClass('answer-displayed') || !$up.exists()) {
    // console.log("----------- case 5: No Queue -----------");
    // 4.
    // we've found containers neither above or below, but
    // A) we've hit a displayed answer or
    // B) we've haven't found any answers (i.e. we're at the beginning of the list)
    // so we put our queue container just before the answer
    $container = $('<div class="queue-container"><ul></ul></div>').insertBefore($answer);
    $container.click(function(e){
      e.preventDefault();
      var links = $(this).find("a");
      links.each(function(){
        var target = $(this).attr("href");
        $(target).removeClass("answer-queued").addClass("answer-displayed");
        // add answer ID to global array to avoid queuing it again
        window.openedAnswers.push(target.substr(1));
      });
      // Grudr.utils.scrollPageTo(links.first().attr("href"));
      $(this).hide("slow").remove();
    });
  }
  // console.log("answer", $answer);
  // console.log("up", $up);
  // console.log("down", $down);
  // console.log("queuedAncestors", $queuedAncestors);
  // console.log("container", $container);
  return $container;
};

Template.answer_item.created = function() {
  // if answers are supposed to be queued, then queue this answer on create
  this.isQueued = window.queueAnswers;
  window.openedAnswers = [];
};

Template.answer_item.helpers({
  answerClass: function () {
    // if this answer was made by the question author
    if (Questions.findOne(this.questionId).userId == this.userId) {
      return 'author-answer';
    }
  },
  full_date: function(){
    return this.createdAt.toString();
  },
  answerListClass: function () {
    return !!Answers.find({parentAnswerId: this._id}).count() ? "has-answers" : "no-answers";
  },
  author: function(){
    return Meteor.users.findOne(this.userId);
  },
  authorName: function(){
    var user = Meteor.users.findOne(this.userId);
    return Users.getDisplayName(user);
  },
  ago: function(){
    return this.createdAt;
  },
  upvoted: function(){
    return Meteor.user() && _.include(this.upvoters, Meteor.user()._id);
  },
  downvoted: function(){
    return Meteor.user() && _.include(this.downvoters, Meteor.user()._id);
  },
  pointsUnitDisplayText: function(){
    return this.upvotes === 1 ? 'Point' : 'Points';
  }
});

var handleVoteClick = function (meteorMethodName, eventName, e, instance) {
  e.preventDefault();
  e.stopImmediatePropagation(); // needed to prevent the handler running multiple times in nested answers
  if (!Meteor.user()){
    FlowRouter.go("signIn");
    Bert.alert( 'Please log in first', 'info', 'growl-top-right' );
  } else {
    Meteor.call(meteorMethodName, this._id, function(error, result){
      Events.track(eventName, {
        'answerId': instance.data._id,
        'questionId': instance.data.question,
        'authorId': instance.data.userId
      });
    });
  }
};

Template.answer_item.events({
  'click .not-upvoted .upvote': _.partial(handleVoteClick, 'upvoteAnswer', 'question upvoted'),
  'click .upvoted .upvote': _.partial(handleVoteClick, 'cancelUpvoteAnswer', 'question upvote cancelled'),
  'click .not-downvoted .downvote': _.partial(handleVoteClick, 'downvoteAnswer', 'question downvoted'),
  'click .downvoted .downvote': _.partial(handleVoteClick, 'cancelDownvoteAnswer', 'question downvote cancelled')
});
