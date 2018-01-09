import { SyncedCron } from 'meteor/percolatestudio:synced-cron';
// import moment from 'moment';
import { Hospitals } from '../../modules/hospitals/index.js';

SyncedCron.options = {
  log: true,
  collectionName: 'cronHistory',
  utc: false,
  collectionTTL: 172800
};


const addJob = function () {
  SyncedCron.add({
    name: 'checkScheduledHospitals',
    schedule(parser) {
      return parser.text('every 10 minutes');
    },
    job() {
      // fetch all hospitals tagged as future
      const scheduledHospitals = Hospitals.find({isFuture: true}, {fields: {_id: 1, status: 1, postedAt: 1, userId: 1, title: 1}}).fetch();

      // filter the scheduled hospitals to retrieve only the one that should update, considering their schedule
      const hospitalsToUpdate = scheduledHospitals.filter(hospital => hospital.postedAt <= new Date());

      // update hospitals found
      if (!_.isEmpty(hospitalsToUpdate)) {
        const hospitalsIds = _.pluck(hospitalsToUpdate, '_id');
        Hospitals.update({_id: {$in: hospitalsIds}}, {$set: {isFuture: false}}, {multi: true});

        // log the action
        console.log('// Scheduled hospitals approved:', hospitalsIds); // eslint-disable-line
      }
    }
  });
};

Meteor.startup(function () {
  addJob();
});

