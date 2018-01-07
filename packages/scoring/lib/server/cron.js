Meteor.startup(function () {
  var scoreInterval = Settings.get("scoreUpdateInterval") || 30;
  if (scoreInterval > 0) {

    // active items get updated every N seconds
    Meteor.setInterval(function () {
      var updatedArticles = 0;
      var updatedComments = 0;

      var updatedQuestions = 0;
      var updatedAnswers = 0;
      // console.log('tick ('+scoreInterval+')');
      Articles.find({'status': 2,'inactive': {$ne : true}}).forEach(function (article) { // only run scoring on approved articles
        updatedArticles += Grudr.updateScore({collection: Articles, item: article});
      });
      Comments.find({'inactive': {$ne : true}}).forEach(function (comment) {
        updatedComments += Grudr.updateScore({collection: Comments, item: comment});
      });

      Questions.find({'status': 2,'inactive': {$ne : true}}).forEach(function (question) { // only run scoring on approved questions
        updatedQuestions += Grudr.updateScore({collection: Questions, item: question});
      });
      Answers.find({'inactive': {$ne : true}}).forEach(function (answer) {
        updatedAnswers += Grudr.updateScore({collection: Answers, item: answer});
      });
      // console.log("Updated "+updatedArticles+"/"+Articles.find().count()+" Articles")
      // console.log("Updated "+updatedComments+"/"+Comments.find().count()+" Comments")
    }, scoreInterval * 1000);

    // inactive items get updated every hour
    Meteor.setInterval(function () {
      var updatedArticles = 0;
      var updatedComments = 0;

      var updatedQuestions = 0;
      var updatedANswers = 0;

      Articles.find({'inactive': true}).forEach(function (article) {
        updatedArticles += Grudr.updateScore({collection: Articles, item: article});
      });
      Comments.find({'inactive': true}).forEach(function (comment) {
        updatedComments += Grudr.updateScore({collection: Comments, item: comment});
      });

      Questions.find({'inactive': true}).forEach(function (question) {
        updatedQuestions += Grudr.updateScore({collection: Questions, item: question});
      });
      Answers.find({'inactive': true}).forEach(function (answer) {
        updatedAnswers += Grudr.updateScore({collection: Answers, item: answer});
      });
    }, 3600 * 1000);

  }
});
