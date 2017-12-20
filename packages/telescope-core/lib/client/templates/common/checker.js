Template.checker.helpers({
  allow: function () {
    return Users.can[this.check](Meteor.user(), this.doc);

    console.log(this.check)
  }
});
