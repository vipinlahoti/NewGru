import { Questions } from '../../modules/questions/index.js';

Questions._ensureIndex({"status": 1, "isFuture": 1});
Questions._ensureIndex({"status": 1, "isFuture": 1, "postedAt": 1});
