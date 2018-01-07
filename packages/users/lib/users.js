/**
 * Vote schema
 * @type {SimpleSchema}
 */
Grudr.schemas.votes = new SimpleSchema({
  itemId: {
    type: String
  },
  power: {
    type: Number,
    optional: true
  },
  votedAt: {
    type: Date, 
    optional: true
  }
});

/**
 * User Data schema
 * @type {SimpleSchema}
 */
Grudr.schemas.userData = new SimpleSchema({
  /**
    User roles
  */
  // userRoles: {
  //   label: '',
  //   type: String,
  //   optional: true,
  //   required: true,
  //   public: true,
  //   editableBy: ["member", "admin"],
  //   autoform: {
  //     type: "select-radio-inline",
  //     options: function () {
  //       return [
  //         { label: "I'am a Doctor", value: 'doctor' },
  //         { label: "I'am a Student", value: 'student' }
  //       ];
  //     }
  //   }
  // },
  /**
    User is Doctor
  */
  isDoctor: {
    type: Boolean,
    public: true,
    optional: true,
    editableBy: ["admin"],
    autoform: {
      omit: true
    }
  },
  /**
    User Avatar
  */
  avatar: {
    label: "Avatar",
    type: String,
    optional: true,
    public: true,
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
      },
      group: 'General Information'
    }
  },
  /**
    Bio (Markdown version)
  */
  bio: {
    label: 'About me',
    type: String,
    optional: true,
    required: true,
    public: true,
    max: 500,
    editableBy: ["member", "admin"],
    autoform: {
      rows: 5,
      group: 'General Information'
    }
  },
  /**
    The name displayed throughout the app. Can contain spaces and special characters, doesn't need to be unique
  */
  displayName: {
    label: 'Display name',
    type: String,
    optional: true,
    public: true,
    profile: true,
    editableBy: ["member", "admin"],
    autoform: {
      group: 'General Information'
    }
  },
  /**
    The user's profile URL slug // TODO: change this when displayName changes
  */
  slug: {
    type: String,
    public: true,
    optional: true
  },
  /**
    The user's email. Modifiable.
  */
  email: {
    label: 'Email address',
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Email,
    required: true,
    editableBy: ["member", "admin"],
    autoform: {
      group: 'General Information'
    }
    // unique: true // note: find a way to fix duplicate accounts before enabling this
  },
  /**
    A hash of the email, used for Gravatar // TODO: change this when email changes
  */
  emailHash: {
    type: String,
    public: true,
    optional: true
  },
  /**
    The HTML version of the bio field
  */
  htmlBio: {
    type: String,
    public: true,
    profile: true,
    optional: true,
    autoform: {
      omit: true
    },
    template: "user_profile_bio"
  },
  /**
    The user's karma
  */
  karma: {
    type: Number,
    decimal: true,
    public: true,
    optional: true
  },
  /**
    Total Feeds count
  */
  feedCount: {
    type: Number,
    public: true,
    optional: true
  },
  /**
    Total article count
  */
  articleCount: {
    type: Number,
    public: true,
    optional: true
  },
  /**
    An array containing articles upvotes
  */
  upvotedArticles: {
    type: [Grudr.schemas.votes],
    public: true,
    optional: true
  },
  /**
    An array containing articles downvotes
  */
  downvotedArticles: {
    type: [Grudr.schemas.votes],
    public: true,
    optional: true
  },
  /**
    Total comment count
  */
  commentCount: {
    type: Number,
    public: true,
    optional: true
  },
  /**
    Total question count
  */
  questionCount: {
    type: Number,
    public: true,
    optional: true
  },
  /**
    Total answer count
  */
  answerCount: {
    type: Number,
    public: true,
    optional: true
  },
  /**
    An array containing answers upvotes
  */
  upvotedAnswers: {
    type: [Grudr.schemas.votes],
    public: true,
    optional: true
  },
  /**
    An array containing answers downvotes
  */
  downvotedAnswers: {
    type: [Grudr.schemas.votes],
    public: true,
    optional: true
  },
  /**
    A blackbox modifiable object to store the user's settings
  */
  settings: {
    type: Object,
    optional: true,
    editableBy: ["member", "admin"],
    blackbox: true,
    autoform: {
      omit: true
    }
  },
  /**
    Clinic name
  */
  clinicName: {
    label: 'Hospital name',
    type: String,
    optional: true,
    required: true,
    public: true,
    profile: true,
    max: 60,
    editableBy: ["member", "admin"],
    autoform: {
      group: 'Profession'
    }
  },
  /**
    Medical Register
  */
  medicalRegistration: {
    label: 'Medical Registration',
    type: String,
    optional: true,
    required: true,
    profile: true,
    max: 60,
    editableBy: ["member", "admin"],
    autoform: {
      group: 'Profession'
    }
  },
  /**
    Medical Degree
  */
  medicalDegree: {
    label: "Medical Degree",
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
      },
      group: 'Profession'
    }
  },
  /**
    Phone
  */
  phone: {
    type: Number,
    optional: true,
    public: true,
    required: true,
    profile: true,
    regEx: SimpleSchema.RegEx.Phone,
    editableBy: ["member", "admin"],
    autoform: {
      group: 'Profession'
    }
  },
  /**
    Specialised in
  */
  specialisedIn: {
    label: 'Specialised In',
    type: String,
    optional: true,
    required: true,
    public: true,
    profile: true,
    max: 100,
    editableBy: ["member", "admin"],
    autoform: {
      group: 'Profession'
    }
  },
  /**
    Qualifications
  */
  qualification: {
    type: String,
    optional: true,
    public: true,
    profile: true,
    max: 500,
    editableBy: ["member", "admin"],
    autoform: {
      rows: 2,
      group: 'Profession'
    }
  },
  /**
    Experience
  */
  experience: {
    type: String,
    optional: true,
    public: true,
    profile: true,
    max: 100,
    editableBy: ["member", "admin"],
    autoform: {
      group: 'Profession'
    }
  },
  /**
    Address
  */
  address: {
    type: String,
    optional: true,
    public: true,
    profile: true,
    max: 500,
    editableBy: ["member", "admin"],
    autoform: {
      rows: 5,
      group: 'Profession'
    }
  },
  /**
    The user's Twitter username
  */
  twitterUsername: {
    label: 'Twitter',
    type: String,
    optional: true,
    public: true,
    profile: true,
    editableBy: ["member", "admin"],
    template: "user_profile_twitter",
    autoform: {
      group: 'Social connect'
    }
  },
  /**
    A link to the user's homepage
  */
  website: {
    label: 'Website',
    type: String,
    regEx: SimpleSchema.RegEx.Domain,
    public: true,
    profile: true,
    optional: true,
    editableBy: ["member", "admin"],
    autoform: {
      group: 'Social connect'
    }
  }
});

/**
 * Users schema
 * @type {SimpleSchema}
 */
Users.schema = new SimpleSchema({ 
  _id: {
    type: String,
    public: true,
    optional: true
  },
  username: {
    type: String,
    // regEx: /^[a-z0-9A-Z_]{3,15}$/,
    public: true,
    optional: true
  },
  emails: {
    type: [Object],
    optional: true
  },
  "emails.$.address": {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    optional: true
  },
  "emails.$.verified": {
    type: Boolean,
    optional: true
  },
  createdAt: {
    type: Date,
    public: true,
    optional: true
  },
  isAdmin: {
    type: Boolean,
    optional: true,
    editableBy: ["admin"],
    autoform: {
      omit: true
    }
  },
  profile: {
    type: Object,
    optional: true,
    blackbox: true
  },
  grudr: { // grudr-specific data
    type: Grudr.schemas.userData,
    optional: true
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true
  },
  status: {
    type: Object,
    optional: true,
    blackbox: true
  }
});

Meteor.startup(function(){
  Users.internationalize();
});

/**
 * Attach schema to Meteor.users collection
 */
Users.attachSchema(Users.schema);

/**
 * Users collection permissions
 */

Users.allow({
  update: _.partial(Grudr.allowCheck, Meteor.users),
  remove: _.partial(Grudr.allowCheck, Meteor.users)
});

