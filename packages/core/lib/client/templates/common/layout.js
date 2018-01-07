var init = _.once(function () {
  var title = Settings.get("title", "Grudr");
  if (!!Settings.get("tagline")) {
    title += ": "+Settings.get("tagline");
  }
  DocHead.setTitle(title);

  if (!!Settings.get("description")) {
    DocHead.addMeta({name: "description", content: Settings.get("description")});
    DocHead.addMeta({property: "og:description", content: Settings.get("description")});
  }

  if (!!Settings.get("siteImage")) {
    DocHead.addMeta({property: "og:image", content: Settings.get("siteImage")});
  }

  Events.analyticsInit();
});

Template.layout.onCreated(function (){

  DocHead.setTitle("Loading");

  Tracker.autorun(function () {
    if (FlowRouter.subsReady()) {
      init();
    }
  });

});

Template.layout.helpers({
  appIsReady: function () {
    return FlowRouter.subsReady();
  },
  notAllowed: function () {

    FlowRouter.watchPathChange();
    var user = Meteor.user();
    var userRoutes = ['signIn', 'signUp', 'changePwd', 'forgotPwd', 'resetPwd', 'enrollAccount', 'verifyEmail', 'signOut', 'userEdit', 'userProfile'];
    var isOnUserRoute = _.contains(userRoutes, FlowRouter.getRouteName());
    var authRoutes = ['questionsDefault', 'questionEdit', 'questionPage', 'questionSubmit', 'articlesDefault', 'articleEdit', 'articlePage', 'articleSubmit'];
    var isOnAuthRoute = _.contains(authRoutes, FlowRouter.getRouteName());

    if (!isOnUserRoute && user && ! Users.userProfileComplete(user)){
      return {template: "user_complete"};
    }

    if (FlowRouter.current().route.group && FlowRouter.current().route.group.name === "admin" && !Users.is.admin(user)) {
      return {template: "no_rights", data: {message: "Sorry, you  have to be an admin to view this page."}};
    }

    if (!isOnUserRoute && !Users.can.view(user)) {
      return {template: "no_rights", data: {message: "Sorry, you don't have the rights to view this page."}};
    }

    // if (FlowRouter.getRouteName() === "articleSubmit") {
    //   if (!user) {
    //     return {template: "no_rights", data: {message: "Please Sign In First.", link: FlowRouter.path("signIn")}};
    //   } else if (!Users.can.article(user)) {
    //     return {template: "no_rights", data: {message: "Sorry, you don't have permissions to add new items."}};
    //   }
    // }

    // if (FlowRouter.getRouteName() === "questionSubmit") {
    //   if (!user) {
    //     return {template: "no_rights", data: {message: "Please Sign In First.", link: FlowRouter.path("signIn")}};
    //   } else if (!Users.can.question(user)) {
    //     return {template: "no_rights", data: {message: "Sorry, you don't have permissions to add new items."}};
    //   }
    // }

    if (isOnAuthRoute) {
      if (!user) {
        FlowRouter.go("signIn");
      }
    }

    return false;
  },
  navLayout: function () {
    return Settings.get('navLayout', 'top-nav');
  },
  pageName : function() {
    FlowRouter.watchPathChange();
    return FlowRouter.current().route.name;
  },
  extraCode: function() {
    return Settings.get('extraCode');
  }
});

Template.layout.onCreated( function () {
  Session.set('currentScroll', null);
});

Template.layout.onRendered( function () {
  var currentScroll = Session.get('currentScroll');
  if(currentScroll){
    $('body').scrollTop(currentScroll);
    Session.set('currentScroll', null);
  }

  // favicon
  var link = document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = Settings.get('faviconUrl', '/img/favicon.ico');
  document.getElementsByTagName('head')[0].appendChild(link);

  // canonical
  var canonicalLink = document.createElement('link');
  canonicalLink.rel = 'canonical';
  document.getElementsByTagName('head')[0].appendChild(canonicalLink);

  // Google fonts
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700|Roboto:300,400,500,700|Roboto+Slab:400,500,600,700|Material+Icons';
  document.getElementsByTagName('head')[0].appendChild(link);
});

Template.layout.events({
  'click .inner-wrapper': function (e) {
    if ($('body').hasClass('mobile-nav-open')) {
      e.preventDefault();
      $('body').removeClass('mobile-nav-open');
    }
  }
});
