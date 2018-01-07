/**
 * Articles config namespace
 * @type {Object}
 */
Articles.config = {};


/**
 * Article Statuses
 */
Articles.config.articleStatuses = [
  {
    value: 1,
    label: function(){return 'Pending';}
  },
  {
    value: 2,
    label: function(){return 'Approved';}
  },
  {
    value: 3,
    label: function(){return 'Rejected';}
  },
  {
    value: 4,
    label: function(){return 'Spam';}
  },
  {
    value: 5,
    label: function(){return 'Deleted';}
  }
];

Articles.config.STATUS_PENDING = 1;
Articles.config.STATUS_APPROVED = 2;
Articles.config.STATUS_REJECTED = 3;
Articles.config.STATUS_SPAM = 4;
Articles.config.STATUS_DELETED = 5;
