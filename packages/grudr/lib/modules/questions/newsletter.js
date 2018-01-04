/*

Newsletter setup

*/

import VulcanEmail from 'meteor/vulcan:email';
import { addCallback } from 'meteor/vulcan:core';
// email test routes (make available to client & server)
import Newsletters from 'meteor/vulcan:newsletter';
import { Questions } from './collection.js';
import moment from 'moment';

VulcanEmail.addEmails({

  newsletter: {
    template: 'newsletter',
    path: '/email/newsletter',
    subject(data) {
      return _.isEmpty(data) ? '[Generated on server]' : Newsletters.getSubject(data.QuestionsList);
    },
    data() {
      return {
        date: moment().format('MMMM D YYYY')
      }
    },
    query: `
      query NewsletterQuery($terms: JSON){
        SiteData{
          title
        }
        QuestionsList(terms: $terms){

          _id
          title
          pageUrl
          linkUrl
          domain
          thumbnailUrl
          answersCount
          postedAtFormatted

          user{
            pageUrl
            displayName
          }

          answers(limit: 3){
            user{
              displayName
              avatarUrl
              pageUrl
            }
            postedAt
          }
          
        }
      }
    `,
    isValid(data) {
      return data.QuestionsList && data.QuestionsList.length;
    },
    testVariables() {
      return {
        terms : {
          view: 'newsletter'
        }
      }
    }
  },

  newsletterConfirmation: {
    template: 'newsletterConfirmation',
    path: '/email/newsletter-confirmation',
    subject() {
      return 'Newsletter confirmation';
    }
  }

});

function MarkQuestionsAsScheduled (email) {
  const questionsIds = _.pluck(email.data.QuestionsList, '_id');
  console.log(questionsIds)
  const updated = Questions.update({_id: {$in: questionsIds}}, {$set: {scheduledAt: new Date()}}, {multi: true}) // eslint-disable-line
  console.log(`updated ${updated} questions`)
}
addCallback('newsletter.send.async', MarkQuestionsAsScheduled);
