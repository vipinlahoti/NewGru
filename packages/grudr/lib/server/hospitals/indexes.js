import { Hospitals } from '../../modules/hospitals/index.js';

Hospitals._ensureIndex({"status": 1, "isFuture": 1});
Hospitals._ensureIndex({"status": 1, "isFuture": 1, "postedAt": 1});
