Releases = new Meteor.Collection('releases');

Grudr.modules.add("hero", {
  template: 'current_release'
});

Grudr.subscriptions.preload('currentRelease');

Meteor.startup(function () {
  Releases.allow({
    insert: Users.is.adminById,
    update: Users.is.adminById,
    remove: Users.is.adminById
  });
});
