/**
 *
 * Article Methods
 *
 */

/**
 * Insert a article in the database (note: optional article properties not listed here)
 * @param {Object} article - the article being inserted
 * @param {string} article.userId - the id of the user the article belongs to
 * @param {string} article.title - the article's title
 */
Articles.submit = function (article) {

  var userId = article.userId, // at this stage, a userId is expected
      user = Users.findOne(userId);

  // ------------------------------ Checks ------------------------------ //
  // check that a title was provided
  if(!article.title)
    throw new Meteor.Error(602, 'Please fill in a title');

  if(!article.body)
    throw new Meteor.Error(602, 'Please fill in the content');
  // check that there are no articles with the same URL
  // if(!!article.url)
  //   Articles.checkForSameUrl(article.url, user);

  // ------------------------------ Properties ------------------------------ //
  var defaultProperties = {
    createdAt: new Date(),
    author: Users.getDisplayNameById(userId),
    upvotes: 0,
    downvotes: 0,
    commentCount: 0,
    clickCount: 0,
    viewCount: 0,
    baseScore: 0,
    score: 0,
    inactive: false,
    sticky: false,
    status: Articles.getDefaultStatus()
  };

  article = _.extend(defaultProperties, article);

  // if article is approved but doesn't have a postedAt date, give it a default date
  // note: pending articles get their postedAt date only once theyre approved
  if (article.status === Articles.config.STATUS_APPROVED && !article.postedAt)
    article.postedAt = new Date();

  // clean up article title
  article.title = Grudr.utils.cleanUp(article.title);

  // generate slug
  article.slug = Grudr.utils.slugify(article.title);

  // ------------------------------ Callbacks ------------------------------ //
  // run all article submit server callbacks on article object successively
  article = Grudr.callbacks.run("articleSubmit", article);

  // -------------------------------- Insert ------------------------------- //
  article._id = Articles.insert(article);

  // --------------------- Server-Side Async Callbacks --------------------- //
  // note: query for article to get fresh document with collection-hooks effects applied
  Grudr.callbacks.runAsync("articleSubmitAsync", Articles.findOne(article._id));

  return article;
};

/**
 * Edit a article in the database
 * @param {string} articleId – the ID of the article being edited
 * @param {Object} modifier – the modifier object
 * @param {Object} article - the current article object
 */
Articles.edit = function (articleId, modifier, article) {

  if (typeof article === "undefined") {
    article = Articles.findOne(articleId);
  }

  // ------------------------------ Callbacks ------------------------------ //
  modifier = Grudr.callbacks.run("articleEdit", modifier, article);

  // ------------------------------ Update ------------------------------ //
  Articles.update(articleId, modifier);

  // ------------------------------ Callbacks ------------------------------ //
  Grudr.callbacks.runAsync("articleEditAsync", Articles.findOne(articleId), article);

  // ------------------------------ After Update ------------------------------ //
  return Articles.findOne(articleId);
};

// ------------------------------------------------------------------------------------------- //
// ----------------------------------------- Methods ----------------------------------------- //
// ------------------------------------------------------------------------------------------- //

var articleViews = [];

Meteor.methods({

  /**
   * Meteor method for submitting a article from the client
   * @memberof Articles
   * @param {Object} article - the article being inserted
   */
  submitArticle: function(article){

    check(article, Articles.simpleSchema());

    // required properties:
    // title
    // optional properties
    // body
    // categories
    // thumbnailUrl

    // NOTE: the current user and the article author user might be two different users!
    var user = Meteor.user(),
        hasAdminRights = Users.is.admin(user),
        schema = Articles.simpleSchema()._schema;

    // ------------------------------ Checks ------------------------------ //
    // check that user can article
    if (!user || !Users.can.article(user))
      throw new Meteor.Error(601, 'You need to login or be invited to article new stories');

    // --------------------------- Rate Limiting -------------------------- //
    if(!hasAdminRights){

      var timeSinceLastArticle = Users.timeSinceLast(user, Articles),
        numberOfArticlesInPast24Hours = Users.numberOfItemsInPast24Hours(user, Articles),
        articleInterval = Math.abs(parseInt(Settings.get('articleInterval', 30))),
        maxArticlesPer24Hours = Math.abs(parseInt(Settings.get('maxArticlesPerDay', 30)));

      // check that user waits more than X seconds between articles
      if(timeSinceLastArticle < articleInterval)
        throw new Meteor.Error(604, 'Please wait' + (articleInterval-timeSinceLastArticle) + 'Seconds before articleing again');

      // check that the user doesn't article more than Y articles per day
      if(numberOfArticlesInPast24Hours > maxArticlesPer24Hours)
        throw new Meteor.Error(605, 'Sorry you cannot submit more than ' + maxArticlesPer24Hours + 'Articles per day');

    }

    // ------------------------------ Properties ------------------------------ //
    // admin-only properties
    // status
    // postedAt
    // userId
    // sticky (default to false)
    // go over each schema field and throw an error if it's not editable
    _.keys(article).forEach(function (fieldName) {

      var field = schema[fieldName];
      if (!Users.can.submitField(user, field)) {
        throw new Meteor.Error("disallowed_property", 'Disallowed property detected' + ": " + fieldName);
      }

    });

    // if no article status has been set, set it now
    if (!article.status) {
      article.status = Articles.getDefaultStatus(user);
    }

    // if no userId has been set, default to current user id
    if (!article.userId) {
      article.userId = user._id;
    }

    if (Meteor.isServer && this.connection) {
      article.userIP = this.connection.clientAddress;
      article.userAgent = this.connection.httpHeaders["user-agent"];
    }

    return Articles.submit(article);
  },

  /**
   * Meteor method for editing a article from the client
   * @memberof Articles
   * @param {Object} modifier - the update modifier
   * @param {Object} articleId - the id of the article being updated
   */
  editArticle: function (modifier, articleId) {

    // checking might be redundant because SimpleSchema already enforces the schema, but you never know
    check(modifier, Match.OneOf({$set: Articles.simpleSchema()}, {$unset: Object}, {$set: Articles.simpleSchema(), $unset: Object}));
    check(articleId, String);

    var user = Meteor.user(),
        article = Articles.findOne(articleId),
        schema = Articles.simpleSchema()._schema;

    // ------------------------------ Checks ------------------------------ //
    // check that user can edit document
    if (!user || !Users.can.edit(user, article)) {
      throw new Meteor.Error(601, 'Sorry you cannot edit this article');
    }

    // go over each field and throw an error if it's not editable
    // loop over each operation ($set, $unset, etc.)
    _.each(modifier, function (operation) {
      // loop over each property being operated on
      _.keys(operation).forEach(function (fieldName) {

        var field = schema[fieldName];
        if (!Users.can.editField(user, field, article)) {
          throw new Meteor.Error("disallowed_property", 'Disallowed property detected' + ": " + fieldName);
        }

      });
    });

    return Articles.edit(articleId, modifier, article);

  },

  approveArticle: function(articleId){

    check(articleId, String);
    
    var article = Articles.findOne(articleId);
    var now = new Date();

    if(Users.is.admin(Meteor.user())){

      var set = {status: Articles.config.STATUS_APPROVED};

      if (!article.postedAt) {
        set.postedAt = now;
      }
      
      Articles.update(article._id, {$set: set});
      Grudr.callbacks.runAsync("articleApproveAsync", article);

    }else{
      Bert.alert( 'You need to be an admin to do that.', 'danger', 'growl-top-right' );
    }
  },

  rejectArticle: function(articleId){

    check(articleId, String);
    var article = Articles.findOne(articleId);
    
    if(Users.is.admin(Meteor.user())){
      Articles.update(article._id, {$set: {status: Articles.config.STATUS_REJECTED}});
      Grudr.callbacks.runAsync("articleRejectAsync", article);
    } else{
      Bert.alert( 'You need to be an admin to do that.', 'danger', 'growl-top-right' );
    }
  },

  increaseArticleViews: function(articleId, sessionId){

    check(articleId, String);
    check(sessionId, Match.Any);

    this.unblock();

    // only let users increment a article's view counter once per session
    var view = {_id: articleId, userId: this.userId, sessionId: sessionId};

    if(_.where(articleViews, view).length === 0){
      articleViews.push(view);
      Articles.update(articleId, { $inc: { viewCount: 1 }});
    }
  },

  deleteArticleById: function(articleId) {

    check(articleId, String);
    var article = Articles.findOne({_id: articleId});

    if(!Meteor.userId() || !Users.can.editById(Meteor.userId(), article)) throw new Meteor.Error(606, 'You need permission to edit or delete a article');

    // decrement article count
    Users.update({_id: article.userId}, {$inc: {"grudr.articleCount": -1}});

    // delete article
    Articles.remove(articleId);
    Grudr.callbacks.runAsync("articleDeleteAsync", article);

  },

  checkForDuplicates: function (url) {
    Articles.checkForSameUrl(url);  
  }

});
