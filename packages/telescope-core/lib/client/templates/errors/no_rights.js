Template.no_rights.helpers({
  errorMessage: function () {
    return !!this.message ? this.message : 'Sorry you dont have the rights to view this page';
  }
});
