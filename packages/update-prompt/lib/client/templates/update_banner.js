Template.update_banner.helpers({
  showBanner: function () {
    return Session.get('updateVersion');
  },
  version: function () {
    return Session.get('updateVersion');
  },
  currentVersion: function () {
    return Grudr.VERSION;
  },
  message: function () {
    return Session.get('updateMessage');
  }
});
