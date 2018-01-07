// push "search" template to primaryNav
Grudr.modules.add("primaryNav", {
  template: 'search',
  order: 100
});

Grudr.modules.add("mobileNav", {
  template: 'search',
  order: 1
});

Grudr.colorElements.add('.search.empty .search-field', 'secondaryContrastColor');
