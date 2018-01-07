
//////////////////////////////////////////////////////
// Collection Hooks                                 //
//////////////////////////////////////////////////////

/**
 * Generate HTML body from Markdown on article insert
 */
Articles.before.insert(function (userId, doc) {
  if(!!doc.body)
    var htmlBody = Grudr.utils.sanitize(doc.body);
    // doc.htmlBody = htmlBody;
    doc.excerpt = Grudr.utils.trimHTML(htmlBody,30);

    //doc.htmlBody = Grudr.utils.sanitize(marked(doc.body));
});

/**
 * Generate HTML body and excerpt from Markdown when article body is updated
 */
Articles.before.update(function (userId, doc, fieldNames, modifier) {
  // if body is being modified or $unset, update htmlBody too
  if (Meteor.isServer && modifier.$set && modifier.$set.body) {
    var htmlBody = Grudr.utils.sanitize(modifier.$set.body);
    modifier.$set.htmlBody = htmlBody;
    modifier.$set.excerpt = Grudr.utils.trimHTML(htmlBody, 30);
    // modifier.$set.htmlBody = Grudr.utils.sanitize(marked(modifier.$set.body));
  }
  if (Meteor.isServer && modifier.$unset && (typeof modifier.$unset.body !== "undefined")) {
    modifier.$unset.htmlBody = "";
    modifier.$unset.excerpt = "";
  }
});

/**
 * Generate slug when article title is updated
 */
Articles.before.update(function (userId, doc, fieldNames, modifier) {
  // if title is being modified, update slug too
  if (Meteor.isServer && modifier.$set && modifier.$set.title) {
    modifier.$set.slug = Grudr.utils.slugify(modifier.$set.title);
  }
});

/**
 * Disallow $rename
 */
Articles.before.update(function (userId, doc, fieldNames, modifier) {
  if (!!modifier.$rename) {
    throw new Meteor.Error("illegal $rename operator detected!");
  }
});

//////////////////////////////////////////////////////
// Callbacks                                        //
//////////////////////////////////////////////////////

/**
 * Increment the user's article count and upvote the article
 */
function afterArticleSubmitOperations (article) {
  // console.log(this)
  var userId = article.userId;
  Meteor.users.update({_id: userId}, {$inc: {"grudr.articleCount": 1}});
  return article;
}
Grudr.callbacks.add("articleSubmitAsync", afterArticleSubmitOperations);

function upvoteOwnArticle (article) {
  var articleAuthor = Meteor.users.findOne(article.userId);
  Grudr.operateOnItem(Articles, article._id, articleAuthor, "upvote");
  return article;
}
Grudr.callbacks.add("articleSubmitAsync", upvoteOwnArticle);

function setPostedAt (article) {
  if (article.isApproved() && !article.postedAt) {
    Articles.update(article._id, {$set: {postedAt: new Date()}});
  }
}
Grudr.callbacks.add("articleEditAsync", setPostedAt);
