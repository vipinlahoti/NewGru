//////////////////////////////////////////////////////
// Collection Hooks                                 //
//////////////////////////////////////////////////////

Stories.before.insert(function (userId, doc) {
  // note: only actually sanitizes on the server
  doc.htmlBody = Grudr.utils.sanitize(marked(doc.body));
});

Stories.before.update(function (userId, doc, fieldNames, modifier) {
  // if body is being modified, update htmlBody too
  if (Meteor.isServer && modifier.$set && modifier.$set.body) {
    modifier.$set = modifier.$set || {};
    modifier.$set.htmlBody = Grudr.utils.sanitize(marked(modifier.$set.body));
  }
});

/**
 * Disallow $rename
 */
Stories.before.update(function (userId, doc, fieldNames, modifier) {
  if (!!modifier.$rename) {
    throw new Meteor.Error("illegal $rename operator detected!");
  }
});

//////////////////////////////////////////////////////
// Callbacks                                        //
//////////////////////////////////////////////////////

function afterStoryOperations (story) {

  var userId = story.userId;

  // increment story count
  Meteor.users.update({_id: userId}, {
    $inc:       {'grudr.storyCount': 1}
  });

  // update user
  Users.update(story.userId, {
    $inc:       {storyCount: 1},
    $set:       {lastStoryedAt: new Date()},
    $addToSet:  {storyers: userId}
  });

  return story;
}
Grudr.callbacks.add("storySubmitAsync", afterStoryOperations);
