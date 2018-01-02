import Users from 'meteor/vulcan:users';
import { Questions } from './collection.js'
import moment from 'moment';
import Newsletters from 'meteor/vulcan:newsletter';

/**
 * @summary Base parameters that will be common to all other view unless specific properties are overwritten
 */
Questions.addDefaultView(terms => ({
  selector: {
    status: Questions.config.STATUS_APPROVED,
    isFuture: {$ne: true} // match both false and undefined
  }
}));

/**
 * @summary Top view
 */
Questions.addView('top', terms => ({
  options: {
    sort: {sticky: -1, score: -1}
  }
}));

/**
 * @summary New view
 */
Questions.addView('new', terms => ({
  options: {
    sort: {sticky: -1, postedAt: -1}
  }
}));

/**
 * @summary Best view
 */
Questions.addView('best', terms => ({
  options: {
    sort: {sticky: -1, baseScore: -1}
  }
}));

/**
 * @summary Pending view
 */
Questions.addView('pending', terms => ({
  selector: {
    status: Questions.config.STATUS_PENDING
  },
  options: {
    sort: {createdAt: -1}
  }
}));

/**
 * @summary Rejected view
 */
Questions.addView('rejected', terms => ({
  selector: {
    status: Questions.config.STATUS_REJECTED
  },
  options: {
    sort: {createdAt: -1}
  }
}));

/**
 * @summary Scheduled view
 */
Questions.addView('scheduled', terms => ({
  selector: {
    status: Questions.config.STATUS_APPROVED,
    isFuture: true
  },
  options: {
    sort: {postedAt: -1}
  }
}));

/**
 * @summary User questions view
 */
Questions.addView('userQuestions', terms => ({
  selector: {
    userId: terms.userId,
    status: Questions.config.STATUS_APPROVED,
    isFuture: {$ne: true}
  },
  options: {
    limit: 5,
    sort: {
      postedAt: -1
    }
  }
}));

/**
 * @summary User upvoted questions view
 */
Questions.addView('userUpvotedQuestions', (terms, apolloClient) => {
  var user = apolloClient ? Users.findOneInStore(apolloClient.store, terms.userId) : Users.findOne(terms.userId);

  var questionsIds = _.pluck(user.upvotedQuestions, 'documentId');
  return {
    selector: {_id: {$in: questionsIds}, userId: {$ne: terms.userId}}, // exclude own questions
    options: {limit: 5, sort: {postedAt: -1}}
  };
});

/**
 * @summary User downvoted questions view
 */
Questions.addView('userDownvotedQuestions', (terms, apolloClient) => {
  var user = apolloClient ? Users.findOneInStore(apolloClient.store, terms.userId) : Users.findOne(terms.userId);

  var questionsIds = _.pluck(user.downvotedQuestions, 'documentId');
  // TODO: sort based on votedAt timestamp and not postedAt, if possible
  return {
    selector: {_id: {$in: questionsIds}},
    options: {limit: 5, sort: {postedAt: -1}}
  };
});

/**
 * @summary Newsletter questions view
 */
// create new 'newsletter' view for all questions from the past X days that haven't been scheduled yet
Questions.addView('newsletter', terms => {
  const lastNewsletter = Newsletters.findOne({}, {sort: {createdAt: -1}});

  // if there is a last newsletter and it was sent less than 7 days ago use its date, else default to questions from the last 7 days
  const lastWeek = moment().subtract(7, 'days');
  const lastNewsletterIsAfterLastWeek = lastNewsletter && moment(lastNewsletter.createdAt).isAfter(lastWeek);
  const after = lastNewsletterIsAfterLastWeek ? lastNewsletter.createdAt : lastWeek.toDate();

  return {
    selector: {
      scheduledAt: {$exists: false},
      postedAt: {$gte: after}
    },
    options: {
      sort: {baseScore: -1},
      limit: terms.limit
    }
  }
});
