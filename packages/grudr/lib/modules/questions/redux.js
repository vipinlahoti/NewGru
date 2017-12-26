/*

Redux

*/

import { addAction, addReducer } from 'meteor/vulcan:core';

addAction({
  questionsViewed: {
    setViewed: (questionId) => ({
      type: 'SET_VIEWED',
      questionId,
    }),
  },
});

addReducer({
  questionsViewed: (state = [], action) => {
    if (action.type === 'SET_VIEWED') {
      return [
        ...state,
        action.questionId,
      ];
    }
    
    return state;
  },
});
