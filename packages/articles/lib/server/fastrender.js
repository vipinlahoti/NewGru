var getDays = function (daysCount) {
  var daysArray = [];
  // var days = this.days;
  for (var i = 0; i < daysCount; i++) {
    daysArray.push({
      date: moment().subtract(i, 'days').startOf('day').toDate(),
      index: i
    });
  }
  return daysArray;
};

Articles.fastRenderSubscribe = function (params) {

  var fr = this;

  // generate cat array
  var categories = [];
  var index = 0;
  while (!!params.query["cat["+index+"]"]) {
    categories.push(params.query["cat["+index+"]"]);
    delete params.query["cat["+index+"]"];
    index++;
  }

  if (categories.length) {
    params.query.cat = categories;
  }
  
  if (!params.query.limit) {
    params.query.limit = Settings.get('articlesPerPage', 10);
  }

  // special case for daily view
  if (params.query.view === "daily") {

    var daysCount = params.days ? params.days : 5;
    var days = getDays(daysCount);

    days.forEach(function (day) {
      
      var subscriptionTerms = {
        view: "top",
        date: day.date,
        after: moment(day.date).format("YYYY-MM-DD"),
        before: moment(day.date).format("YYYY-MM-DD")
      };

      fr.subscribe('articlesList', subscriptionTerms);
      fr.subscribe('articlesListUsers', subscriptionTerms);

    });


  } else {

    fr.subscribe('articlesList', params.query);
    fr.subscribe('articlesListUsers', params.query);

  }
};

Meteor.startup(function () {

  FastRender.route("/", Articles.fastRenderSubscribe);
  
  FastRender.route("/articles/:_id/:slug?", function (params) {
    var articleId = params._id;
    this.subscribe('singleArticle', articleId);
    this.subscribe('articleUsers', articleId);
    this.subscribe('commentsList', {view: 'articleComments', articleId: articleId});
  });

});
