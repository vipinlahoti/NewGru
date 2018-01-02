import { SyncedCron } from 'meteor/percolatestudio:synced-cron';
// import moment from 'moment';
import { Questions } from '../../modules/questions/index.js';

SyncedCron.options = {
  log: true,
  collectionName: 'cronHistory',
  utc: false,
  collectionTTL: 172800
};


const addJob = function () {
  SyncedCron.add({
    name: 'checkScheduledQuestions',
    schedule(parser) {
      return parser.text('every 10 minutes');
    },
    job() {
      // fetch all questions tagged as future
      const scheduledQuestions = Questions.find({isFuture: true}, {fields: {_id: 1, status: 1, postedAt: 1, userId: 1, title: 1}}).fetch();

      // filter the scheduled questions to retrieve only the one that should update, considering their schedule
      const questionsToUpdate = scheduledQuestions.filter(question => question.postedAt <= new Date());

      // update questions found
      if (!_.isEmpty(questionsToUpdate)) {
        const questionsIds = _.pluck(questionsToUpdate, '_id');
        Questions.update({_id: {$in: questionsIds}}, {$set: {isFuture: false}}, {multi: true});

        // log the action
        console.log('// Scheduled questions approved:', questionsIds); // eslint-disable-line
      }
    }
  });
};

Meteor.startup(function () {
  addJob();
});

