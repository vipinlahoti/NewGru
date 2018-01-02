import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
  fragment QuestionsList on Question {
    # questions
    _id
    title
    # url
    slug
    postedAt
    createdAt
    sticky
    status
    excerpt
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
    # answers
    answerCount
    answerers {
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
    body
    htmlBody
  }
`);

