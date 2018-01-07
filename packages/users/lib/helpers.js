////////////////////
//  User Getters  //
////////////////////

/**
 * Get a user's username (unique, no special characters or spaces)
 * @param {Object} user
 */
Users.getUserName = function (user) {
  try{
    if (user.username)
      return user.username;
    if (user && user.services && user.services.twitter && user.services.twitter.screenName)
      return user.services.twitter.screenName;
  }
  catch (error){
    console.log(error);
    return null;
  }
};
Users.helpers({getUserName: function () {return Users.getUserName(this);}});
Users.getUserNameById = function (userId) {return Users.getUserName(Meteor.users.findOne(userId))};

/**
 * Get a user's display name (not unique, can take special characters and spaces)
 * @param {Object} user
 */
Users.getDisplayName = function (user) {
  if (typeof user === "undefined") {
    return "";
  } else {
    return (user.grudr && user.grudr.displayName) ? user.grudr.displayName : Users.getUserName(user);
  }
};
Users.helpers({getDisplayName: function () {return Users.getDisplayName(this);}});
Users.getDisplayNameById = function (userId) {return Users.getDisplayName(Meteor.users.findOne(userId));};

/**
 * Get a user's profile URL
 * @param {Object} user (note: we only actually need either the _id or slug properties)
 * @param {Boolean} isAbsolute
 */
Users.getProfileUrl = function (user, isAbsolute) {
  if (typeof user === "undefined") {
    return "";
  }
  var isAbsolute = typeof isAbsolute === "undefined" ? false : isAbsolute; // default to false
  var prefix = isAbsolute ? Grudr.utils.getSiteUrl().slice(0,-1) : "";
  return prefix + FlowRouter.path("userProfile", {_idOrSlug: user.grudr && user.grudr.slug || user._id});
};
Users.helpers({getProfileUrl: function (isAbsolute) {return Users.getProfileUrl(this, isAbsolute);}});

/**
 * Get a user's Twitter name
 * @param {Object} user
 */
Users.getTwitterName = function (user) {
  // return twitter name provided by user, or else the one used for twitter login
  if (typeof user !== "undefined") {
    if (Grudr.utils.checkNested(user, 'profile', 'twitter')) {
      return user.profile.twitter;
    } else if(Grudr.utils.checkNested(user, 'services', 'twitter', 'screenName')) {
      return user.services.twitter.screenName;
    }
  }
  return null;
};
Users.helpers({getTwitterName: function () {return Users.getTwitterName(this);}});
Users.getTwitterNameById = function (userId) {return Users.getTwitterName(Meteor.users.findOne(userId));};

/**
 * Get a user's GitHub name
 * @param {Object} user
 */
Users.getGitHubName = function (user) {
  // return twitter name provided by user, or else the one used for twitter login
  if(Grudr.utils.checkNested(user, 'profile', 'github')){
    return user.profile.github;
  }else if(Grudr.utils.checkNested(user, 'services', 'github', 'screenName')){ // TODO: double-check this with GitHub login
    return user.services.github.screenName;
  }
  return null;
};
Users.helpers({getGitHubName: function () {return Users.getGitHubName(this);}});
Users.getGitHubNameById = function (userId) {return Users.getGitHubName(Meteor.users.findOne(userId));};

/**
 * Get a user's email
 * @param {Object} user
 */
Users.getEmail = function (user) {
  if(user.grudr && user.grudr.email){
    return user.grudr.email;
  }else{
    return null;
  }
};
Users.helpers({getEmail: function () {return Users.getEmail(this);}});
Users.getEmailById = function (userId) {return Users.getEmail(Meteor.users.findOne(userId));};

/**
 * Get a user's email hash
 * @param {Object} user
 */
Users.getEmailHash = function (user) {
  // has to be this way to work with Gravatar
  return Gravatar.hash(Users.getEmail(user));
};
Users.helpers({getEmailHash: function () {return Users.getEmailHash(this);}});
Users.getEmailHashById = function (userId) {return Users.getEmailHash(Meteor.users.findOne(userId));};

/**
 * Check if a user's profile is complete
 * @param {Object} user
 */
Users.userProfileComplete = function (user) {
  for (var i = 0; i < Grudr.callbacks.profileCompletedChecks.length; i++) {
    if (!Grudr.callbacks.profileCompletedChecks[i](user)) {
      return false;
    }
  }
  return true;
};
Users.helpers({userProfileComplete: function () {return Users.userProfileComplete(this);}});
Users.userProfileCompleteById = function (userId) {return Users.userProfileComplete(Meteor.users.findOne(userId));};

/**
 * Get a user setting
 * @param {Object} user
 * @param {String} settingName
 * @param {Object} defaultValue
 */
Users.getSetting = function (user, settingName, defaultValue) {
  user = user || Meteor.user();
  defaultValue = defaultValue || null;

  // all settings should be in the user.grudr namespace, so add "grudr." if needed
  settingName = settingName.slice(0,10) === "grudr." ? settingName : "grudr." + settingName;

  if (user.grudr) {
    var settingValue = this.getProperty(user, settingName);
    return (settingValue === null) ? defaultValue : settingValue;
  } else {
    return defaultValue;
  }
};
Users.helpers({getSetting: function (settingName, defaultValue) {return Users.getSetting(this, settingName, defaultValue);}});

/**
 * Set a user setting
 * @param {Object} user
 * @param {String} settingName
 * @param {Object} defaultValue
 */
Users.setSetting = function (user, settingName, value) {
  if (user) {

    // all settings should be in the user.grudr namespace, so add "grudr." if needed
    var field = settingName.slice(0,10) === "grudr." ? settingName : "grudr." + settingName;

    var modifier = {$set: {}};
    modifier.$set[field] = value;
    Users.update(user._id, modifier);

  }
};
Users.helpers({setSetting: function () {return Users.setSetting(this);}});

/**
 * Check if a user has upvoted a article
 * @param {Object} user
 * @param {Object} article
 */
Users.hasUpvoted = function (user, article) {
  return user && _.include(article.upvoters, user._id);
};
Users.helpers({hasUpvoted: function (article) {return Users.hasUpvoted(this, article);}});

/**
 * Check if a user has downvoted a article
 * @param {Object} user
 * @param {Object} article
 */
Users.hasDownvoted = function (user, article) {
  return user && _.include(article.downvoters, user._id);
};
Users.helpers({hasDownvoted: function (article) {return Users.hasDownvoted(this, article);}});

///////////////////
// Other Helpers //
///////////////////

Users.findLast = function (user, collection) {
  return collection.findOne({userId: user._id}, {sort: {createdAt: -1}});
};

Users.timeSinceLast = function (user, collection){
  var now = new Date().getTime();
  var last = this.findLast(user, collection);
  if(!last)
    return 999; // if this is the user's first article, question, answer or comment ever, stop here
  return Math.abs(Math.floor((now-last.createdAt)/1000));
};

Users.numberOfItemsInPast24Hours = function (user, collection) {
  var mNow = moment();
  var items = collection.find({
    userId: user._id,
    createdAt: {
      $gte: mNow.subtract(24, 'hours').toDate()
    }
  });
  return items.count();
};

Users.getProperty = function (object, property) {
  // recursive function to get nested properties
  var array = property.split('.');
  if(array.length > 1){
    var parent = array.shift();
    // if our property is not at this level, call function again one level deeper if we can go deeper, else return null
    return (typeof object[parent] === "undefined") ? null : this.getProperty(object[parent], array.join('.'));
  }else{
    // else return property
    return object[array[0]];
  }
};

Users.updateAdmin = function (userId, admin) {
  Users.update(userId, {$set: {isAdmin: admin}});
};

Users.adminUsers = function (options) {
  return this.find({isAdmin : true}, options).fetch();
};

Users.getCurrentUserEmail = function () {
  return Meteor.user() ? Users.getEmail(Meteor.user()) : '';
};

Users.findByEmail = function (email) {
  return Meteor.users.findOne({"grudr.email": email});
};


/**
 * @method Users.getRequiredFields
 * Get a list of all fields required for a profile to be complete.
 */
Users.getRequiredFields = function () {
  var schema = Users.simpleSchema()._schema;
  var fields = _.filter(_.keys(schema), function (fieldName) {
    var field = schema[fieldName];
    return !!field.required;
  });
  return fields;
};

/**
 * Check if the user has completed their profile.
 * @param {Object} user
 */
Users.hasCompletedProfile = function (user) {
  return _.every(Users.getRequiredFields(), function (fieldName) {
    return !!Grudr.getNestedProperty(user, fieldName);
  });
};
Users.helpers({hasCompletedProfile: function () {return Users.hasCompletedProfile(this);}});
Users.hasCompletedProfileById = function (userId) {return Users.hasCompletedProfile(Meteor.users.findOne(userId));};

/**
 * Check if the user has upvoted an item before
 * @param {Object} user
 * @param {Object} item
 */
Users.hasUpvotedItem = function (user, item) {
  return item.upvoters && item.upvoters.indexOf(user._id) !== -1;
};
Users.helpers({hasUpvotedItem: function (item) {return Users.hasUpvotedItem(this, item);}});

/**
 * Check if the user has downvoted an item before
 * @param {Object} user
 * @param {Object} item
 */
Users.hasDownvotedItem = function (user, item) {
  return item.downvoters && item.downvoters.indexOf(user._id) !== -1;
};
Users.helpers({hasDownvotedItem: function (item) {return Users.hasDownvotedItem(this, item);}});
