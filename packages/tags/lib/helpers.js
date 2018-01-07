
/**
 * Get all of a category's parents
 * @param {Object} category
 */
Categories.getParents = function (category) {
  var categoriesArray = [];

  var getParents = function recurse (category) {
    var parent;
    if (parent = Categories.findOne(category.parentId)) {
      categoriesArray.push(parent);
      recurse(parent);
    }
  }(category);

  return categoriesArray;
};
Categories.helpers({getParents: function () {return Categories.getParents(this);}});

/**
 * Get all of a category's children
 * @param {Object} category
 */
Categories.getChildren = function (category) {
  var categoriesArray = [];

  var getChildren = function recurse (categories) {
    var children = Categories.find({parentId: {$in: _.pluck(categories, "_id")}}).fetch()
    if (children.length > 0) {
      categoriesArray = categoriesArray.concat(children);
      recurse(children);
    }
  }([category]);

  return categoriesArray;
};
Categories.helpers({getChildren: function () {return Categories.getChildren(this);}});

/**
 * Get all of a article's categories
 * @param {Object} article
 */
Articles.getCategories = function (article) {
  return !!article.categories ? Categories.find({_id: {$in: article.categories}}).fetch() : [];
};
Articles.helpers({getCategories: function () {return Articles.getCategories(this);}});

/**
 * Get a category's URL
 * @param {Object} category
 */
Categories.getUrl = function (category, isAbsolute) {
  var isAbsolute = typeof isAbsolute === "undefined" ? false : isAbsolute; // default to false
  var prefix = isAbsolute ? Grudr.utils.getSiteUrl().slice(0,-1) : "";
  // return prefix + FlowRouter.path("articlesCategory", category);
  return prefix + FlowRouter.path("articlesDefault", {}, {cat: [category.slug]});
};
Categories.helpers({getUrl: function () {return Categories.getUrl(this);}});

/**
 * Get a category's counter name
 * @param {Object} category
 */
 Categories.getCounterName = function (category) {
  return category._id + "-articlesCount";
 }
 Categories.helpers({getCounterName: function () {return Categories.getCounterName(this);}});
