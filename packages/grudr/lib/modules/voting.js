import { makeVoteable } from 'meteor/vulcan:voting';
import { Posts } from './posts/index.js';
import { Comments } from './comments/index.js';
import { Hospitals } from './hospitals/index.js';
import { Reviews } from './reviews/index.js';

makeVoteable(Posts);
makeVoteable(Comments);
makeVoteable(Hospitals);
makeVoteable(Reviews);
