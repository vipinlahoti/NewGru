/*
Questions schema
*/

import Users from 'meteor/vulcan:users';
import { Questions } from './collection.js';
import { Utils, getSetting, registerSetting } from 'meteor/vulcan:core';
import moment from 'moment';
import marked from 'marked';

registerSetting('forum.questionExcerptLength', 20, 'Length of questions excerpts in words');

/**
 * @summary Questions config namespace
 * @type {Object}
 */
const formGroups = {
  admin: {
    name: 'admin',
    order: 2
  }
};

/**
 * @summary Questions schema
 * @type {Object}
 */
const schema = {
  /**
    ID
  */
  _id: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
  },
  /**
    Timetstamp of question creation
  */
  createdAt: {
    type: Date,
    optional: true,
    viewableBy: ['admins'],
    onInsert: () => {
      return new Date();
    }
  },
  /**
    Timestamp of question first appearing on the site (i.e. being approved)
  */
  postedAt: {
    type: Date,
    optional: true,
    viewableBy: ['guests'],
    insertableBy: ['admins'],
    editableBy: ['admins'],
    control: 'datetime',
    group: formGroups.admin,
    onInsert: (question, currentUser) => {
      // Set the question's postedAt if it's going to be approved
      if (!question.postedAt && Questions.getDefaultStatus(currentUser) === Questions.config.STATUS_APPROVED) {
        return new Date();
      }
    }
  },
  /**
    Title
  */
  title: {
    type: String,
    optional: false,
    max: 3000,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    control: 'textarea',
    order: 20,
    searchable: true
  },
  /**
    Slug
  */
  slug: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    onInsert: (question) => {
      return Utils.slugify(question.title);
    },
    onEdit: (modifier, question) => {
      if (modifier.$set.title) {
        return Utils.slugify(modifier.$set.title);
      }
    }
  },
  /**
   Question Excerpt
   */
  excerpt: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    searchable: true,
    onInsert: (question) => {
      if (question.title) {
        // excerpt length is configurable via the settings (20 words by default, ~255 characters)
        const excerptLength = getSetting('forum.questionExcerptLength', 20); 
        return Utils.trimHTML(Utils.sanitize(marked(question.title)), excerptLength);
      }
    },
    onEdit: (modifier, question) => {
      if (modifier.$set.title) {
        const excerptLength = getSetting('forum.questionExcerptLength', 20); 
        return Utils.trimHTML(Utils.sanitize(marked(modifier.$set.title)), excerptLength);
      }
    }
  },
  /**
    Count of how many times the question's page was viewed
  */
  viewCount: {
    type: Number,
    optional: true,
    viewableBy: ['admins'],
    defaultValue: 0
  },
  /**
    Timestamp of the last answer
  */
  lastAnsweredAt: {
    type: Date,
    optional: true,
    viewableBy: ['guests'],
  },
  /**
    Count of how many times the question's link was clicked
  */
  clickCount: {
    type: Number,
    optional: true,
    viewableBy: ['admins'],
    defaultValue: 0
  },
  /**
    The question's status. One of pending (`1`), approved (`2`), or deleted (`3`)
  */
  status: {
    type: Number,
    optional: true,
    viewableBy: ['guests'],
    insertableBy: ['admins'],
    editableBy: ['admins'],
    control: 'select',
    onInsert: (document, currentUser) => {
      if (!document.status) {
        return Questions.getDefaultStatus(currentUser);
      }
    },
    onEdit: (modifier, document, currentUser) => {
      // if for some reason question status has been removed, give it default status
      if (modifier.$unset && modifier.$unset.status) {
        return Questions.getDefaultStatus(currentUser);
      }
    },
    form: {
      options: () => Questions.statuses,
    },
    group: formGroups.admin
  },
  /**
    Whether a question is scheduled in the future or not
  */
  isFuture: {
    type: Boolean,
    optional: true,
    viewableBy: ['guests'],
    onInsert: (question) => {
      // Set the question's isFuture to true if necessary
      if (question.postedAt) {
        const questionTime = new Date(question.postedAt).getTime();
        const currentTime = new Date().getTime() + 1000;
        return questionTime > currentTime; // round up to the second
      }
    },
    onEdit: (modifier, question) => {
      // Set the question's isFuture to true if necessary
      if (modifier.$set.postedAt) {
        const questionTime = new Date(modifier.$set.postedAt).getTime();
        const currentTime = new Date().getTime() + 1000;
        if (questionTime > currentTime) {
          // if a question's postedAt date is in the future, set isFuture to true
          return true;
        } else if (question.isFuture) {
          // else if a question has isFuture to true but its date is in the past, set isFuture to false
          return false;
        }
      }
    }
  },
  /**
    Whether the question is sticky (pinned to the top of questions lists)
  */
  sticky: {
    type: Boolean,
    optional: true,
    defaultValue: false,
    viewableBy: ['guests'],
    insertableBy: ['admins'],
    editableBy: ['admins'],
    control: 'checkbox',
    group: formGroups.admin,
    onInsert: (question) => {
      if(!question.sticky) {
        return false;
      }
    },
    onEdit: (modifier, question) => {
      if (!modifier.$set.sticky) {
        return false;
      }
    }
  },
  /**
    Save info for later spam checking on a question. We will use this for the akismet package
  */
  userIP: {
    type: String,
    optional: true,
    viewableBy: ['admins'],
  },
  userAgent: {
    type: String,
    optional: true,
    viewableBy: ['admins'],
  },
  referrer: {
    type: String,
    optional: true,
    viewableBy: ['admins'],
  },
  /**
    The question author's name
  */
  author: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    onEdit: (modifier, document, currentUser) => {
      // if userId is changing, change the author name too
      if (modifier.$set && modifier.$set.userId) {
        return Users.getDisplayNameById(modifier.$set.userId)
      }
    }
  },
  /**
    The question author's `_id`.
  */
  userId: {
    type: String,
    optional: true,
    control: 'select',
    viewableBy: ['guests'],
    insertableBy: ['members'],
    hidden: true,
    resolveAs: {
      fieldName: 'user',
      type: 'User',
      resolver: async (question, args, context) => {
        if (!question.userId) return null;
        const user = await context.Users.loader.load(question.userId);
        return context.Users.restrictViewableFields(context.currentUser, context.Users, user);
      },
      addOriginalField: true
    },
  },

  /**
    Used to keep track of when a question has been included in a newsletter
  */
  scheduledAt: {
    type: Date,
    optional: true,
    viewableBy: ['admins'],
  },

  // GraphQL-only fields

  domain: {
    type: String,
    optional: true,
    resolveAs: {
      type: 'String',
      resolver: (question, args, context) => {
        return Utils.getDomain(question.url);
      },
    }  
  },

  pageUrl: {
    type: String,
    optional: true,
    resolveAs: {
      type: 'String',
      resolver: (question, args, context) => {
        return Questions.getPageUrl(question, true);
      },
    }  
  },

  postedAtFormatted: {
    type: String,
    optional: true,
    resolveAs: {
      type: 'String',
      resolver: (question, args, context) => {
        return moment(question.postedAt).format('dddd, MMMM Do YYYY');
      }
    }  
  },

  answersCount: {
    type: Number,
    optional: true,
    resolveAs: {
      type: 'Int',
      resolver: (question, args, { Answers }) => {
        const answersCount = Answers.find({ questionId: question._id }).count();
        return answersCount;
      },
    }  
  },

  answers: {
    type: Array,
    optional: true,
    resolveAs: {
        arguments: 'limit: Int = 5',
        type: '[Answer]',
        resolver: (question, { limit }, { currentUser, Users, Answers }) => {
          const answers = Answers.find({ questionId: question._id }, { limit }).fetch();

          // restrict documents fields
          const viewableAnswers = _.filter(answers, answers => Answers.checkAccess(currentUser, answers));
          const restrictedAnswers = Users.restrictViewableFields(currentUser, Answers, viewableAnswers);
        
          return restrictedAnswers;
        }
      }
  },

  emailShareUrl: {
    type: String,
    optional: true,
    resolveAs: {
      type: 'String',
      resolver: (question) => {
        return Questions.getEmailShareUrl(question);
      }
    }
  }
  
};

export default schema;
