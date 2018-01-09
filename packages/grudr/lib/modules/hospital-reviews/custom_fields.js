import { Hospitals } from '../hospitals/index.js';
import Users from 'meteor/vulcan:users';

Users.addField([
  /**
    Count of the user's hosReviews
  */
  {
    fieldName: 'hosReviewCount',
    fieldSchema: {
      type: Number,
      optional: true,
      defaultValue: 0,
      viewableBy: ['guests'],
    }
  }
]);

Hospitals.addField([
  /**
    Count of the hospital's hosReviews
  */
  {
    fieldName: 'hosReviewCount',
    fieldSchema: {
      type: Number,
      optional: true,
      defaultValue: 0,
      viewableBy: ['guests'],
    }
  },
  /**
    An array containing the `_id`s of hosReviewers
  */
  {
    fieldName: 'hosReviewers',
    fieldSchema: {
      type: Array,
      optional: true,
      resolveAs: {
        fieldName: 'hosReviewers',
        type: '[User]',
        resolver: async (hospital, args, {currentUser, Users}) => {
          if (!hospital.hosReviewers) return [];
          const hosReviewers = await Users.loader.loadMany(hospital.hosReviewers);
          return Users.restrictViewableFields(currentUser, Users, hosReviewers);
        },
      },
      viewableBy: ['guests'],
    }
  },
  {
    fieldName: 'hosReviewers.$',
    fieldSchema: {
      type: String,
      optional: true
    }
  }
]);
