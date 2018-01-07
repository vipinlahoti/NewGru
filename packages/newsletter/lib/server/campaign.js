defaultFrequency = 7;
defaultArticles = 5;

getCampaignArticles = function (articlesCount) {

  // look for last scheduled campaign in the database
  var lastCampaign = SyncedCron._collection.findOne({name: 'scheduleNewsletter'}, {sort: {finishedAt: -1}, limit: 1});

  // if there is a last campaign and it was sent less than 7 days ago use its date, else default to articles from the last 7 days
  var lastWeek = moment().subtract(7, 'days');
  var after = (lastCampaign && moment(lastCampaign.finishedAt).isAfter(lastWeek)) ? lastCampaign.finishedAt : lastWeek.toDate();

  var params = Articles.parameters.get({
    view: 'campaign',
    limit: articlesCount,
    after: after
  });
  return Articles.find(params.find, params.options).fetch();
};

buildCampaign = function (articlesArray) {
  var articlesHTML = '', subject = '';

  // 1. Iterate through articles and pass each of them through a handlebars template
  articlesArray.forEach(function (article, index) {
    if(index > 0)
      subject += ', ';

    subject += article.title;

    var articleUser = Meteor.users.findOne(article.userId);

    // the naked article object as stored in the database is missing a few properties, so let's add them
    var properties = _.extend(article, {
      authorName: article.getAuthorName(),
      articleLink: Articles.getLink(article, true),
      profileUrl: Users.getProfileUrl(articleUser, true),
      articlePageLink: Articles.getPageUrl(article, true),
      date: moment(article.postedAt).format("MMMM D YYYY"),
      authorAvatarUrl: Avatar.getUrl(articleUser)
    });

    try {
      HTTP.get(article.authorAvatarUrl);
    } catch (error) {
      article.authorAvatarUrl = false;
    }

    if (article.body) {
      properties.body = Grudr.utils.trimHTML(article.htmlBody, 20);
    }

    if (article.commentCount > 0)
      properties.popularComments = Comments.find({articleId: article._id}, {sort: {score: -1}, limit: 2, transform: function (comment) {
        var user = Meteor.users.findOne(comment.userId);

        comment.body = Grudr.utils.trimHTML(comment.htmlBody, 20);
        comment.authorProfileUrl = Users.getProfileUrl(user, true);
        comment.authorAvatarUrl = Avatar.getUrl(user);

        try {
          HTTP.get(comment.authorAvatarUrl);
        } catch (error) {
          comment.authorAvatarUrl = false;
        }
        return comment;
      }}).fetch();

    if(article.url) {
      properties.domain = Grudr.utils.getDomain(article.url);
    }

    if (properties.thumbnailUrl) {
      properties.thumbnailUrl = Grudr.utils.addHttp(properties.thumbnailUrl);
    }

    articlesHTML += Grudr.email.getTemplate('emailArticleItem')(properties);
  });

  // 2. Wrap articles HTML in digest template
  var digestHTML = Grudr.email.getTemplate('emailDigest')({
    siteName: Settings.get('title'),
    date: moment().format("dddd, MMMM Do YYYY"),
    content: articlesHTML
  });

  // 3. wrap digest HTML in email wrapper template
  var emailHTML = Grudr.email.buildTemplate(digestHTML);

  var campaign = {
    articleIds: _.pluck(articlesArray, '_id'),
    subject: Grudr.utils.trimWords(subject, 15),
    html: emailHTML
  };

  return campaign;
};

scheduleNextCampaign = function (isTest) {
  isTest = !! isTest;
  var articles = getCampaignArticles(Settings.get('articlesPerNewsletter', defaultArticles));
  if(!!articles.length){
    return scheduleCampaign(buildCampaign(articles), isTest);
  }else{
    var result = 'No articles to schedule today…';
    return result;
  }
};

Meteor.methods({
  sendCampaign: function () {
    if(Users.is.adminById(this.userId))
      return scheduleNextCampaign(false);
  },
  testCampaign: function () {
    if(Users.is.adminById(this.userId))
      return scheduleNextCampaign(true);
  }
});
