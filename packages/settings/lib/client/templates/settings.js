Template.settings.helpers({
  settings: function () {
    return Settings.findOne();
  }
});

AutoForm.addHooks(['updateSettingsForm', 'insertSettingsForm'], {
    onSuccess: function(operation, result) {
      this.template.$('button[type=submit]').removeClass('loading');
      Bert.alert( 'Settings saved', 'success', 'growl-top-right' );
      $('body').scrollTop(0);
    },

    onError: function(operation, error) {
      this.template.$('button[type=submit]').removeClass('loading');
      Bert.alert( error, 'danger', 'growl-top-right' );
      $('body').scrollTop(0);
    }
});

AutoForm.hooks({
  updateSettingsForm: {
    before: {
      update: function(modifier) {
        this.template.$('button[type=submit]').addClass('loading');
        return modifier;
      }
    }

  },
  insertSettingsForm: {
    before: {
      insert: function(doc) {
        this.template.$('button[type=submit]').addClass('loading');
        return doc;
      }
    }
  }
});
