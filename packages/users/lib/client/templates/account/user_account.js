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
      Bert.alert( 'Profile saved', 'success', 'growl-top-right' );
    },

    onError: function(operation, error) {
      this.template.$('button[type=submit]').removeClass('loading');
      Bert.alert( error.message.split('|')[0], 'danger', 'growl-top-right' );
    }

  }
});
