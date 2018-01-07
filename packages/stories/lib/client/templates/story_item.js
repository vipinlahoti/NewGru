findQueueContainer = function($story) {
  // go up and down the DOM until we find either A) a queue container or B) an unqueued story
  $up = $story.prevAll(".queue-container, .story-displayed").first();
  $down = $story.nextAll(".queue-container, .story-displayed").first();
  $prev = $story.prev();
  $next = $story.next();
  $queuedAncestors = $story.parents(".story-queued");
  if ($queuedAncestors.exists()) {
    // console.log("----------- case 1: Queued Ancestor -----------");
    // 1.
    // our story has one or more queued ancestor, so we look for the root-most
    // ancestor's queue container
    $container = $queuedAncestors.last().data("queue");
  } else if ($prev.hasClass("queue-container")) {
    // console.log("----------- case 2: Queued Brother -----------");
    // 2.
    // the story just above is queued, so we use the same queue container as him
    $container = $prev.data("queue");
  } else if ($prev.find(".story").last().hasClass("story-queued")) {
    // console.log("----------- case 3: Queued Cousin -----------");
    // 3.
    // there are no queued stories going up on the same level,
    // but the bottom-most child of the story directly above is queued
    $container = $prev.find(".story").last().data("queue");
  } else if ($down.hasClass("queue-container")) {
    // console.log("----------- case 4: Queued Sister -----------");
    // 3.
    // the story just below is queued, so we use the same queue container as him
    $container = $next.data("queue");
  } else if ($up.hasClass('story-displayed') || !$up.exists()) {
    // console.log("----------- case 5: No Queue -----------");
    // 4.
    // we've found containers neither above or below, but
    // A) we've hit a displayed story or
    // B) we've haven't found any stories (i.e. we're at the beginning of the list)
    // so we put our queue container just before the story
    $container = $('<div class="queue-container"><ul></ul></div>').insertBefore($story);
    $container.click(function(e){
      e.preventDefault();
      var links = $(this).find("a");
      links.each(function(){
        var target = $(this).attr("href");
        $(target).removeClass("story-queued").addClass("story-displayed");
        // add story ID to global array to avoid queuing it again
        window.openedStories.push(target.substr(1));
      });
      // Grudr.utils.scrollPageTo(links.first().attr("href"));
      $(this).hide("slow").remove();
    });
  }
  // console.log("story", $story);
  // console.log("up", $up);
  // console.log("down", $down);
  // console.log("queuedAncestors", $queuedAncestors);
  // console.log("container", $container);
  return $container;
};

Template.story_item.created = function() {
  // if stories are supposed to be queued, then queue this story on create
  this.isQueued = window.queueStories;
  window.openedStories = [];
};

Template.story_item.helpers({
  storyClass: function () {
    // if this story was made by the user author
    if (Users.findOne(this.userId).userId == this.userId) {
      return 'author-story';
    }
  },
  full_date: function(){
    return this.createdAt.toString();
  },
  storyListClass: function () {
    return !!Stories.find({parentStoryId: this._id}).count() ? "has-stories" : "no-stories";
  },
  childStories: function(){
    // return only child stories
    return Stories.find({parentStoryId: this._id});
  },
  author: function(){
    return Meteor.users.findOne(this.userId);
  },
  authorName: function(){
    var user = Meteor.users.findOne(this.userId);
    return Users.getDisplayName(user);
  },
  showChildStories: function(){
    // TODO: fix this
    // return Session.get('showChildStories');
    return true;
  },
  ago: function(){
    return this.createdAt;
  }
});

var handleVoteClick = function (meteorMethodName, eventName, e, instance) {
  e.preventDefault();
  e.stopImmediatePropagation(); // needed to prevent the handler running multiple times in nested stories
  if (!Meteor.user()){
    FlowRouter.go("signIn");
    Bert.alert( 'Please log in first', 'info', 'growl-top-right' );
  } else {
    Meteor.call(meteorMethodName, this._id, function(error, result){
      Events.track(eventName, {
        'storyId': instance.data._id,
        'userId': instance.data.user,
        'authorId': instance.data.userId
      });
    });
  }
};

Template.story_item.events({

});
