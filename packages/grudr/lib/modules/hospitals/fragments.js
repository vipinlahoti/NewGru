import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
  fragment HospitalsList on Hospital {
    # hospitals
    _id
    title
    slug
    postedAt
    createdAt
    status
    viewCount
    clickCount
    # users
    userId
    user {
      ...UsersMinimumInfo
    }
    # thumbnail
    thumbnailUrl
    # categories
    categories {
      ...CategoriesMinimumInfo
    }
    # hosReviews
    hosReviewCount
    hosReviewers {
      ...UsersMinimumInfo
    }
    # voting
    currentUserVotes{
      ...VoteFragment
    }
    baseScore
    score
  }
`);

registerFragment(`
  fragment HospitalsPage on Hospital {
    ...HospitalsList
  }
`);

