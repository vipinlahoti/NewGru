/*
 * Reviews schema
 */

import Users from 'meteor/vulcan:users';
import marked from 'marked';
import { Utils } from 'meteor/vulcan:core';

/**
 * @summary Reviews schema
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
    The `_id` of the parent review, if there is one
  */
  parentReviewId: {
    type: String,
    // regEx: SimpleSchema.RegEx.Id,
    max: 500,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    optional: true,
    resolveAs: {
      fieldName: 'parentReview',
      type: 'Review',
      resolver: async (review, args, {currentUser, Users, Reviews}) => {
        if (!review.parentReviewId) return null;
        const parentReview = await Reviews.loader.load(review.parentReviewId);
        return Users.restrictViewableFields(currentUser, Reviews, parentReview);
      },
      addOriginalField: true
    },
    hidden: true // never show this
  },
  /**
    The `_id` of the top-level parent review, if there is one
  */
  topLevelReviewId: {
    type: String,
    // regEx: SimpleSchema.RegEx.Id,
    max: 500,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    optional: true,
    resolveAs: {
      fieldName: 'topLevelReview',
      type: 'Review',
      resolver: async (review, args, {currentUser, Users, Reviews}) => {
        if (!review.topLevelReviewId) return null;
        const topLevelReview = await Reviews.loader.load(review.topLevelReviewId);
        return Users.restrictViewableFields(currentUser, Reviews, topLevelReview);
      },
      addOriginalField: true
    },
    hidden: true // never show this
  },
  /**
    The timestamp of review creation
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
    The review body (Markdown)
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
    The review author's name
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
    The hospital's `_id`
  */
  hospitalId: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    // regEx: SimpleSchema.RegEx.Id,
    max: 500,
    resolveAs: {
      fieldName: 'hospital',
      type: 'Hospital',
      resolver: async (review, args, {currentUser, Users, Hospitals}) => {
        if (!review.hospitalId) return null;
        const hospital = await Hospitals.loader.load(review.hospitalId);
        return Users.restrictViewableFields(currentUser, Hospitals, hospital);
      },
      addOriginalField: true
    },
    hidden: true // never show this
  },
  /**
    The review author's `_id`
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
      resolver: async (review, args, {currentUser, Users}) => {
        if (!review.userId) return null;
        const user = await Users.loader.load(review.userId);
        return Users.restrictViewableFields(currentUser, Users, user);
      },
      addOriginalField: true
    },
  },
  /**
    Whether the review is deleted. Delete reviews' content doesn't appear on the site.
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
    viewableBy: ['guests'],
    resolveAs: {
      fieldName: 'pageUrl',
      type: 'String',
      resolver: (review, args, context) => {
        return context.Reviews.getPageUrl(review, true);
      },
    }
  },
};

export default schema;
