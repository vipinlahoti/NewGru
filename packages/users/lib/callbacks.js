//////////////////////////////////////////////////////
// Collection Hooks                                 //
//////////////////////////////////////////////////////

/**
 * Generate HTML body from Markdown on user bio insert
 */
Users.after.insert(function (userId, user) {

  // run create user async callbacks
  Grudr.callbacks.runAsync("onCreateUserAsync", user);

  // check if all required fields have been filled in. If so, run profile completion callbacks
  if (Users.hasCompletedProfile(user)) {
    Grudr.callbacks.runAsync("profileCompletedAsync", user);
  }

  if('grudr.userRoles' === 'doctor'){
    // update invited user
    Meteor.users.update(user._id, {
      $set: {
        "grudr.isDoctor": true
      }
    });
  }

});

/**
 * Generate HTML body from Markdown when user bio is updated
 */
Users.before.update(function (userId, doc, fieldNames, modifier) {
  // if bio is being modified, update htmlBio too
  if (Meteor.isServer && modifier.$set && modifier.$set["grudr.bio"]) {
    modifier.$set["grudr.htmlBio"] = Grudr.utils.sanitize(modifier.$set["grudr.bio"]);
  }
});

/**
 * Disallow $rename
 */
Users.before.update(function (userId, doc, fieldNames, modifier) {
  if (!!modifier.$rename) {
    throw new Meteor.Error("illegal $rename operator detected!");
  }
});

/**
 * If user.grudr.email has changed, check for existing emails and change user.emails and email hash if needed
 */
 if (Meteor.isServer) {
  Users.before.update(function (userId, doc, fieldNames, modifier) {

    var user = doc;

    // if email is being modified, update user.emails too
    if (Meteor.isServer && modifier.$set && modifier.$set["grudr.email"]) {

      var newEmail = modifier.$set["grudr.email"];

      // check for existing emails and throw error if necessary
      var userWithSameEmail = Users.findByEmail(newEmail);
      if (userWithSameEmail && userWithSameEmail._id !== doc._id) {
        throw new Meteor.Error("email_taken2", "This email is already taken" + " (" + newEmail + ")");
      }

      // if user.emails exists, change it too
      if (!!user.emails) {
        user.emails[0].address = newEmail;
        modifier.$set.emails = user.emails;
      }

      // update email hash
      modifier.$set["grudr.emailHash"] = Gravatar.hash(newEmail);

    }
  });
}

//////////////////////////////////////////////////////
// Callbacks                                        //
//////////////////////////////////////////////////////

/**
 * Set up user object on creation
 * @param {Object} user – the user object being iterated on and returned
 * @param {Object} options – user options
 */
function setupUser (user, options) {
  // ------------------------------ Properties ------------------------------ //
  var userProperties = {
    profile: options.profile || {},
    grudr: {
      karma: 0,
      isInvited: false,
      articleCount: 0,
      commentCount: 0,
      questionCount: 0,
      answerCount: 0,
      journalCount: 0,
      invitedCount: 0,
      upvotedArticles: [],
      downvotedArticles: [],
      upvotedAnswers: [],
      downvotedAnswers: [],
      isDoctor: false,
    }
  };
  user = _.extend(user, userProperties);

  // look in a few places for the user email
  if (options.email) {
    user.grudr.email = options.email;
  } else if (user.services['meteor-developer'] && user.services['meteor-developer'].emails) {
    user.grudr.email = _.findWhere(user.services['meteor-developer'].emails, { primary: true }).address;
  } else if (user.services.facebook && user.services.facebook.email) {
    user.grudr.email = user.services.facebook.email;
  } else if (user.services.github && user.services.github.email) {
    user.grudr.email = user.services.github.email;
  } else if (user.services.google && user.services.google.email) {
    user.grudr.email = user.services.google.email;
  }

  // generate email hash
  if (!!user.grudr.email) {
    user.grudr.emailHash = Gravatar.hash(user.grudr.email);
  }

  // look in a few places for the displayName
  if (user.profile.username) {
    user.grudr.displayName = user.profile.username;
  } else if (user.profile.name) {
    user.grudr.displayName = user.profile.name;
  } else {
    user.grudr.displayName = user.username;
  }

  // create slug from display name
  user.grudr.slug = Grudr.utils.slugify(user.grudr.displayName);

  // if this is not a dummy account, and is the first user ever, make them an admin
  user.isAdmin = (!user.profile.isDummy && Meteor.users.find({'profile.isDummy': {$ne: true}}).count() === 0) ? true : false;

  Events.track('new user', {username: user.username, email: user.grudr.email});

  return user;
}
Grudr.callbacks.add("onCreateUser", setupUser);


function hasCompletedProfile (user) {
  return Users.hasCompletedProfile(user);
}
Grudr.callbacks.add("profileCompletedChecks", hasCompletedProfile);
