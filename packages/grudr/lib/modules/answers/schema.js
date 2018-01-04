/*

Answers schema

*/

import Users from 'meteor/vulcan:users';
import marked from 'marked';
import { Utils } from 'meteor/vulcan:core';

/**
 * @summary Answers schema
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
    The `_id` of the parent answer, if there is one
  */
  parentAnswerId: {
    type: String,
    // regEx: SimpleSchema.RegEx.Id,
    max: 500,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    optional: true,
    resolveAs: {
      fieldName: 'parentAnswer',
      type: 'Answer',
      resolver: async (answer, args, {currentUser, Users, Answers}) => {
        if (!answer.parentAnswerId) return null;
        const parentAnswer = await Answers.loader.load(answer.parentAnswerId);
        return Users.restrictViewableFields(currentUser, Answers, parentAnswer);
      },
      addOriginalField: true
    },
    hidden: true // never show this
  },
  /**
    The `_id` of the top-level parent answer, if there is one
  */
  topLevelAnswerId: {
    type: String,
    // regEx: SimpleSchema.RegEx.Id,
    max: 500,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    optional: true,
    resolveAs: {
      fieldName: 'topLevelAnswer',
      type: 'Answer',
      resolver: async (answer, args, {currentUser, Users, Answers}) => {
        if (!answer.topLevelAnswerId) return null;
        const topLevelAnswer = await Answers.loader.load(answer.topLevelAnswerId);
        return Users.restrictViewableFields(currentUser, Answers, topLevelAnswer);
      },
      addOriginalField: true
    },
    hidden: true // never show this
  },
  /**
    The timestamp of answer creation
  */
  createdAt: {
    type: Date,
    optional: true,
    viewableBy: ['admins'],
    onInsert: (document, currentUser) => {
      return new Date();
    }
  },
  /**
    The timestamp of the answer being questioned. For now, answers are always created and questioned at the same time
  */
  postedAt: {
    type: Date,
    optional: true,
    viewableBy: ['guests'],
    onInsert: (document, currentUser) => {
      return new Date();
    }
  },
  /**
    The answer body (Markdown)
  */
  body: {
    type: String,
    max: 3000,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    control: "textarea"
  },
  /**
    The HTML version of the answer body
  */
  htmlBody: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    onInsert: (answer) => {
      if (answer.body) {
        return Utils.sanitize(marked(answer.body));
      }
    },
    onEdit: (modifier, answer) => {
      if (modifier.$set.body) {
        return Utils.sanitize(marked(modifier.$set.body));
      }
    }
  },
  /**
    The answer author's name
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
    The question's `_id`
  */
  questionId: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    // regEx: SimpleSchema.RegEx.Id,
    max: 500,
    resolveAs: {
      fieldName: 'question',
      type: 'Question',
      resolver: async (answer, args, {currentUser, Users, Questions}) => {
        if (!answer.questionId) return null;
        const question = await Questions.loader.load(answer.questionId);
        return Users.restrictViewableFields(currentUser, Questions, question);
      },
      addOriginalField: true
    },
    hidden: true // never show this
  },
  /**
    The answer author's `_id`
  */
  userId: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    hidden: true,
    resolveAs: {
      fieldName: 'user',
      type: 'User',
      resolver: async (answer, args, {currentUser, Users}) => {
        if (!answer.userId) return null;
        const user = await Users.loader.load(answer.userId);
        return Users.restrictViewableFields(currentUser, Users, user);
      },
      addOriginalField: true
    },
  },
  /**
    Whether the answer is deleted. Delete answers' content doesn't appear on the site.
  */
  isDeleted: {
    type: Boolean,
    optional: true,
    viewableBy: ['guests'],
  },
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

  // GraphQL only fields

  pageUrl: {
    type: String,
    optional: true,
    resolveAs: {
      fieldName: 'pageUrl',
      type: 'String',
      resolver: (answer, args, context) => {
        return context.Answers.getPageUrl(answer, true);
      },
    }  
  },
};

export default schema;
