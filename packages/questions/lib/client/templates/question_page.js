var doSEOStuff = function (question) {

  // clear previously added meta tags
  DocHead.removeDocHeadAddedTags();

  var link = {rel: "canonical", href: question.getPageUrl(true)};
  DocHead.addLink(link);
  
  // Set SEO properties
  
  var seoProperties = {meta: {}};

  // Set site name
  DocHead.addMeta({property: "og:site_name", content: Settings.get("title")});

  // Set title
  Grudr.SEO.setTitle(question.body);

  // Set description
  if (!!question.body) {
    var description = Grudr.utils.trimWords(question.body, 100);
    Grudr.SEO.setDescription(description);
  }

  // Set image
  if (!!question.thumbnailUrl) {
    var image = Grudr.utils.addHttp(question.thumbnailUrl);
    DocHead.addMeta({property: "twitter:card", content: "summary_large_image"});
    Grudr.SEO.setImage(image);
  }

  // Set Twitter username
  if (!!Settings.get("twitterAccount")) {
    DocHead.addMeta({property: "twitter:site", content: Settings.get("twitterAccount")});
  }
  
};

Template.question_page.onCreated(function () {

  var template = this;
  var questionId = FlowRouter.getParam("_id");

  // initialize the reactive variables
  template.ready = new ReactiveVar(false);

  var questionSubscription = Grudr.subsManager.subscribe('singleQuestion', questionId);
  var questionUsersSubscription = Grudr.subsManager.subscribe('questionUsers', questionId);
  var answerSubscription = Grudr.subsManager.subscribe('answersList', {view: 'questionAnswers', questionId: questionId});
  
  // Autorun 3: when subscription is ready, update the data helper's terms
  template.autorun(function () {

    var subscriptionsReady = questionSubscription.ready(); // ⚡ reactive ⚡

    // if subscriptions are ready, set terms to subscriptionsTerms and update SEO stuff
    if (subscriptionsReady) {
      template.ready.set(true);
      var question = Questions.findOne(FlowRouter.getParam("_id"));
      if (question) {
        doSEOStuff(question);
      } else {
        DocHead.addMeta({
          name: "name",
          property: "prerender-status-code",
          content: "404"
        });
        DocHead.addMeta({
          name: "name",
          property: "robots",
          content: "noindex, nofollow"
        });
      }
    }
  });

});

Template.question_page.helpers({
  ready: function () {
    return Template.instance().ready.get();
  },
  question: function () {
    return Questions.findOne(FlowRouter.getParam("_id"));
  },
  canView: function () {
    var question = this;
    return Users.can.viewQuestion(Meteor.user(), question);
  },
  isPending: function () {
    return this.status === Questions.config.STATUS_PENDING;
  }
});

Template.question_page.rendered = function(){
  $('body').scrollTop(0);
};
