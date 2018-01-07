// generate slug on insert
Categories.before.insert(function (userId, doc) {
  // if no slug has been provided, generate one
  var slug = !!doc.slug ? doc.slug : Grudr.utils.slugify(doc.name);
  doc.slug = Grudr.utils.getUnusedSlug(Categories, slug);
});

// generate slug on edit
Categories.before.update(function (userId, doc, fieldNames, modifier) {
  if (modifier.$set && modifier.$set.slug) {
    modifier.$set.slug = Grudr.utils.getUnusedSlug(Categories, modifier.$set.slug);
  }
});

// add callback that adds categories CSS classes
function addCategoryClass (articleClass, article) {
  var classArray = _.map(Articles.getCategories(article), function (category){return "category-"+category.slug;});
  return articleClass + " " + classArray.join(' ');
}
Grudr.callbacks.add("articleClass", addCategoryClass);

// ------- Categories Check -------- //

// make sure all categories in the article.categories array exist in the db
var checkCategories = function (article) {

  // if there are not categories, stop here
  if (!article.categories || article.categories.length === 0) {
    return;
  }

  // check how many of the categories given also exist in the db
  var categoryCount = Categories.find({_id: {$in: article.categories}}).count();

  if (article.categories.length !== categoryCount) {
    throw new Meteor.Error('invalid_category', 'Invalid category');
  }
};

function articleSubmitCheckCategories (article) {
  checkCategories(article);
  return article;
}
Grudr.callbacks.add("articleSubmit", articleSubmitCheckCategories);

function articleEditCheckCategories (article) {
  checkCategories(article);
  return article;
}
Grudr.callbacks.add("articleEdit", articleEditCheckCategories);

function addParentCategoriesOnSubmit (article) {
  var categories = article.categories;
  var newCategories = [];
  if (categories) {
    categories.forEach(function (categoryId) {
      var category = Categories.findOne(categoryId);
      newCategories = newCategories.concat(_.pluck(category.getParents().reverse(), "_id"));
      newCategories.push(category._id);
    });
  }
  article.categories = _.unique(newCategories);
  return article;
}
Grudr.callbacks.add("articleSubmit", addParentCategoriesOnSubmit);

function addParentCategoriesOnEdit (modifier, article) {
  if (modifier.$unset && modifier.$unset.categories !== undefined) {
    return modifier;
  }

  var categories = modifier.$set.categories;
  var newCategories = [];
  if (categories) {
    categories.forEach(function (categoryId) {
      var category = Categories.findOne(categoryId);
      newCategories = newCategories.concat(_.pluck(category.getParents().reverse(), "_id"));
      newCategories.push(category._id);
    });
  }
  modifier.$set.categories = _.unique(newCategories);
  return modifier;
}
Grudr.callbacks.add("articleEdit", addParentCategoriesOnEdit);
