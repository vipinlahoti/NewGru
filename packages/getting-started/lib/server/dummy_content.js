var toTitleCase = function (str) {
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

var createArticle = function (slug, postedAt, username, thumbnail) {
  var article = {
    postedAt: postedAt,
    body: Assets.getText("content/" + slug + ".md"),
    title: toTitleCase(slug.replace(/_/g, ' ')),
    dummySlug: slug,
    isDummy: true,
    userId: Meteor.users.findOne({username: username})._id
  };

  if (typeof thumbnail !== "undefined")
    article.thumbnailUrl = "/packages/grudr_getting-started/content/images/" + thumbnail;

  Articles.submit(article);
};

var createComment = function (slug, username, body, parentBody) {

  var comment = {
    articleId: Articles.findOne({dummySlug: slug})._id,
    userId: Meteor.users.findOne({username: username})._id,
    body: body,
    isDummy: true,
    disableNotifications: true
  };
  var parentComment = Comments.findOne({body: parentBody});
  if (parentComment)
    comment.parentCommentId = parentComment._id;

  Comments.submit(comment);
};

var createDummyUsers = function () {
  Accounts.createUser({
    username: 'Bruce',
    email: 'dummyuser1@grudrapp.org',
    profile: {
      isDummy: true
    }
  });
  Accounts.createUser({
    username: 'Arnold',
    email: 'dummyuser2@grudrapp.org',
    profile: {
      isDummy: true
    }
  });
  Accounts.createUser({
    username: 'Julia',
    email: 'dummyuser3@grudrapp.org',
    profile: {
      isDummy: true
    }
  });
};

var createDummyArticles = function () {

  createArticle("read_this_first", moment().toDate(), "Bruce", "grudr.png");

  createArticle("deploying_grudr", moment().subtract(10, 'minutes').toDate(), "Arnold");

  createArticle("customizing_grudr", moment().subtract(3, 'hours').toDate(), "Julia");

  createArticle("getting_help", moment().subtract(1, 'days').toDate(), "Bruce", "stackoverflow.png");

  createArticle("removing_getting_started_articles", moment().subtract(2, 'days').toDate(), "Julia");

};

var createDummyComments = function () {

  createComment("read_this_first", "Bruce", "What an awesome app!");

  createComment("deploying_grudr", "Arnold", "Deploy to da choppah!");
  createComment("deploying_grudr", "Julia", "Do you really need to say this all the time?", "Deploy to da choppah!");

  createComment("customizing_grudr", "Julia", "This is really cool!");

  createComment("removing_getting_started_articles", "Bruce", "Yippee ki-yay!");
  createComment("removing_getting_started_articles", "Arnold", "I'll be back.", "Yippee ki-yay!");

};

deleteDummyContent = function () {
  Meteor.users.remove({'profile.isDummy': true});
  Articles.remove({isDummy: true});
  Comments.remove({isDummy: true});
};

Meteor.methods({
  addGettingStartedContent: function () {
    if (Users.is.admin(Meteor.user())) {
      createDummyUsers();
      createDummyArticles();
      createDummyComments();
    }
  },
  removeGettingStartedContent: function () {
    if (Users.is.admin(Meteor.user()))
      deleteDummyContent();
  }
});

Meteor.startup(function () {
  // insert dummy content only if createDummyContent hasn't happened and there aren't any articles in the db
  if (!Events.findOne({name: 'createDummyContent'}) && !Articles.find().count()) {
    createDummyUsers();
    createDummyArticles();
    createDummyComments();
    Events.log({name: 'createDummyContent', unique: true, important: true});
  }
});
