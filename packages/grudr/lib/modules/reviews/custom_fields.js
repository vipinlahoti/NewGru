import { Hospitals } from '../hospitals/index.js';
import Users from 'meteor/vulcan:users';

Users.addField([
  /**
    Count of the user's reviews
  */
  {
    fieldName: 'reviewCount',
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
    Count of the hospital's reviews
  */
  {
    fieldName: 'reviewCount',
    fieldSchema: {
      type: Number,
      optional: true,
      defaultValue: 0,
      viewableBy: ['guests'],
    }
  },
  /**
    An array containing the `_id`s of reviewers
  */
  {
    fieldName: 'reviewers',
    fieldSchema: {
      type: Array,
      optional: true,
      resolveAs: {
        fieldName: 'reviewers',
        type: '[User]',
        resolver: async (hospital, args, {currentUser, Users}) => {
          if (!hospital.reviewers) return [];
          const reviewers = await Users.loader.loadMany(hospital.reviewers);
          return Users.restrictViewableFields(currentUser, Users, reviewers);
        },
      },
      viewableBy: ['guests'],
    }
  },
  {
    fieldName: 'reviewers.$',
    fieldSchema: {
      type: String,
      optional: true
    }
  }
]);
