import Users from 'meteor/vulcan:users';
import { Hospitals } from './collection.js'

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
      createdAt: -1
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
    options: {limit: 5, sort: {createdAt: -1}}
  };
});

/**
 * @summary User downvoted hospitals view
 */
Hospitals.addView('userDownvotedHospitals', (terms, apolloClient) => {
  var user = apolloClient ? Users.findOneInStore(apolloClient.store, terms.userId) : Users.findOne(terms.userId);

  var hospitalsIds = _.pluck(user.downvotedHospitals, 'documentId');
  // TODO: sort based on votedAt timestamp and not createdAt, if possible
  return {
    selector: {_id: {$in: hospitalsIds}},
    options: {limit: 5, sort: {createdAt: -1}}
  };
});
