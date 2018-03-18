import { registerFragment } from 'meteor/vulcan:core';

// ------------------------------ Vote ------------------------------ //

// note: fragment used by default on the UsersProfile fragment
registerFragment(/* GraphQL */`
  fragment VotedItem on Vote {
    # vulcan:voting
    documentId
    power
    votedAt
  }
`);

// ------------------------------ Users ------------------------------ //

// note: fragment used by default on UsersProfile, PostsList & CommentsList fragments
registerFragment(/* GraphQL */`
  fragment UsersMinimumInfo on User {
    # vulcan:users
    _id
    slug
    username
    displayName
    emailHash
    avatarUrl
    pageUrl
    # userRole
  }
`);

registerFragment(/* GraphQL */`
  fragment UsersProfile on User {
    # vulcan:users
    ...UsersMinimumInfo
    createdAt
    isAdmin

    # bio
    # htmlBio
    # twitterUsername
    # website

    gender
    mobileNumber
    college
    professionalLicenseNumber
    # areaPractise
    certification
    affiliation
    awards
    
    groups
    karma
    # vulcan:posts
    postCount
    # vulcan:comments
    commentCount
    # categories
    categories {
      ...CategoriesMinimumInfo
    }
  }
`);

