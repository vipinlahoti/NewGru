Template.checker.helpers({
  allow () {
    return Users.can[this.check](Meteor.user(), this.doc);
  }
});
