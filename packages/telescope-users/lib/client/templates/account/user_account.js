Template.user_account.helpers({
  user: function  () {
    return this;
  },
  userFields: function () {
    var fields = Meteor.users.simpleSchema().getEditableFields(Meteor.user());
    return fields;
  },
  isUsingPassword: function  () {
    return this.services && !!this.services.password;
  }
});


AutoForm.hooks({
  editUserForm: {

    onSuccess: function(operation, result) {
      this.template.$('button[type=submit]').removeClass('loading');
      Messages.flash('User profile saved', 'success');
      Messages.clearSeen();
    },

    onError: function(operation, error) {
      this.template.$('button[type=submit]').removeClass('loading');
      Messages.flash(error.message.split('|')[0], 'error'); // workaround because error.details returns undefined
      Messages.clearSeen();
    }

  }
});
