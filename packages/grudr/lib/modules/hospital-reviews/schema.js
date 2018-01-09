/*

HosReviews schema

*/

import Users from 'meteor/vulcan:users';
import marked from 'marked';
import { Utils } from 'meteor/vulcan:core';

/**
 * @summary HosReviews schema
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
    The `_id` of the parent hosReview, if there is one
  */
  parentHosReviewId: {
    type: String,
    // regEx: SimpleSchema.RegEx.Id,
    max: 500,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    optional: true,
    resolveAs: {
      fieldName: 'parentHosReview',
      type: 'HosReview',
      resolver: async (hosReview, args, {currentUser, Users, HosReviews}) => {
        if (!hosReview.parentHosReviewId) return null;
        const parentHosReview = await HosReviews.loader.load(hosReview.parentHosReviewId);
        return Users.restrictViewableFields(currentUser, HosReviews, parentHosReview);
      },
      addOriginalField: true
    },
    hidden: true // never show this
  },
  /**
    The `_id` of the top-level parent hosReview, if there is one
  */
  topLevelHosReviewId: {
    type: String,
    // regEx: SimpleSchema.RegEx.Id,
    max: 500,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    optional: true,
    resolveAs: {
      fieldName: 'topLevelHosReview',
      type: 'HosReview',
      resolver: async (hosReview, args, {currentUser, Users, HosReviews}) => {
        if (!hosReview.topLevelHosReviewId) return null;
        const topLevelHosReview = await HosReviews.loader.load(hosReview.topLevelHosReviewId);
        return Users.restrictViewableFields(currentUser, HosReviews, topLevelHosReview);
      },
      addOriginalField: true
    },
    hidden: true // never show this
  },
  /**
    The timestamp of hosReview creation
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
    The timestamp of the hosReview being hospitaled. For now, hosReviews are always created and hospitaled at the same time
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
    The hosReview body (Markdown)
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
    The hosReview author's name
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
      resolver: async (hosReview, args, {currentUser, Users, Hospitals}) => {
        if (!hosReview.hospitalId) return null;
        const hospital = await Hospitals.loader.load(hosReview.hospitalId);
        return Users.restrictViewableFields(currentUser, Hospitals, hospital);
      },
      addOriginalField: true
    },
    hidden: true // never show this
  },
  /**
    The hosReview author's `_id`
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
      resolver: async (hosReview, args, {currentUser, Users}) => {
        if (!hosReview.userId) return null;
        const user = await Users.loader.load(hosReview.userId);
        return Users.restrictViewableFields(currentUser, Users, user);
      },
      addOriginalField: true
    },
  },
  /**
    Whether the hosReview is deleted. Delete hosReviews' content doesn't appear on the site.
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
      resolver: (hosReview, args, context) => {
        return context.HosReviews.getPageUrl(hosReview, true);
      },
    }  
  },
};

export default schema;
