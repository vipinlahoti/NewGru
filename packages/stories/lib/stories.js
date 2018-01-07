/**
 * The global namespace for Stories.
 * @namespace Stories
 */
Stories = new Mongo.Collection("stories");

/**
 * Stories schema
 * @type {SimpleSchema}
 */
Stories.schema = new SimpleSchema({
  /**
    ID
  */
  _id: {
    type: String,
    optional: true
  },
  /**
    The `_id` of the parent story, if there is one
  */
  parentStoryId: {
    type: String,
    // regEx: SimpleSchema.RegEx.Id,
    max: 500,
    editableBy: ["member", "admin"],
    optional: true,
    autoform: {
      omit: true // never show this
    }
  },
  /**
    The `_id` of the top-level parent story, if there is one
  */
  topLevelStoryId: {
    type: String,
    // regEx: SimpleSchema.RegEx.Id,
    max: 500,
    editableBy: ["member", "admin"],
    optional: true,
    autoform: {
      omit: true // never show this
    }
  },
  /**
    The timestamp of story creation
  */
  createdAt: {
    type: Date,
    optional: true
  },
  /**
    The timestamp of the story being posted. For now, stories are always created and posted at the same time
  */
  postedAt: {
    type: Date,
    optional: true
  },
  /**
    The story body (Markdown)
  */
  body: {
    type: String,
    max: 3000,
    editableBy: ["member", "admin"],
    autoform: {
      rows: 5,
      afFormGroup: {
        'formgroup-class': 'hide-label'
      }
    }
  },
  /**
    The HTML version of the story body
  */
  htmlBody: {
    type: String,
    optional: true
  },
  /**
    The story's base score (doesn't factor in story age)
  */
  baseScore: {
    type: Number,
    decimal: true,
    optional: true
  },
  /**
    The story's current score (factors in story age)
  */
  score: {
    type: Number,
    decimal: true,
    optional: true
  },
  /**
    The story author's name
  */
  author: {
    type: String,
    optional: true
  },
  /**
    Whether the story is inactive. Inactive stories' scores gets recalculated less often
  */
  inactive: {
    type: Boolean,
    optional: true
  },
  /**
    The user's `_id`
  */
  userId: {
    type: String,
    optional: true,
    // regEx: SimpleSchema.RegEx.Id,
    max: 500,
    // editableBy: ["member", "admin"], // TODO: should users be able to set userId, but not modify it?
    autoform: {
      omit: true // never show this
    }
  },
  /**
    The story author's `_id`
  */
  userId: {
    type: String,
    optional: true
  },
  /**
    Whether the story is deleted. Delete stories' content doesn't appear on the site. 
  */
  isDeleted: {
    type: Boolean,
    optional: true
  }
});

Meteor.startup(function(){
  // needs to happen after every fields are added
  Stories.internationalize();
});

Stories.attachSchema(Stories.schema);

Stories.allow({
  update: _.partial(Grudr.allowCheck, Stories),
  remove: _.partial(Grudr.allowCheck, Stories)
});
