import { registerFragment } from 'meteor/vulcan:core';

// ----------------------------- Answers ------------------------------ //

registerFragment(`
  fragment AnswersList on Answer {
    # vulcan:answers
    _id
    questionId
    parentAnswerId
    topLevelAnswerId
    body
    htmlBody
    postedAt
    # vulcan:users
    userId
    user {
      ...UsersMinimumInfo
    }
    # vulcan:questions
    question {
      _id
      answerCount
      answerers {
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

