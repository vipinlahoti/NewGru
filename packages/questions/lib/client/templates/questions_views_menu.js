var getMenuItems = function () {
  var defaultItems = Grudr.menuItems.get("viewsQuestionMenu");

  // reject an item if the item is admin only and the current user is not an admin
  // or if views have been configured in the settings and the item is not part of them
  var viewableItems = _.reject(defaultItems, function (item) {
    return (item.adminOnly && !Users.is.admin(Meteor.user())) || (!!Settings.get('questionViews') && !_.contains(Settings.get('questionViews'), item.name));
  });

  viewableItems = _.map(viewableItems, function (item) {
    item.itemClass = "view-"+item.name;
    return item;
  });

  return viewableItems; 
};

Template.views_menu.helpers({
  menuLabel: function () {
    return "View";
  },
  menuItems: function () {
    return getMenuItems();
  }
});
