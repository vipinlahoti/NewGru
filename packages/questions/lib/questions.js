/**
 * Questions schema
 * @type {SimpleSchema}
 */
Questions.schema = new SimpleSchema({
  /**
    ID
  */
  _id: {
    type: String,
    optional: true
  },
  /**
    Timetstamp of question creation
  */
  createdAt: {
    type: Date,
    optional: true
  },
  /**
    Timestamp of question first appearing on the site (i.e. being approved)
  */
  postedAt: {
    label: 'Posted at',
    type: Date,
    optional: true,
    editableBy: ["admin"],
    autoform: {
      group: 'admin',
      type: "bootstrap-datetimepicker"
    }
  },
  /**
    Slug
  */
  slug: {
    type: String,
    optional: true
  },
  /**
    Reference
  */
  referenceImage: {
    label: "Reference Image",
    type: String,
    optional: true,
    editableBy: ["member", "admin"],
    autoform: {
      type: 'slingshotFileUpload',
      afFieldInput:{
        slingshotdirective: {
          directive: 'grudrArticlesThumbnails',
          // onBeforeUpload is called once on each file.
          onBeforeUpload: function(file, callback) {
            Resizer.resize(file, {width: 1024, height: 768, cropSquare: false}, function(err, file) {
              if(err){
                console.error(err);
                callback(file);
              }else{
                callback(file);
              }
            });
          }
        }
      }
    }
  },
  /**
    Question body (markdown)
  */
  body: {
    label: 'Ask a question',
    type: String,
    optional: true,
    max: 10000,
    editableBy: ["member", "admin"],
    autoform: {
      rows: 10,
      order: 30
    }
  },
  /**
    HTML version of the question body
  */
  // htmlBody: {
  //   type: String,
  //   optional: true
  // },
  /**
   Question Excerpt
  */
  excerpt: {
    type: String,
    optional: true,
    max: 150, //should not be changed the 255 is max we should load for each post/item
  },
  /**
    Count of how many times the question's page was viewed
  */
  viewCount: {
    type: Number,
    optional: true
  },
  /**
    Count of the question's answers
  */
  answerCount: {
    type: Number,
    optional: true
  },
  /**
    An array containing the `_id`s of answerers
  */
  answerers: {
    type: [String],
    optional: true
  },
  /**
    Timestamp of the last answer
  */
  lastAnsweredAt: {
    type: Date,
    optional: true
  },
  /**
    Count of how many times the question's link was clicked
  */
  clickCount: {
    type: Number,
    optional: true
  },
  /**
    The question's base score (not factoring in the question's age)
  */
  baseScore: {
    type: Number,
    decimal: true,
    optional: true
  },
  /**
    The question's current score (factoring in age)
  */
  score: {
    type: Number,
    decimal: true,
    optional: true
  },
  /**
    The question's status. One of pending (`1`), approved (`2`), or deleted (`3`)
  */
  status: {
    label: 'Status',
    type: Number,
    optional: true,
    editableBy: ["admin"],
    autoValue: function () {
      // only provide a default value
      // 1) this is an insert operation
      // 2) status field is not set in the document being inserted
      var user = Meteor.users.findOne(this.userId);
      if (this.isInsert && !this.isSet)
        return Questions.getDefaultStatus(user);
    },
    autoform: {
      noselect: true,
      options: Questions.config.questionStatuses,
      group: 'admin'
    }
  },
  /**
    Whether the question is sticky (pinned to the top of questions lists)
  */
  sticky: {
    label: 'Sticky',
    type: Boolean,
    optional: true,
    defaultValue: false,
    editableBy: ["admin"],
    autoform: {
      group: 'admin',
      leftLabel: "Sticky"
    }
  },
  /**
    Whether the question is inactive. Inactive questions see their score recalculated less often
  */
  inactive: {
    type: Boolean,
    optional: true
  },
  /**
    Save info for later spam checking on a question. We will use this for the akismet package
  */
  userIP: {
    type: String,
    optional: true
  },
  userAgent: {
    type: String,
    optional: true
  },
  referrer: {
    type: String,
    optional: true
  },
  /**
    The question author's name
  */
  author: {
    label: 'Author',
    type: String,
    optional: true
  },
  /**
    The question author's `_id`. 
  */
  userId: {
    label: 'user',
    type: String,
    optional: true,
    // regEx: SimpleSchema.RegEx.Id,
    editableBy: ["admin"],
    autoform: {
      group: 'admin',
      options: function () {
        return Meteor.users.find().map(function (user) {
          return {
            value: user._id,
            label: Users.getDisplayName(user)
          };
        });
      }
    }
  }
});

// schema transforms
Meteor.startup(function(){
  // needs to happen after every fields were added
  Questions.internationalize();
});

/**
 * Attach schema to Questions collection
 */
Questions.attachSchema(Questions.schema);

Questions.allow({
  update: _.partial(Grudr.allowCheck, Questions),
  remove: _.partial(Grudr.allowCheck, Questions)
});

