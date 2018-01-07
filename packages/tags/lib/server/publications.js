Meteor.publish('categories', function() {
  if(Users.can.viewById(this.userId)){
    var categories = Categories.find();
    var publication = this;

    categories.forEach(function (category) {
      var childrenCategories = category.getChildren();
      var categoryIds = [category._id].concat(_.pluck(childrenCategories, "_id"));
      var cursor = Articles.find({$and: [{categories: {$in: categoryIds}}, {status: Articles.config.STATUS_APPROVED}]});
      Counts.publish(publication, category.getCounterName(), cursor, { noReady: true });
    });

    return categories;
  }
  return [];
});
