Meteor.startup(function () {
  Template.article_share.helpers({
    encodedTitle: function () {
      return encodeURIComponent(this.title);
    },
    sourceLink: function () {
      return !!this.url ? this.url : Articles.getPageUrl(this);
    },
    viaTwitter: function () {
      return !!Settings.get('twitterAccount') ? 'via='+Settings.get('twitterAccount') : '';
    }
  });

  Template.article_share.events({
    'click .share-link': function(e){
      var $this = $(e.target).parents('.article-share').find('.share-link');
      var $share = $this.parents('.article-share').find('.share-options');
      e.preventDefault();
      $('.share-link').not($this).removeClass("active");
      $(".share-options").not($share).addClass("hidden");
      $this.toggleClass("active");
      $share.toggleClass("hidden");
    }
  });
});
