// note: using collection helpers here is probably a bad idea, 
// because they'll throw an error when the user is undefined

/**
 * Grudr permissions
 * @namespace Users.can
 */
Users.can = {};

/**
 * Check if a given user has access to view articles
 * @param {Object} user
 */
Users.can.view = function (user) {
  if (Settings.get('requireViewInvite', false)) {

    if (Meteor.isClient) {
      // on client only, default to the current user
      user = (typeof user === 'undefined') ? Meteor.user() : user;
    }

    return (!!user && (Users.is.admin(user) || Users.is.invited(user)));
  }
  return true;
};
Users.helpers({canView: function () {return Users.can.view(this);}});

/**
 * Check if a given user can view a specific article
 * @param {Object} user
 * @param {Object} article
 */
Users.can.viewById = function (userId) {
  // if an invite is required to view, run permission check, else return true
  if (Settings.get('requireViewInvite', false)) {
    return !!userId ? Users.can.view(Meteor.users.findOne(userId)) : false;
  }
  return true;
};
Users.helpers({canViewById: function () {return Users.can.viewById(this);}});

/**
 * Check if a given user can view a specific article
 * @param {Object} user - can be undefined!
 * @param {Object} article
 */
Users.can.viewArticle = function (user, article) {

  if (Users.is.admin(user)) {
    return true;
  } else {

    switch (article.status) {

      case Articles.config.STATUS_APPROVED:
        return Users.can.view(user);
      
      case Articles.config.STATUS_REJECTED:
      case Articles.config.STATUS_SPAM:
      case Articles.config.STATUS_PENDING: 
        return Users.can.view(user) && Users.is.owner(user, article);
      
      case Articles.config.STATUS_DELETED:
        return false;
    
    }
  }
}
Users.helpers({canViewArticle: function () {return Users.can.viewArticle(this, article);}});

/**
 * Check if a given user has permission to submit new articles
 * @param {Object} user
 */
Users.can.article = function (user) {
  user = (typeof user === 'undefined') ? Meteor.user() : user;

  if (!user) { // no account
    return false;
  } 

  if (user._isAdmin()) { //admin
    return true;
  } 

  if (Settings.get('requireArticleInvite', false)) { // invite required?
    if (user.isInvited()) { // invited user
      return true;
    } else { // not invited
      return false;
    }
  } else {
    return true;
  }
};
Users.helpers({canArticle: function () {return Users.can.article(this);}});

/**
 * Check if a given user has permission to comment (same as articleing for now)
 * @param {Object} user
 */
Users.can.comment = function (user) {
  return Users.can.article(user);
};
Users.helpers({canComment: function () {return Users.can.comment(this);}});


/**
 * Check if a given user has permission to comment (same as articleing for now)
 * @param {Object} user
 */
Users.can.story = function (user) {
  // return Users.can.user(user);
};
Users.helpers({canStory: function () {return Users.can.story(this);}});


/**
 * Check if a given user can view a specific question
 * @param {Object} user - can be undefined!
 * @param {Object} question
 */
Users.can.viewQuestion = function (user, question) {

  if (Users.is.admin(user)) {
    return true;
  } else {

    switch (question.status) {

      case Questions.config.STATUS_APPROVED:
        return Users.can.view(user);
      
      case Questions.config.STATUS_REJECTED:
      case Questions.config.STATUS_SPAM:
      case Questions.config.STATUS_PENDING: 
        return Users.can.view(user) && Users.is.owner(user, question);
      
      case Questions.config.STATUS_DELETED:
        return false;
    
    }
  }
}
Users.helpers({canViewQuestion: function () {return Users.can.viewQuestion(this, question);}});

/**
 * Check if a given user has permission to submit new questions
 * @param {Object} user
 */
Users.can.question = function (user) {
  user = (typeof user === 'undefined') ? Meteor.user() : user;

  if (!user) { // no account
    return false;
  } 

  if (user._isAdmin()) { //admin
    return true;
  } 

  if (Settings.get('requireQuestionInvite', false)) { // invite required?
    if (user.isInvited()) { // invited user
      return true;
    } else { // not invited
      return false;
    }
  } else {
    return true;
  }
};
Users.helpers({canQuestion: function () {return Users.can.question(this);}});

/**
 * Check if a given user has permission to answer (same as articleing for now)
 * @param {Object} user
 */
Users.can.answer = function (user) {
  return Users.can.article(user);
};
Users.helpers({canAnswer: function () {return Users.can.answer(this);}});

/**
 * Check if a user has permission to vote (same as articleing for now)
 * @param {Object} user
 */
Users.can.vote = function (user) {
  return Users.can.article(user);
};
Users.helpers({canVote: function () {return Users.can.vote(this);}});

/**
 * Check if a user can edit a document
 * @param {Object} user - The user performing the action
 * @param {Object} document - The document being edited
 */
Users.can.edit = function (user, document) {
  user = (typeof user === 'undefined') ? Meteor.user() : user;

  if (!user || !document) {
    return false;
  }

  var adminCheck = Users.is.admin(user);
  var ownerCheck = Users.is.owner(user, document);

  return adminCheck || ownerCheck;
};
Users.helpers({canEdit: function (document) {return Users.can.edit(this, document);}});

Users.can.editById = function (userId, document) {
  var user = Meteor.users.findOne(userId);
  return Users.can.edit(user, document);
};
Users.helpers({canEditById: function (document) {return Users.can.editById(this, document);}});

/**
 * Check if a user can submit a field
 * @param {Object} user - The user performing the action
 * @param {Object} field - The field being edited or inserted
 */
Users.can.submitField = function (user, field) {

  if (!field.editableBy || !user) {
    return false;
  }

  var adminCheck = _.contains(field.editableBy, "admin") && Users.is.admin(user); // is the field editable by admins?
  var memberCheck = _.contains(field.editableBy, "member"); // is the field editable by regular users?

  return adminCheck || memberCheck;

};
Users.helpers({canSubmitField: function (field) {return Users.can.submitField(this, field);}});

/** @function
 * Check if a user can edit a field – for now, identical to Users.can.submitField
 * @param {Object} user - The user performing the action
 * @param {Object} field - The field being edited or inserted
 */
Users.can.editField = Users.can.submitField;

Users.can.invite = function (user) {
  return Users.is.invited(user) || Users.is.admin(user);
};
Users.helpers({canInvite: function () {return Users.can.invite(this);}});

