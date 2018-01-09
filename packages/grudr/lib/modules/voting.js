import { makeVoteable } from 'meteor/vulcan:voting';
import { Posts } from './posts/index.js';
import { Comments } from './comments/index.js';

import { Questions } from './questions/index.js';
import { Answers } from './answers/index.js';

import { Hospitals } from './hospitals/index.js';
import { HosReviews } from './hospital-reviews/index.js';

makeVoteable(Posts);
makeVoteable(Comments);

makeVoteable(Questions);
makeVoteable(Answers);

makeVoteable(Hospitals);
makeVoteable(HosReviews);
