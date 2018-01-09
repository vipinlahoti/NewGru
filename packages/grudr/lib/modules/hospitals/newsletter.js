/*

Newsletter setup

*/

import VulcanEmail from 'meteor/vulcan:email';
import { addCallback } from 'meteor/vulcan:core';
// email test routes (make available to client & server)
import Newsletters from 'meteor/vulcan:newsletter';
import { Hospitals } from './collection.js';
import moment from 'moment';

VulcanEmail.addEmails({

  newsletter: {
    template: 'newsletter',
    path: '/email/newsletter',
    subject(data) {
      return _.isEmpty(data) ? '[Generated on server]' : Newsletters.getSubject(data.HospitalsList);
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
        HospitalsList(terms: $terms){

          _id
          title
          pageUrl
          domain
          thumbnailUrl
          hosReviewsCount
          postedAtFormatted

          user{
            pageUrl
            displayName
          }

          hosReviews(limit: 3){
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
      return data.HospitalsList && data.HospitalsList.length;
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

function MarkHospitalsAsScheduled (email) {
  const hospitalsIds = _.pluck(email.data.HospitalsList, '_id');
  console.log(hospitalsIds)
  const updated = Hospitals.update({_id: {$in: hospitalsIds}}, {$set: {scheduledAt: new Date()}}, {multi: true}) // eslint-disable-line
  console.log(`updated ${updated} hospitals`)
}
addCallback('newsletter.send.async', MarkHospitalsAsScheduled);
