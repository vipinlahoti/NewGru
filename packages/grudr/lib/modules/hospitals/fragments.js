import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
  fragment HospitalsList on Hospital {
    # hospitals
    _id
    name
    slug
    createdAt
    sticky
    viewCount
    clickCount
    # users
    userId
    user {
      ...UsersMinimumInfo
    }
    # thumbnail
    thumbnailUrl
    # reviews
    reviewCount
    reviewers {
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

