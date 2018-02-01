import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
  fragment HospitalsList on Hospital {
    # hospitals
    _id
    name
    contact
    consultationFee
    country
    state
    city
    address
    address2
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

  }
`);

registerFragment(`
  fragment HospitalsPage on Hospital {
    ...HospitalsList
  }
`);

