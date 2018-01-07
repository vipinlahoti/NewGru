Grudr.modules.add("secondaryNav", [
  {
    template: 'user_menu',
    order: 90
  }
]);

Grudr.modules.add("mobileNav", [
  {
    template: 'user_menu',
    order: 20
  }
]);

var userMenuItems = [
  {
    route: function () {
      var user = Meteor.user();
      return FlowRouter.path('userProfile', {_idOrSlug: user && user.grudr && user.grudr.slug});
    },
    label: 'Profile'
    // description: 'view_your_profile'
  },
  {
    route: function () {
      var user = Meteor.user();
      return FlowRouter.path('userEdit', {_idOrSlug: user && user.grudr && user.grudr.slug});
    },
    label: 'Edit account'
    // description: 'edit_your_profile'
  },
  {
    route: function () {
      var user = Meteor.user();
      return FlowRouter.path('atChangePwd');
    },
    label: 'Change password'
  },
  {
    route: 'adminSettings',
    label: 'Settings',
    // description: 'settings',
    adminOnly: true
  },

  {
    route: 'signOut',
    label: 'Sign out'
    // description: 'sign_out'
  }
];

Grudr.menuItems.add("userMenu", Grudr.menuItems.internationalize(userMenuItems));

// array containing items in the admin menu
Grudr.menuItems.add("adminMenu", [
  {
    route: 'adminUsers',
    label: "Users",
    description: "Users dashboard"
  }
]);

// $('.js-menu-items').addClass('dropdown-menu');
