Comments._ensureIndex({postId: 1});
Comments._ensureIndex({parentCommentId: 1});

// Publish a list of comments

Meteor.publish('commentsList', function(terms) {
  
  this.unblock();

  if (this.userId) { // add currentUserId to terms if a user is logged in
    terms.currentUserId = this.userId; 
  }
  
  if(Users.can.viewById(this.userId)){
    var parameters = Comments.parameters.get(terms);
    var comments = Comments.find(parameters.find, parameters.options);
  
    // if there are comments, find out which posts were commented on
    var commentedPostIds = comments.count() ? _.pluck(comments.fetch(), 'postId') : [];
    return [
      comments,
      Posts.find({_id: {$in: commentedPostIds}})
    ];
  }
});

// Publish a single comment

Meteor.publish('singleCommentAndChildren', function(commentId) {

  check(commentId, String);

  this.unblock();
  
  if(Users.can.viewById(this.userId)){
    // publish both current comment and child comments
    var commentIds = [commentId];
    var childCommentIds = _.pluck(Comments.find({parentCommentId: commentId}, {fields: {_id: 1}}).fetch(), '_id');
    commentIds = commentIds.concat(childCommentIds);
    return Comments.find({_id: {$in: commentIds}}, {sort: {score: -1, postedAt: -1}});
  }
  return [];
});

// Publish the post related to the current comment

Meteor.publish('commentPost', function(commentId) {

  check(commentId, String);

  this.unblock();

  if(Users.can.viewById(this.userId)){
    var comment = Comments.findOne(commentId);
    return Posts.find({_id: comment && comment.postId});
  }
  return [];
});

// Publish author of the current comment, and author of the post related to the current comment

Meteor.publish('commentUsers', function(commentId) {

  check(commentId, String);

  this.unblock();
    
  var userIds = [];

  if(Users.can.viewById(this.userId)){

    var comment = Comments.findOne(commentId);

    if (!!comment) {
      userIds.push(comment.userId);

      var post = Posts.findOne(comment.postId);
      if (!!post) {
        userIds.push(post.userId);
      }

      return Meteor.users.find({_id: {$in: userIds}}, {fields: Users.pubsub.publicProperties});
    
    }

  }

  return [];

});
