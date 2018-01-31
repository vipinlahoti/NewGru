import { registerFragment } from 'meteor/vulcan:core';

// ----------------------------- Reviews ------------------------------ //

registerFragment(`
  fragment ReviewsList on Review {
    # vulcan:reviews
    _id
    hospitalId
    parentReviewId
    topLevelReviewId
    body
    createdAt
    # vulcan:users
    userId
    user {
      ...UsersMinimumInfo
    }
    # vulcan:hospitals
    hospital {
      _id
      reviewCount
      reviewers {
        ...UsersMinimumInfo
      }
    }
    # voting
    currentUserVotes{
      ...VoteFragment
    }
    baseScore
    score
  }
`);

