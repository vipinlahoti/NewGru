Settings.addField({
  fieldName: 'emailNotifications',
  fieldSchema: {
    type: Boolean,
    optional: true,
    defaultValue: true,
    autoform: {
      group: 'notifications',
      instructions: 'Enable email notifications for new articles and new comments (requires restart).'
    }
  }
});

// make it possible to disable notifications on a per-comment basis
Comments.addField(
  {
    fieldName: 'disableNotifications',
    fieldSchema: {
      type: Boolean,
      optional: true,
      autoform: {
        omit: true
      }
    }
  }
);

// make it possible to disable notifications on a per-answer basis
Answers.addField(
  {
    fieldName: 'disableAnswersNotifications',
    fieldSchema: {
      type: Boolean,
      optional: true,
      autoform: {
        omit: true
      }
    }
  }
);

// Add notifications options to user profile settings
Users.addField([
  {
    fieldName: 'grudr.notifications.users',
    fieldSchema: {
      label: 'New users',
      type: Boolean,
      optional: true,
      defaultValue: false,
      editableBy: ['admin'],
      autoform: {
        group: 'Email Notifications'
      }
    }
  },
  {
    fieldName: 'grudr.notifications.articles',
    fieldSchema: {
      label: 'New articles',
      type: Boolean,
      optional: true,
      defaultValue: false,
      editableBy: ['admin'],
      autoform: {
        group: 'Email Notifications'
      }
    }
  },
  {
    fieldName: 'grudr.notifications.comments',
    fieldSchema: {
      label: 'Comments on my articles',
      type: Boolean,
      optional: true,
      defaultValue: true,
      editableBy: ['admin', 'member'],
      autoform: {
        group: 'Email Notifications'
      }
    }
  },
  {
    fieldName: 'grudr.notifications.replies',
    fieldSchema: {
      label: 'Replies to my comments',
      type: Boolean,
      optional: true,
      defaultValue: true,
      editableBy: ['admin', 'member'],
      autoform: {
        group: 'Email Notifications'
      }
    }
  },
  {
    fieldName: 'grudr.notifications.questions',
    fieldSchema: {
      label: 'New questions',
      type: Boolean,
      optional: true,
      defaultValue: false,
      editableBy: ['admin'],
      autoform: {
        group: 'Email Notifications'
      }
    }
  },
  {
    fieldName: 'grudr.notifications.answers',
    fieldSchema: {
      label: 'Answers on my questions',
      type: Boolean,
      optional: true,
      defaultValue: true,
      editableBy: ['admin', 'member'],
      autoform: {
        group: 'Email Notifications'
      }
    }
  },
]);
