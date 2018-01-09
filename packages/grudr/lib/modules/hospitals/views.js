import Users from 'meteor/vulcan:users';
import { Hospitals } from './collection.js'
import moment from 'moment';
import Newsletters from 'meteor/vulcan:newsletter';

/**
 * @summary Base parameters that will be common to all other view unless specific properties are overwritten
 */
Hospitals.addDefaultView(terms => ({
  selector: {
    status: Hospitals.config.STATUS_APPROVED,
    isFuture: {$ne: true} // match both false and undefined
  }
}));

/**
 * @summary Top view
 */
Hospitals.addView('top', terms => ({
  options: {
    sort: {score: -1}
  }
}));

/**
 * @summary New view
 */
Hospitals.addView('new', terms => ({
  options: {
    sort: {postedAt: -1}
  }
}));

/**
 * @summary Best view
 */
Hospitals.addView('best', terms => ({
  options: {
    sort: {baseScore: -1}
  }
}));

/**
 * @summary Pending view
 */
Hospitals.addView('pending', terms => ({
  selector: {
    status: Hospitals.config.STATUS_PENDING
  },
  options: {
    sort: {createdAt: -1}
  }
}));

/**
 * @summary Rejected view
 */
Hospitals.addView('rejected', terms => ({
  selector: {
    status: Hospitals.config.STATUS_REJECTED
  },
  options: {
    sort: {createdAt: -1}
  }
}));

/**
 * @summary Scheduled view
 */
Hospitals.addView('scheduled', terms => ({
  selector: {
    status: Hospitals.config.STATUS_APPROVED,
    isFuture: true
  },
  options: {
    sort: {postedAt: -1}
  }
}));

/**
 * @summary User hospitals view
 */
Hospitals.addView('userHospitals', terms => ({
  selector: {
    userId: terms.userId,
    status: Hospitals.config.STATUS_APPROVED,
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
 * @summary User upvoted hospitals view
 */
Hospitals.addView('userUpvotedHospitals', (terms, apolloClient) => {
  var user = apolloClient ? Users.findOneInStore(apolloClient.store, terms.userId) : Users.findOne(terms.userId);

  var hospitalsIds = _.pluck(user.upvotedHospitals, 'documentId');
  return {
    selector: {_id: {$in: hospitalsIds}, userId: {$ne: terms.userId}}, // exclude own hospitals
    options: {limit: 5, sort: {postedAt: -1}}
  };
});

/**
 * @summary User downvoted hospitals view
 */
Hospitals.addView('userDownvotedHospitals', (terms, apolloClient) => {
  var user = apolloClient ? Users.findOneInStore(apolloClient.store, terms.userId) : Users.findOne(terms.userId);

  var hospitalsIds = _.pluck(user.downvotedHospitals, 'documentId');
  // TODO: sort based on votedAt timestamp and not postedAt, if possible
  return {
    selector: {_id: {$in: hospitalsIds}},
    options: {limit: 5, sort: {postedAt: -1}}
  };
});

/**
 * @summary Newsletter hospitals view
 */
// create new 'newsletter' view for all hospitals from the past X days that haven't been scheduled yet
Hospitals.addView('newsletter', terms => {
  const lastNewsletter = Newsletters.findOne({}, {sort: {createdAt: -1}});

  // if there is a last newsletter and it was sent less than 7 days ago use its date, else default to hospitals from the last 7 days
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
