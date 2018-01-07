Pages = new Mongo.Collection('pages');

Grudr.subscriptions.preload('pages');

Pages.schema = new SimpleSchema({
  title: {
    type: String
  },
  slug: {
    type: String,
    optional: true
  },
  content: {
    type: String,
    autoform: {
      rows: 10
    }
  },
  order: {
    type: Number,
    optional: true
  }
});

Meteor.startup(function(){
  Pages.internationalize();
});

Pages.attachSchema(Pages.schema);

Pages.before.insert(function (userId, doc) {
  // if no slug has been provided, generate one
  if (!doc.slug)
    doc.slug = Grudr.utils.slugify(doc.title);
});

Grudr.modules.add("primaryNav", {
  template: "pages_menu",
  order: 5
});

Grudr.modules.add("mobileNav", {
  template: 'pages_menu',
  order: 5
});

Meteor.startup(function () {
  Pages.allow({
    insert: Users.is.adminById,
    update: Users.is.adminById,
    remove: Users.is.adminById
  });

  Meteor.methods({
    insertPage: function(pageTitle, pageContent){
      check(pageTitle, String);
      check(pageContent, String);
      return Feeds.insert({title: pageTitle, content: pageContent});
    }
  });
});

Grudr.menuItems.add("adminMenu", {
  route: 'adminPages',
  label: "Pages",
  description: "Manage static pages"
});
