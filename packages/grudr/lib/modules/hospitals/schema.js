/*
 * Hospitals schema
 */

import Users from 'meteor/vulcan:users';
import { Utils } from 'meteor/vulcan:core';
import FormsUpload from 'meteor/vulcan:forms-upload';

export function getHospitalsAsOptions (hospitals) {
  // give the form component (here: checkboxgroup) exploitable data
  return hospitals.map(hospital => ({
    value: hospital._id,
    label: hospital.name,
    // slug: hospital.slug, // note: it may be used to look up from prefilled props
  }));
}

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
    Name
  */
  name: {
    type: String,
    optional: false,
    max: 500,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    control: 'text',
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
   Hospital Thumbnail
   */
  thumbnailUrl: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    control: FormsUpload, // use the FormsUpload form component
    form: {
      options: {
        preset: 'article_thumbnail'
      }
    }
  },
  contact: {
    type: String,
    control: "number",
    optional: true,
    insertableBy: ['members'],
    editableBy: ['members'],
    viewableBy: ['members']
  },
  consultationFee: {
    type: String,
    control: "number",
    optional: true,
    insertableBy: ['members'],
    editableBy: ['members'],
    viewableBy: ['members']
  },
  country: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members']
  },
  state: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members']
  },
  city: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members']
  },
  address: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members']
  },
  address2: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members']
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
    Timestamp of the last review
  */
  lastReviewedAt: {
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

  // GraphQL-only fields
  pageUrl: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    resolveAs: {
      type: 'String',
      resolver: (hospital, args, { Hospitals }) => {
        return Hospitals.getPageUrl(hospital, true);
      },
    }
  },

  reviewsCount: {
    type: Number,
    optional: true,
    viewableBy: ['guests'],
    resolveAs: {
      type: 'Int',
      resolver: (hospital, args, { Reviews }) => {
        const reviewsCount = Reviews.find({ hospitalId: hospital._id }).count();
        return reviewsCount;
      },
    }
  },

  reviews: {
    type: Array,
    optional: true,
    viewableBy: ['guests'],
    resolveAs: {
      arguments: 'limit: Int = 5',
      type: '[Review]',
      resolver: (hospital, { limit }, { currentUser, Users, Reviews }) => {
        const reviews = Reviews.find({ hospitalId: hospital._id }, { limit }).fetch();

        // restrict documents fields
        const viewableReviews = _.filter(reviews, reviews => Reviews.checkAccess(currentUser, reviews));
        const restrictedReviews = Users.restrictViewableFields(currentUser, Reviews, viewableReviews);

        return restrictedReviews;
      }
    }
  },

  emailShareUrl: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    resolveAs: {
      type: 'String',
      resolver: (hospital, args, { Hospitals }) => {
        return Hospitals.getEmailShareUrl(hospital);
      }
    }
  },

  twitterShareUrl: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    resolveAs: {
      type: 'String',
      resolver: (hospital, args, { Hospitals }) => {
        return Hospitals.getTwitterShareUrl(hospital);
      }
    }
  },

  facebookShareUrl: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    resolveAs: {
      type: 'String',
      resolver: (hospital, args, { Hospitals }) => {
        return Hospitals.getFacebookShareUrl(hospital);
      }
    }
  },

};

export default schema;
