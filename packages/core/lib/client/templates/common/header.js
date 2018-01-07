Template.header.helpers({
  hasPrimaryNav: function () {
    return !!Grudr.modules.get('primaryNav').length;
  },
  hasSecondaryNav: function () {
    return !!Grudr.modules.get('secondaryNav').length;
  }
});
