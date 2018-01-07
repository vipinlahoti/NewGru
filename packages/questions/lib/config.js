/**
 * Questions config namespace
 * @type {Object}
 */
Questions.config = {};


/**
 * Question Statuses
 */
Questions.config.questionStatuses = [
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

Questions.config.STATUS_PENDING = 1;
Questions.config.STATUS_APPROVED = 2;
Questions.config.STATUS_REJECTED = 3;
Questions.config.STATUS_SPAM = 4;
Questions.config.STATUS_DELETED = 5;
