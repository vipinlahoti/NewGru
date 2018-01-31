/*
 * Reviews views
 */

import { Reviews } from './index.js';

Reviews.addView('hospitalReviews', function (terms) {
  return {
    selector: {hospitalId: terms.hospitalId},
    options: {sort: {createdAt: -1}}
  };
});

Reviews.addView('userReviews', function (terms) {
  return {
    selector: {userId: terms.userId},
    options: {sort: {createdAt: -1}}
  };
});
