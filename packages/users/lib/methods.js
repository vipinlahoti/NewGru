var completeUserProfile = function (modifier, userId, user) {

  Users.update(userId, modifier);

  Grudr.callbacks.runAsync("profileCompletedAsync", Users.findOne(userId));

  return Users.findOne(userId);

};

Meteor.methods({
  completeUserProfile: function (modifier, userId) {
    
    check(modifier, Match.OneOf({$set: Object}, {$unset: Object}, {$set: Object, $unset: Object}));
    check(userId, String);

    var currentUser = Meteor.user(),
        user = Users.findOne(userId),
        schema = Users.simpleSchema()._schema;

    // ------------------------------ Checks ------------------------------ //

    // check that user can edit document
    if (!user || !Users.can.edit(currentUser, user)) {
      throw new Meteor.Error(601, 'Sorry you cannot edit this user');
    }

    // if an $unset modifier is present, it means one or more of the fields is missing
    if (modifier.$unset) {
      throw new Meteor.Error(601, 'All fields are required');
    }

    // check for existing emails and throw error if necessary
    // NOTE: redundant with collection hook, but better to throw the error here to avoid wiping out the form
    if (modifier.$set && modifier.$set["grudr.email"]) {
      var email = modifier.$set["grudr.email"];
      if (Users.findByEmail(email)) {
        throw new Meteor.Error("email_taken1", "This email is already taken" + " (" + email + ")");
      }

    }

    // go over each field and throw an error if it's not editable
    // loop over each operation ($set, $unset, etc.)
    _.each(modifier, function (operation) {
      // loop over each property being operated on
      _.keys(operation).forEach(function (fieldName) {
        var field = schema[fieldName];
        if (!Users.can.editField(user, field, user)) {
          throw new Meteor.Error("disallowed_property", 'Disallowed property detected' + ": " + fieldName);
        }

      });
    });

    completeUserProfile(modifier, userId, user);
  },

  removeUser: function (userId, removeArticles) {

    if (Users.is.adminById(this.userId)) {

      removeArticles = (typeof removeArticles === "undefined") ? false : removeArticles;
      removeQuestions = (typeof removeQuestions === "undefined") ? false : removeQuestions;

      Meteor.users.remove(userId);

      if (removeArticles && removeQuestions) {
        var deletedArticles = Articles.remove({userId: userId});
        var deletedComments = Comments.remove({userId: userId});

        var deletedQuestions = Questions.remove({userId: userId});
        var deletedAnswers = Answers.remove({userId: userId});
        
        return "Deleted "+deletedArticles+" articles, "+deletedQuestions+" questions, "+deletedComments+" comments and "+deletedAnswers+" answers";
      } else {
        // not sure if anything should be done in that scenario yet
        // Articles.update({userId: userId}, {$set: {author: "\[deleted\]"}}, {multi: true});
        // Comments.update({userId: userId}, {$set: {author: "\[deleted\]"}}, {multi: true});
      }
    
    }

  }

});
