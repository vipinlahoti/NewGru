Meteor.methods({
  phoneHome: function  () {

    var url = 'http://version.grudrapp.org/';

    if(Meteor.user() && Users.is.admin(Meteor.user())){
    
      var params = {
        currentVersion: Grudr.VERSION,
        siteTitle: Settings.get('title'),
        siteUrl: Grudr.utils.getSiteUrl(),
        users: Meteor.users.find().count(),
        articles: Articles.find().count(),
        questions: Questions.find().count(),
        comments: Comments.find().count(),
        answers: Answers.find().count()
      };
    
      this.unblock();
      try {
        var result = HTTP.get(url, {
          params: params
        });
        return result;
      } catch (e) {
        // Got a network error, time-out or HTTP error in the 400 or 500 range.
        return false;
      }
    }
  }
});
