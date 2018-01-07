
// ------------------------------------------------------------------------------------------- //
// -------------------------------------- Submit Story ------------------------------------- //
// ------------------------------------------------------------------------------------------- //

Stories.submit = function (story) {

  var userId = story.userId; // at this stage, a userId is expected

  // ------------------------------ Checks ------------------------------ //

  // Don't allow empty stories
  if (!story.body)
    throw new Meteor.Error(704, 'Your story is empty');

  // ------------------------------ Properties ------------------------------ //

  var defaultProperties = {
    createdAt: new Date(),
    postedAt: new Date(),
    baseScore: 0,
    score: 0,
    author: Users.getDisplayNameById(userId)
  };

  story = _.extend(defaultProperties, story);

  // ------------------------------ Callbacks ------------------------------ //

  // run all user submit server callbacks on story object successively
  story = Grudr.callbacks.run("storySubmit", story);

  // -------------------------------- Insert -------------------------------- //

  story._id = Stories.insert(story);

  // --------------------- Server-side Async Callbacks --------------------- //

  // run all user submit server callbacks on story object successively
  // note: query for story to get fresh document with collection-hooks effects applied
  Grudr.callbacks.runAsync("storySubmitAsync", Stories.findOne(story._id));

  return story;
};

Stories.edit = function (storyId, modifier, story) {

  // ------------------------------ Callbacks ------------------------------ //

  modifier = Grudr.callbacks.run("storyEdit", modifier, story);

  // ------------------------------ Update ------------------------------ //

  Stories.update(storyId, modifier);

  // ------------------------------ Callbacks ------------------------------ //

  Grudr.callbacks.runAsync("storyEditAsync", Stories.findOne(storyId), story);

  // ------------------------------ After Update ------------------------------ //
  return Stories.findOne(storyId);
};

// ------------------------------------------------------------------------------------------- //
// ----------------------------------------- Methods ----------------------------------------- //
// ------------------------------------------------------------------------------------------- //

Meteor.methods({
  submitStory: function(story){

    // checking might be redundant because SimpleSchema already enforces the schema, but you never know
    check(story, Stories.simpleSchema());

    // required properties:
    // userId
    // body

    // optional properties:
    // parentStoryId

    var user = Meteor.user(),
        hasAdminRights = Users.is.admin(user),
        schema = Stories.simpleSchema()._schema;

    // ------------------------------ Checks ------------------------------ //
    // check that user can story
    if (!user || !Users.can.story(user))
      throw new Meteor.Error('You need to login or be invited to user new stories.');

    // ------------------------------ Rate Limiting ------------------------------ //
    if (!hasAdminRights) {

      var timeSinceLastStory = Users.timeSinceLast(user, Stories),
          storyInterval = Math.abs(parseInt(Settings.get('storyInterval', 30)));

      // check that user waits more than 30 seconds between stories
      if((timeSinceLastStory < storyInterval))
        throw new Meteor.Error(704, `Please wait, ${storyInterval - timeSinceLastStory} seconds before storying again`);

    }

    // ------------------------------ Properties ------------------------------ //
    // admin-only properties
    // userId
    // clear restricted properties
    _.keys(story).forEach(function (fieldName) {

      // make an exception for userId, which should be setable but not modifiable
      if (fieldName === "userId") {
        // ok
      } else {
        var field = schema[fieldName];
        if (!Users.can.submitField(user, field)) {
          throw new Meteor.Error("disallowed_property", 'Disallowed property detected' + ": " + fieldName);
        }
      }

    });

    // if no userId has been set, default to current user id
    if (!story.userId) {
      story.userId = user._id;
    }

    return Stories.submit(story);
  },

  editStory: function (modifier, storyId) {

    // checking might be redundant because SimpleSchema already enforces the schema, but you never know
    check(modifier, {$set: Stories.simpleSchema()});
    check(storyId, String);

    var user = Meteor.user(),
        story = Stories.findOne(storyId),
        schema = Stories.simpleSchema()._schema;

    // ------------------------------ Checks ------------------------------ //
    // check that user can edit
    if (!user || !Users.can.edit(user, story)) {
      throw new Meteor.Error(601, 'Sorry, you cannot edit this story.');
    }

    // go over each field and throw an error if it's not editable
    // loop over each operation ($set, $unset, etc.)
    _.each(modifier, function (operation) {
      // loop over each property being operated on
      _.keys(operation).forEach(function (fieldName) {

        var field = schema[fieldName];
        if (!Users.can.editField(user, field, story)) {
          throw new Meteor.Error("disallowed_property", 'Disallowed property detected' + ": " + fieldName);
        }

      });
    });

    Stories.edit(storyId, modifier, story);
  },

  deleteStoryById: function (storyId) {

    check(storyId, String);
    
    var story = Stories.findOne(storyId);
    var user = Meteor.user();

    if(Users.can.edit(user, story)){

      // decrement user story count and remove user ID from user
      Users.update(story.userId, {
        $inc:   {storyCount: -1},
        $pull:  {storyers: story.userId}
      });

      // decrement user story count and remove story ID from user
      Meteor.users.update({_id: story.userId}, {
        $inc:   {'grudr.storyCount': -1}
      });

      // note: should we also decrease user's story karma ?
      // We don't actually delete the story to avoid losing all child stories.
      // Instead, we give it a special flag
      Stories.update({_id: storyId}, {$set: {
        body: 'Deleted',
        htmlBody: 'Deleted',
        isDeleted: true
      }});

    } else{
      Bert.alert( 'You don\'t have permission to delete this story.', 'danger', 'growl-top-right' );
    }
  }
});
