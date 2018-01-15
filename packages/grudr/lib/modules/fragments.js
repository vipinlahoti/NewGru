import { registerFragment, extendFragment } from 'meteor/vulcan:core';

// ------------------------------ Vote ------------------------------ //

// note: fragment used by default on the UsersProfile fragment
registerFragment(`
  fragment VotedItem on Vote {
    # vulcan:voting
    documentId
    power
    votedAt
  }
`);

// ------------------------------ Users ------------------------------ //

// note: fragment used by default on UsersProfile, PostsList & CommentsList fragments
registerFragment(`
  fragment UsersMinimumInfo on User {
    # vulcan:users
    _id
    slug
    username
    displayName
    emailHash
    avatarUrl
    userRole
    userRolePrefix
    isDoctor
    groups
  }
`);

registerFragment(`
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
    college
    city
    state
    country
    # professionalLicenseNumber
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
    # vulcan:questions
    questionCount
    # vulcan:answers
    answerCount

    # categories
    # categories {
    #  ...CategoriesMinimumInfo
    # }
  }
`);

extendFragment('UsersCurrent', `
  userRole
  isDoctor
  isWriter
`);
