/**
 * Menus namespace
 * @namespace Grudr.menuItems
 */
Grudr.menuItems = {};

/**
 * Add one or more items to a menu
 * @param {string} menu - The name of the menu
 * @param {Object|Object[]} item - The menu item object (or an array of items)
 *
 * @example <caption>Using a named route</caption>
 * Grudr.menuItems.add("viewsMenu", {
 *   route: 'articlesDaily',
 *   label: 'daily',
 *   description: 'day_by_day_view'
 * });
 *
 * @example <caption>Using a route function</caption>
 * Grudr.menuItems.add("userMenu", {
 *   route: function () {
 *     return FlowRouter.path('user_profile', {_idOrSlug: Meteor.user().grudr.slug});
 *   },
 *   label: 'profile',
 *   description: 'view_your_profile'
 * });
 *
 */
Grudr.menuItems.add = function (menu, item) {

  // if menu items array doesn't exist yet, initialize it
  if (typeof Grudr.menuItems[menu] === "undefined") {
    Grudr.menuItems[menu] = [];
  }

  if (Array.isArray(item)) {

    var items = item; // we're dealing with an Array, so let's add an "s"
    items.forEach( function (item) {
      Grudr.menuItems[menu].push(Grudr.menuItems.internationalize(item));
    });

  } else {

    Grudr.menuItems[menu].push(Grudr.menuItems.internationalize(item));

  }
};

/**
 * Remove an item from a menu
 * @param {string} menu - The name of the menu
 * @param {string} label - The label of the item to remove
 */
Grudr.menuItems.remove = function (menu, label) {
  Grudr.menuItems[menu] = _.reject(Grudr.menuItems[menu], function (menu) {
    return menu.label === label;
  });
};

/**
 * Remove all items from a menu
 * @param {string} menu - The name of the menu
 */
Grudr.menuItems.removeAll = function (menu) {
  Grudr.menuItems[menu] = [];
};

/**
 * Retrieve an array containing all items for a menu
 * @param {string} menu - The name of the menu
 */
Grudr.menuItems.get = function (menu) {
  return _.sortBy(Grudr.menuItems[menu], "order");
};

/**
 * Replace label and description strings by a function that calls
 * i18n.t on said string
 * @param {Object} item - The menu item
 */
Grudr.menuItems.internationalize = function (item) {
  var Item = _.clone(item);
  if (item.label && typeof item.label === "string") {
    Item.label = function () {
      return item.label;
    };
  }
  if (item.description && typeof item.description === "string") {
    Item.description = function () {
      return item.description;
    };
  }
  return Item;
};
