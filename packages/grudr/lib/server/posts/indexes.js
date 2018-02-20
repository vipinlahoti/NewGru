import { Posts } from '../../modules/posts/index.js';

Posts._ensureIndex({"status": 1});
Posts._ensureIndex({"status": 1, "postedAt": 1});
