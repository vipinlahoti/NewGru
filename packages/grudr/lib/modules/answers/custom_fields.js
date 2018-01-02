import { Questions } from '../questions/index.js';
import Users from 'meteor/vulcan:users';

Users.addField([
  /**
    Count of the user's answers
  */
  {
    fieldName: 'answerCount',
    fieldSchema: {
      type: Number,
      optional: true,
      defaultValue: 0,
      viewableBy: ['guests'],
    }
  }
]);

Questions.addField([
  /**
    Count of the question's answers
  */
  {
    fieldName: 'answerCount',
    fieldSchema: {
      type: Number,
      optional: true,
      defaultValue: 0,
      viewableBy: ['guests'],
    }
  },
  /**
    An array containing the `_id`s of answerers
  */
  {
    fieldName: 'answerers',
    fieldSchema: {
      type: Array,
      optional: true,
      resolveAs: {
        fieldName: 'answerers',
        type: '[User]',
        resolver: async (question, args, {currentUser, Users}) => {
          if (!question.answerers) return [];
          const answerers = await Users.loader.loadMany(question.answerers);
          return Users.restrictViewableFields(currentUser, Users, answerers);
        },
      },
      viewableBy: ['guests'],
    }
  },
  {
    fieldName: 'answerers.$',
    fieldSchema: {
      type: String,
      optional: true
    }
  }
]);
