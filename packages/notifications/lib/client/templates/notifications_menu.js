var getNotifications = function () {
  return Herald.collection.find({userId: Meteor.userId(), read: false}, {sort: {timestamp: -1}}).fetch();
};

Template.notifications_menu.helpers({
  hasNotifications: function () {
    var notifications = getNotifications();
    return notifications.length;
  },
  menuLabel: function () {
    var notificationsCount;
    var notifications = getNotifications();

    if(notifications.length === 0){
      notificationsCount = '<i class="material-icons icon-2x">add_alert</i>';
    }else{
      notificationsCount = '<i class="material-icons icon-2x">add_alert</i> <span class="notification-badge">' + notifications.length + '</span>';
    }

    return notificationsCount;
  },
  menuItems: function () {
    var notifications = getNotifications();
    var markAllAsRead = [{
      template: 'notifications_mark_as_read'
    }];
    var menuItems;
    if (notifications.length) {
      menuItems = markAllAsRead.concat(_.map(notifications, function (notification) {
        return {
          template: "notification_item",
          data: notification
        };
      }));
    } else {
      menuItems = [];
    }
    return menuItems;
  },
  menuType: function () {
    if (this.zone === "mobileNav") {
      return 'collapsible';
    } else if (Settings.get('navLayout', 'top-nav') === 'top-nav') {
      return 'dropdown';
    } else {
      return 'collapsible';
    }
  }
});


Template.notifications_menu.events({
    'click .dropdown-toggle': function(e, instance){
      e.preventDefault();
      $('.notification-badge').fadeOut();
    }
  });
