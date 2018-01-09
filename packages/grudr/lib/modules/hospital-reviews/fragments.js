import { registerFragment } from 'meteor/vulcan:core';

// ----------------------------- HosReviews ------------------------------ //

registerFragment(`
  fragment HosReviewsList on HosReview {
    # vulcan:hosReviews
    _id
    hospitalId
    parentHosReviewId
    topLevelHosReviewId
    body
    postedAt
    # vulcan:users
    userId
    user {
      ...UsersMinimumInfo
    }
    # vulcan:hospitals
    hospital {
      _id
      hosReviewCount
      hosReviewers {
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

