/*

GraphQL config

*/

import { addGraphQLMutation, addGraphQLResolvers } from 'meteor/vulcan:core';

const specificResolvers = {
  Mutation: {
    increaseQuestionViewCount(root, { questionId }, context) {
      return context.Questions.update({_id: questionId}, { $inc: { viewCount: 1 }});
    }
  }
};

addGraphQLResolvers(specificResolvers);
addGraphQLMutation('increaseQuestionViewCount(questionId: String): Float');



