Users.addField({
  fieldName: 'grudr.isDummy',
  fieldSchema: {
    type: Boolean,
    optional: true,
    autoform: {
      omit: true
    }
  }
});

Articles.addField({
  fieldName: 'dummySlug',
  fieldSchema: {
    type: String,
    optional: true,
    autoform: {
      omit: true
    }
  }
});

Articles.addField({
  fieldName: 'isDummy',
  fieldSchema: {
    type: Boolean,
    optional: true,
    autoform: {
      omit: true
    }
  }
});

Comments.addField({
fieldName: 'isDummy',
fieldSchema: {
  type: Boolean,
  optional: true,
  autoform: {
    omit: true
  }
}
});

/**
 * Copy over profile.isDummy to grudr.isDummy on user creation
 * @param {Object} user – the user object being iterated on and returned
 * @param {Object} options – user options
 */
function copyDummyProperty (user, options) {
  if (typeof user.profile.isDummy !== "undefined") {
    user.grudr.isDummy = user.profile.isDummy;
  }
  return user;
}
Grudr.callbacks.add("onCreateUser", copyDummyProperty);
