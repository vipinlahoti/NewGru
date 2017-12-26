import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
  fragment QuestionsList on Question {
    # questions
    _id
    title
    slug
    questionedAt
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
    # comments
    commentCount
    commenters {
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
  fragment QuestionsPage on Question {
    ...QuestionsList
  }
`);

