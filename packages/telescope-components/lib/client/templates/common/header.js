Template.header.helpers({
  hasPrimaryNav () {
    return !!Telescope.modules.get('primaryNav').length;
  },
  hasSecondaryNav () {
    return !!Telescope.modules.get('secondaryNav').length;
  }
});
