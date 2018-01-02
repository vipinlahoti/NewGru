import { makeVoteable } from 'meteor/vulcan:voting';
import { Posts } from './posts/index.js';
import { Comments } from './comments/index.js';

import { Questions } from './questions/index.js';
import { Answers } from './answers/index.js';

makeVoteable(Posts);
makeVoteable(Comments);

makeVoteable(Questions);
makeVoteable(Answers);
