Template.users_dashboard.helpers({
  settings: function() {
    return {
      collection: 'all-users',
      rowsPerPage: 20,
      showFilter: true,
      fields: [
        { key: 'avatar', label: '', tmpl: Template.users_list_avatar, sortable: false },
        { key: 'createdAt', label: 'Member Since', tmpl: Template.users_list_created_at, sort: 'descending' },
        { key: 'isAdmin', label: 'Admin', fn: function(val){return val ? 'Yes':'No'} },
        { key: 'username', label: 'Username', tmpl: Template.users_list_username },
        { key: 'grudr.displayName', label: 'Display Name', tmpl: Template.users_list_display_name },
        { key: 'grudr.email', label: 'Email', tmpl: Template.users_list_email },
        { key: 'grudr.articleCount', label: 'Articles' },
        { key: 'grudr.commentCount', label: 'Comments' },
        { key: 'grudr.questionCount', label: 'Questions' },
        { key: 'grudr.answerCount', label: 'Answers' },
        { key: 'grudr.karma', label: 'Karma', fn: function(val){return Math.round(100*val)/100} },
        { key: 'grudr.inviteCount', label: 'Invites' },
        { key: 'grudr.isInvited', label: 'Invited', fn: function(val){return val ? 'Yes':'No'} },
        { key: 'actions', label: 'Actions', tmpl: Template.users_list_actions, sortable: false }
      ]
    };
  }
});
