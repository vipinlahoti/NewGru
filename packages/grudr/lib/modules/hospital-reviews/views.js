/*

HosReviews views

*/

import { HosReviews } from './index.js';

HosReviews.addView('hospitalHosReviews', function (terms) {
  return {
    selector: {hospitalId: terms.hospitalId},
    options: {sort: {postedAt: -1}}
  };
});

HosReviews.addView('userHosReviews', function (terms) {
  return {
    selector: {userId: terms.userId},
    options: {sort: {postedAt: -1}}
  };
});
