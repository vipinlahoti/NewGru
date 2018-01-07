Grudr.menuItems.add("adminMenu", {
  route: 'adminCategories',
  label: 'Categories',
  description: 'Add/Remove Categories'
});

// push "categories" modules to articleHeading
Grudr.modules.add("articleHeading", {
  template: 'article_categories',
  order: 30
});

// push "categories_menu" template to primaryNav
Grudr.modules.add("primaryNav", {
  template: 'categories_menu',
  order: 50
});

// Grudr.modules.add("mobileNav", {
//   template: 'categories_menu',
//   order: 10
// });

Grudr.modules.add("articlesListTop", {
  template: 'category_title',
  order: 10,
  only: ["articlesDefault"]
});

// we want to wait until categories are all loaded to load the rest of the app
Grudr.subscriptions.preload('categories');
