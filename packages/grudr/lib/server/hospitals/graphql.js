/*
 * GraphQL config
 */

import { addGraphQLMutation, addGraphQLResolvers } from 'meteor/vulcan:core';

const specificResolvers = {
  Mutation: {
    increaseHospitalViewCount(root, { hospitalId }, context) {
      return context.Hospitals.update({_id: hospitalId}, { $inc: { viewCount: 1 }});
    }
  }
};

addGraphQLResolvers(specificResolvers);
addGraphQLMutation('increaseHospitalViewCount(hospitalId: String): Float');
