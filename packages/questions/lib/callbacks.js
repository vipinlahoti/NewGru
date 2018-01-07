
//////////////////////////////////////////////////////
// Collection Hooks                                 //
//////////////////////////////////////////////////////

/**
 * Generate HTML body from Markdown on question insert
 */
Questions.before.insert(function (userId, doc) {
  if(!!doc.body)
    // doc.htmlBody = Grudr.utils.sanitize(marked(doc.body));
    var htmlBody = Grudr.utils.sanitize(doc.body);
    // doc.htmlBody = htmlBody;
    doc.excerpt = Grudr.utils.trimHTML(htmlBody,20);
});

/**
 * Generate HTML body from Markdown when question body is updated
 */
Questions.before.update(function (userId, doc, fieldNames, modifier) {
  // if body is being modified or $unset, update htmlBody too
  if (Meteor.isServer && modifier.$set && modifier.$set.body) {
    var htmlBody = Grudr.utils.sanitize(modifier.$set.body);
    modifier.$set.htmlBody = htmlBody;
    modifier.$set.excerpt = Grudr.utils.trimHTML(htmlBody, 20);
    // modifier.$set.htmlBody = Grudr.utils.sanitize(marked(modifier.$set.body));
  }
  if (Meteor.isServer && modifier.$unset && (typeof modifier.$unset.body !== "undefined")) {
    modifier.$unset.htmlBody = "";
    modifier.$unset.excerpt = "";
  }
});

/**
 * Generate slug when question body is updated
 */
Questions.before.update(function (userId, doc, fieldNames, modifier) {
  // if body is being modified, update slug too
  if (Meteor.isServer && modifier.$set && modifier.$set.body) {
    modifier.$set.slug = Grudr.utils.slugify(modifier.$set.body);
  }
});

/**
 * Disallow $rename
 */
Questions.before.update(function (userId, doc, fieldNames, modifier) {
  if (!!modifier.$rename) {
    throw new Meteor.Error("illegal $rename operator detected!");
  }
});

//////////////////////////////////////////////////////
// Callbacks                                        //
//////////////////////////////////////////////////////

/**
 * Increment the user's question count and upvote the question
 */
function afterQuestionSubmitOperations (question) {
  // console.log(this)
  var userId = question.userId;
  Meteor.users.update({_id: userId}, {$inc: {"grudr.questionCount": 1}});
  return question;
}
Grudr.callbacks.add("questionSubmitAsync", afterQuestionSubmitOperations);

function setPostedAt (question) {
  if (question.isApproved() && !question.postedAt) {
    Questions.update(question._id, {$set: {postedAt: new Date()}});
  }
}
Grudr.callbacks.add("questionEditAsync", setPostedAt);
