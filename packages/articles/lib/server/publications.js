Articles._ensureIndex({"status": 1, "postedAt": 1});

// Publish a list of articles

Meteor.publish('articlesList', function(terms) {

  this.unblock();
  
  if (this.userId) { // add currentUserId to terms if a user is logged in
    terms.currentUserId = this.userId; 
  }

  if(Users.can.viewById(this.userId)){
    var parameters = Articles.parameters.get(terms),
        articles = Articles.find(parameters.find, parameters.options);

    return articles;
  }
  return [];
});

// Publish all the users that have posted the currently displayed list of articles
// plus the commenters for each article

Meteor.publish('articlesListUsers', function(terms) {
  
  this.unblock();
  
  if (this.userId) {
    terms.currentUserId = this.userId; // add userId to terms
  }

  if(Users.can.viewById(this.userId)){
    var parameters = Articles.parameters.get(terms),
        articles = Articles.find(parameters.find, parameters.options),
        userIds = _.pluck(articles.fetch(), 'userId');

    // for each article, add first four commenter's userIds to userIds array
    articles.forEach(function (article) {
      userIds = userIds.concat(_.first(article.commenters,4));
    });

    userIds = _.unique(userIds);

    return Meteor.users.find({_id: {$in: userIds}}, {fields: Users.pubsub.avatarProperties, multi: true});
  }
  return [];
});

// Publish a single article

Meteor.publish('singleArticle', function(articleId) {

  check(articleId, String);
  this.unblock();

  var user = Meteor.users.findOne(this.userId);
  var article = Articles.findOne(articleId);

  if (Users.can.viewArticle(user, article)){
    return Articles.find(articleId);
  } else {
    return [];
  }

});

// Publish author of the current article, authors of its comments, and upvoters of the article

Meteor.publish('articleUsers', function(articleId) {

  check(articleId, String);
  this.unblock();

  if (Users.can.viewById(this.userId)){
    // publish article author and article commenters
    var article = Articles.findOne(articleId);
    var users = [];

    if (article) {

      users.push(article.userId); // publish article author's ID

      // get IDs from all commenters on the article
      var comments = Comments.find({articleId: article._id}).fetch();
      if (comments.length) {
        users = users.concat(_.pluck(comments, "userId"));
      }

      // publish upvoters
      if (article.upvoters && article.upvoters.length) {
        users = users.concat(article.upvoters);
      }

      // publish downvoters
      if (article.downvoters && article.downvoters.length) {
        users = users.concat(article.downvoters);
      }

    }

    // remove any duplicate IDs
    users = _.unique(users);

    return Meteor.users.find({_id: {$in: users}}, {fields: Users.pubsub.publicProperties});
  }
  return [];
});

Slingshot.fileRestrictions("grudrArticlesThumbnails", {
  allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
  maxSize: 5 * 1920 * 1200 // 10 MB (use null for unlimited).
})

Slingshot.createDirective("grudrArticlesThumbnails", Slingshot.S3Storage, {
  AWSAccessKeyId: "AKIAI4EUJDYBMCU3WRBA",
  AWSSecretAccessKey: "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",
  bucket: "grudr",
  acl: "public-read",
  region: "ap-south-1",

  authorize: function () {
    if (!this.userId) {
      var message = "Please login before posting images";
      throw new Meteor.Error("Login Required", message);
    }

    return true;
  },

  key: function (file) {
    var currentUserId = Meteor.user().emails[0].address;
    return currentUserId + "/" + file.name;
  }

});
