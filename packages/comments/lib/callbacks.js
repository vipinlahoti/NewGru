//////////////////////////////////////////////////////
// Collection Hooks                                 //
//////////////////////////////////////////////////////

Comments.before.insert(function (userId, doc) {
  // note: only actually sanitizes on the server
  doc.htmlBody = Grudr.utils.sanitize(marked(doc.body));
});

Comments.before.update(function (userId, doc, fieldNames, modifier) {
  // if body is being modified, update htmlBody too
  if (Meteor.isServer && modifier.$set && modifier.$set.body) {
    modifier.$set = modifier.$set || {};
    modifier.$set.htmlBody = Grudr.utils.sanitize(marked(modifier.$set.body));
  }
});

/**
 * Disallow $rename
 */
Comments.before.update(function (userId, doc, fieldNames, modifier) {
  if (!!modifier.$rename) {
    throw new Meteor.Error("illegal $rename operator detected!");
  }
});

//////////////////////////////////////////////////////
// Callbacks                                        //
//////////////////////////////////////////////////////

function afterCommentOperations (comment) {

  var userId = comment.userId;

  // increment comment count
  Meteor.users.update({_id: userId}, {
    $inc:       {'grudr.commentCount': 1}
  });

  // update article
  Articles.update(comment.articleId, {
    $inc:       {commentCount: 1},
    $set:       {lastCommentedAt: new Date()},
    $addToSet:  {commenters: userId}
  });

  return comment;
}
Grudr.callbacks.add("commentSubmitAsync", afterCommentOperations);
