// Session variables
Session.set('appIsReady', false);

Meteor.startup(function () {
  var link = {rel: "alternate", type: "application/rss+xml", href: "/feed.xml", title: "New articles"};
  DocHead.addLink(link);
});

// Global Subscriptions

Grudr.subsManager = new SubsManager({
  // cache recent 50 subscriptions
  cacheLimit: 50,
  // expire any subscription after 30 minutes
  expireIn: 30
});
