/*

Custom fields on Users collection

*/

import Users from 'meteor/vulcan:users';

Users.addField([
  /**
    Count of the user's questions
  */
  {
    fieldName: 'questionCount',
    fieldSchema: {
      type: Number,
      optional: true,
      defaultValue: 0,
      viewableBy: ['guests'],
    }
  },
  /**
    The user's associated questions (GraphQL only)
  */
  {
    fieldName: 'questions',
    fieldSchema: {
      type: Array,
      optional: true,
      viewableBy: ['guests'],
      resolveAs: {
        arguments: 'limit: Int = 5',
        type: '[Question]',
        resolver: (user, { limit }, { currentUser, Users, Questions }) => {
          const questions = Questions.find({ userId: user._id }, { limit }).fetch();

          // restrict documents fields
          const viewableQuestions = _.filter(questions, question => Questions.checkAccess(currentUser, question));
          const restrictedQuestions = Users.restrictViewableFields(currentUser, Questions, viewableQuestions);
        
          return restrictedQuestions;
        }
      }
    }
  }
]);
