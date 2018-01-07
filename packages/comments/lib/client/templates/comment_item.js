findQueueContainer = function($comment) {
  // go up and down the DOM until we find either A) a queue container or B) an unqueued comment
  $up = $comment.prevAll(".queue-container, .comment-displayed").first();
  $down = $comment.nextAll(".queue-container, .comment-displayed").first();
  $prev = $comment.prev();
  $next = $comment.next();
  $queuedAncestors = $comment.parents(".comment-queued");
  if ($queuedAncestors.exists()) {
    // console.log("----------- case 1: Queued Ancestor -----------");
    // 1.
    // our comment has one or more queued ancestor, so we look for the root-most
    // ancestor's queue container
    $container = $queuedAncestors.last().data("queue");
  } else if ($prev.hasClass("queue-container")) {
    // console.log("----------- case 2: Queued Brother -----------");
    // 2.
    // the comment just above is queued, so we use the same queue container as him
    $container = $prev.data("queue");
  } else if ($prev.find(".comment").last().hasClass("comment-queued")) {
    // console.log("----------- case 3: Queued Cousin -----------");
    // 3.
    // there are no queued comments going up on the same level,
    // but the bottom-most child of the comment directly above is queued
    $container = $prev.find(".comment").last().data("queue");
  } else if ($down.hasClass("queue-container")) {
    // console.log("----------- case 4: Queued Sister -----------");
    // 3.
    // the comment just below is queued, so we use the same queue container as him
    $container = $next.data("queue");
  } else if ($up.hasClass('comment-displayed') || !$up.exists()) {
    // console.log("----------- case 5: No Queue -----------");
    // 4.
    // we've found containers neither above or below, but
    // A) we've hit a displayed comment or
    // B) we've haven't found any comments (i.e. we're at the beginning of the list)
    // so we put our queue container just before the comment
    $container = $('<div class="queue-container"><ul></ul></div>').insertBefore($comment);
    $container.click(function(e){
      e.preventDefault();
      var links = $(this).find("a");
      links.each(function(){
        var target = $(this).attr("href");
        $(target).removeClass("comment-queued").addClass("comment-displayed");
        // add comment ID to global array to avoid queuing it again
        window.openedComments.push(target.substr(1));
      });
      // Grudr.utils.scrollPageTo(links.first().attr("href"));
      $(this).hide("slow").remove();
    });
  }
  // console.log("comment", $comment);
  // console.log("up", $up);
  // console.log("down", $down);
  // console.log("queuedAncestors", $queuedAncestors);
  // console.log("container", $container);
  return $container;
};

Template.comment_item.created = function() {
  // if comments are supposed to be queued, then queue this comment on create
  this.isQueued = window.queueComments;
  window.openedComments = [];
};

Template.comment_item.helpers({
  commentClass: function () {
    // if this comment was made by the article author
    if (Articles.findOne(this.articleId).userId == this.userId) {
      return 'author-comment';
    }
  },
  full_date: function(){
    return this.createdAt.toString();
  },
  commentListClass: function () {
    return !!Comments.find({parentCommentId: this._id}).count() ? "has-comments" : "no-comments";
  },
  childComments: function(){
    // return only child comments
    return Comments.find({parentCommentId: this._id});
  },
  author: function(){
    return Meteor.users.findOne(this.userId);
  },
  authorName: function(){
    var user = Meteor.users.findOne(this.userId);
    return Users.getDisplayName(user);
  },
  showChildComments: function(){
    // TODO: fix this
    // return Session.get('showChildComments');
    return true;
  },
  ago: function(){
    return this.createdAt;
  }
});

var handleVoteClick = function (meteorMethodName, eventName, e, instance) {
  e.preventDefault();
  e.stopImmediatePropagation(); // needed to prevent the handler running multiple times in nested comments
  if (!Meteor.user()){
    FlowRouter.go("signIn");
    Bert.alert( 'Please log in first', 'info', 'growl-top-right' );
  } else {
    Meteor.call(meteorMethodName, this._id, function(error, result){
      Events.track(eventName, {
        'commentId': instance.data._id,
        'articleId': instance.data.article,
        'authorId': instance.data.userId
      });
    });
  }
};

Template.comment_item.events({

});
