/*

Redux

*/

import { addAction, addReducer } from 'meteor/vulcan:core';

addAction({
  hospitalsViewed: {
    setViewed: (hospitalId) => ({
      type: 'SET_VIEWED',
      hospitalId,
    }),
  },
});

addReducer({
  hospitalsViewed: (state = [], action) => {
    if (action.type === 'SET_VIEWED') {
      return [
        ...state,
        action.hospitalId,
      ];
    }
    
    return state;
  },
});
