Meteor.startup(function () {

  // "custom_" is always loaded last, so it takes priority over every other prefix
  Grudr.config.addCustomPrefix("custom_");

});

