import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
  fragment HospitalsList on Hospital {
    # hospitals
    _id
    name
    slug
    sticky
    # thumbnail
    thumbnailUrl
    # categories
    categories {
     ...CategoriesMinimumInfo
    }
    # reviews
    reviewCount
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
    createdAt
    viewCount
    clickCount
    # users
    userId
    user {
      ...UsersMinimumInfo
    }
    reviewers {
      ...UsersMinimumInfo
    }
  }
`);

