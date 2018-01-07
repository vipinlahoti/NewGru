/**
 * The global namespace for Answers.
 * @namespace Answers
 */
Answers = new Mongo.Collection("answers");

/**
 * Answers schema
 * @type {SimpleSchema}
 */
Answers.schema = new SimpleSchema({
  /**
    ID
  */
  _id: {
    type: String,
    optional: true
  },
  /**
    The `_id` of the parent answer, if there is one
  */
  parentAnswerId: {
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
    The `_id` of the top-level parent answer, if there is one
  */
  topLevelAnswerId: {
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
    The timestamp of answer creation
  */
  createdAt: {
    type: Date,
    optional: true
  },
  /**
    The timestamp of the answer being posted. For now, answers are always created and posted at the same time
  */
  postedAt: {
    type: Date,
    optional: true
  },
  /**
    The answer body (Markdown)
  */
  body: {
    type: String,
    max: 15000,
    editableBy: ["member", "admin"],
    autoform: {
      rows: 5,
      afFormGroup: {
        'formgroup-class': 'hide-label'
      }
    }
  },
  /**
    The HTML version of the answer body
  */
  htmlBody: {
    type: String,
    optional: true
  },
  /**
    The answer's base score (doesn't factor in answer age)
  */
  baseScore: {
    type: Number,
    decimal: true,
    optional: true
  },
  /**
    The answer's current score (factors in answer age)
  */
  score: {
    type: Number,
    decimal: true,
    optional: true
  },
  /**
    The number of upvotes the answer has received
  */
  upvotes: {
    type: Number,
    optional: true
  },
  /**
    An array containing the `_id`s of upvoters
  */
  upvoters: {
    type: [String],
    optional: true
  },
  /**
    The number of downvotes the answer has received
  */
  downvotes: {
    type: Number,
    optional: true
  },
  /**
    An array containing the `_id`s of downvoters
  */
  downvoters: {
    type: [String],
    optional: true
  },
  /**
    The answer author's name
  */
  author: {
    type: String,
    optional: true
  },
  /**
    Whether the answer is inactive. Inactive answers' scores gets recalculated less often
  */
  inactive: {
    type: Boolean,
    optional: true
  },
  /**
    The question's `_id`
  */
  questionId: {
    type: String,
    optional: true,
    // regEx: SimpleSchema.RegEx.Id,
    max: 500,
    // editableBy: ["member", "admin"], // TODO: should users be able to set questionId, but not modify it?
    autoform: {
      omit: true // never show this
    }
  },
  /**
    The answer author's `_id`
  */
  userId: {
    type: String,
    optional: true
  },
  /**
    Whether the answer is deleted. Delete answers' content doesn't appear on the site. 
  */
  isDeleted: {
    type: Boolean,
    optional: true
  }
});

Meteor.startup(function(){
  // needs to happen after every fields are added
  Answers.internationalize();
});

Answers.attachSchema(Answers.schema);

Answers.allow({
  update: _.partial(Grudr.allowCheck, Answers),
  remove: _.partial(Grudr.allowCheck, Answers)
});
