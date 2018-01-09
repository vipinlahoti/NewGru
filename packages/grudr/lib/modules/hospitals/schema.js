/*
Hospitals schema
*/

import Users from 'meteor/vulcan:users';
import { Hospitals } from './collection.js';
import { Utils } from 'meteor/vulcan:core';
import moment from 'moment';
import FormsUpload from 'meteor/vulcan:forms-upload';

/**
 * @summary Hospitals config namespace
 * @type {Object}
 */
const formGroups = {
  admin: {
    name: 'admin',
    order: 2
  }
};

/**
 * @summary Hospitals schema
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
    Timetstamp of hospital creation
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
    Timestamp of hospital first appearing on the site (i.e. being approved)
  */
  postedAt: {
    type: Date,
    optional: true,
    viewableBy: ['guests'],
    insertableBy: ['admins'],
    editableBy: ['admins'],
    control: 'datetime',
    group: formGroups.admin,
    onInsert: (hospital, currentUser) => {
      // Set the hospital's postedAt if it's going to be approved
      if (!hospital.postedAt && Hospitals.getDefaultStatus(currentUser) === Hospitals.config.STATUS_APPROVED) {
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
    onInsert: (hospital) => {
      return Utils.slugify(hospital.title);
    },
    onEdit: (modifier, hospital) => {
      if (modifier.$set.title) {
        return Utils.slugify(modifier.$set.title);
      }
    }
  },
  /**
  Thumbnail Image
  */
  thumbnailUrl: {
    type: String,
    viewableBy: ['guests'],
    insertableBy: ['doctors'],
    editableBy: ['doctors'],
    control: FormsUpload, // use the FormsUpload form component
    form: {
      options: {
        preset: 'article_thumbnail'
      }
    }
  },
  /**
    Count of how many times the hospital's page was viewed
  */
  viewCount: {
    type: Number,
    optional: true,
    viewableBy: ['admins'],
    defaultValue: 0
  },
  /**
    Timestamp of the last hosReview
  */
  lastHosReviewedAt: {
    type: Date,
    optional: true,
    viewableBy: ['guests'],
  },
  /**
    Count of how many times the hospital's link was clicked
  */
  clickCount: {
    type: Number,
    optional: true,
    viewableBy: ['admins'],
    defaultValue: 0
  },
  /**
    The hospital's status. One of pending (`1`), approved (`2`), or deleted (`3`)
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
        return Hospitals.getDefaultStatus(currentUser);
      }
    },
    onEdit: (modifier, document, currentUser) => {
      // if for some reason hospital status has been removed, give it default status
      if (modifier.$unset && modifier.$unset.status) {
        return Hospitals.getDefaultStatus(currentUser);
      }
    },
    form: {
      options: () => Hospitals.statuses,
    },
    group: formGroups.admin
  },
  /**
    Whether a hospital is scheduled in the future or not
  */
  isFuture: {
    type: Boolean,
    optional: true,
    viewableBy: ['guests'],
    onInsert: (hospital) => {
      // Set the hospital's isFuture to true if necessary
      if (hospital.postedAt) {
        const hospitalTime = new Date(hospital.postedAt).getTime();
        const currentTime = new Date().getTime() + 1000;
        return hospitalTime > currentTime; // round up to the second
      }
    },
    onEdit: (modifier, hospital) => {
      // Set the hospital's isFuture to true if necessary
      if (modifier.$set.postedAt) {
        const hospitalTime = new Date(modifier.$set.postedAt).getTime();
        const currentTime = new Date().getTime() + 1000;
        if (hospitalTime > currentTime) {
          // if a hospital's postedAt date is in the future, set isFuture to true
          return true;
        } else if (hospital.isFuture) {
          // else if a hospital has isFuture to true but its date is in the past, set isFuture to false
          return false;
        }
      }
    }
  },
  /**
    Whether the hospital is sticky (pinned to the top of hospitals lists)
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
    onInsert: (hospital) => {
      if(!hospital.sticky) {
        return false;
      }
    },
    onEdit: (modifier, hospital) => {
      if (!modifier.$set.sticky) {
        return false;
      }
    }
  },
  /**
    Save info for later spam checking on a hospital. We will use this for the akismet package
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
    The hospital author's name
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
    The hospital author's `_id`.
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
      resolver: async (hospital, args, context) => {
        if (!hospital.userId) return null;
        const user = await context.Users.loader.load(hospital.userId);
        return context.Users.restrictViewableFields(context.currentUser, context.Users, user);
      },
      addOriginalField: true
    },
  },

  /**
    Used to keep track of when a hospital has been included in a newsletter
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
      resolver: (hospital, args, context) => {
        return Utils.getDomain(hospital.url);
      },
    }  
  },

  pageUrl: {
    type: String,
    optional: true,
    resolveAs: {
      type: 'String',
      resolver: (hospital, args, context) => {
        return Hospitals.getPageUrl(hospital, true);
      },
    }  
  },

  postedAtFormatted: {
    type: String,
    optional: true,
    resolveAs: {
      type: 'String',
      resolver: (hospital, args, context) => {
        return moment(hospital.postedAt).format('dddd, MMMM Do YYYY');
      }
    }  
  },

  hosReviewsCount: {
    type: Number,
    optional: true,
    resolveAs: {
      type: 'Int',
      resolver: (hospital, args, { HosReviews }) => {
        const hosReviewsCount = HosReviews.find({ hospitalId: hospital._id }).count();
        return hosReviewsCount;
      },
    }  
  },

  hosReviews: {
    type: Array,
    optional: true,
    resolveAs: {
        arguments: 'limit: Int = 5',
        type: '[HosReview]',
        resolver: (hospital, { limit }, { currentUser, Users, HosReviews }) => {
          const hosReviews = HosReviews.find({ hospitalId: hospital._id }, { limit }).fetch();

          // restrict documents fields
          const viewableHosReviews = _.filter(hosReviews, hosReviews => HosReviews.checkAccess(currentUser, hosReviews));
          const restrictedHosReviews = Users.restrictViewableFields(currentUser, HosReviews, viewableHosReviews);
        
          return restrictedHosReviews;
        }
      }
  },

  emailShareUrl: {
    type: String,
    optional: true,
    resolveAs: {
      type: 'String',
      resolver: (hospital) => {
        return Hospitals.getEmailShareUrl(hospital);
      }
    }
  }
  
};

export default schema;
