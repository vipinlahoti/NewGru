/**
 * Articles schema
 * @type {SimpleSchema}
 */
Articles.schema = new SimpleSchema({
  /**
    ID
  */
  _id: {
    type: String,
    optional: true
  },
  /**
    Timetstamp of article creation
  */
  createdAt: {
    type: Date,
    optional: true
  },
  /**
    Timestamp of article first appearing on the site (i.e. being approved)
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
    Thumbnail
  */
  thumbnailUrl: {
    label: "Thumbnail",
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
            Resizer.resize(file, {width: 1920, height: 1200, cropSquare: false}, function(err, file) {
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
    Title
  */
  title: {
    label: 'Title',
    type: String,
    optional: true,
    max: 80,
    editableBy: ["member", "admin"],
    autoform: {
      order: 20
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
    Article body (markdown)
  */
  body: {
    label: 'Content',
    type: String,
    optional: true,
    max: 20000,
    editableBy: ["member", "admin"],
    autoform: {
      rows: 10,
      order: 30
    }
  },
  /**
   Article Excerpt
  */
  excerpt: {
    type: String,
    optional: true,
    max: 255, //should not be changed the 255 is max we should load for each post/item
  },
  /**
    Count of how many times the article's page was viewed
  */
  viewCount: {
    type: Number,
    optional: true
  },
  /**
    Count of the article's comments
  */
  commentCount: {
    type: Number,
    optional: true
  },
  /**
    An array containing the `_id`s of commenters
  */
  commenters: {
    type: [String],
    optional: true
  },
  /**
    Timestamp of the last comment
  */
  lastCommentedAt: {
    type: Date,
    optional: true
  },
  /**
    Count of how many times the article's link was clicked
  */
  clickCount: {
    type: Number,
    optional: true
  },
  /**
    The article's base score (not factoring in the article's age)
  */
  baseScore: {
    type: Number,
    decimal: true,
    optional: true
  },
  /**
    How many upvotes the article has received
  */
  upvotes: {
    type: Number,
    optional: true
  },
  /**
    An array containing the `_id`s of the article's upvoters
  */
  upvoters: {
    type: [String],
    optional: true
  },
  /**
    How many downvotes the article has received
  */
  downvotes: {
    type: Number,
    optional: true
  },
  /**
    An array containing the `_id`s of the article's downvoters
  */
  downvoters: {
    type: [String],
    optional: true
  },
  /**
    The article's current score (factoring in age)
  */
  score: {
    type: Number,
    decimal: true,
    optional: true
  },
  /**
    The article's status. One of pending (`1`), approved (`2`), or deleted (`3`)
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
        return Articles.getDefaultStatus(user);
    },
    autoform: {
      noselect: true,
      options: Articles.config.articleStatuses,
      group: 'admin'
    }
  },
  /**
    Whether the article is sticky (pinned to the top of articles lists)
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
    Whether the article is inactive. Inactive articles see their score recalculated less often
  */
  inactive: {
    type: Boolean,
    optional: true
  },
  /**
    Save info for later spam checking on a article. We will use this for the akismet package
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
    The article author's name
  */
  author: {
    label: 'Author',
    type: String,
    optional: true
  },
  /**
    The article author's `_id`. 
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
  Articles.internationalize();
});

/**
 * Attach schema to Articles collection
 */
Articles.attachSchema(Articles.schema);

Articles.allow({
  update: _.partial(Grudr.allowCheck, Articles),
  remove: _.partial(Grudr.allowCheck, Articles)
});

