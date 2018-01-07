var confirmSubscription = function () {
  $('.newsletter-banner .card').css('opacity', 0);
  $('.newsletter-banner .newsletter-subscribed').css('display', 'block').css('opacity', 1);
  Meteor.setInterval(function () {
    // required because otherwise banner disappears immediately after confirmation
    dismissBanner();
  }, 200);
};

var dismissBanner = function () {
  // $('.newsletter-banner .card').fadeOut('fast', function () {
  //   if(Meteor.user()) {
  //     // if user is connected, change setting in their account
  //     Users.setSetting(Meteor.user(), 'newsletter.showBanner', false);
  //   } else {
  //     // set cookie
  //     Cookie.set('showBanner', "no");
  //   }
  // });

  $('.newsletter-banner .card').fadeOut('fast');
};

Meteor.startup(function () {
  Template.newsletter_banner.helpers({
    isNotConnected: function () {
      return !Meteor.user();
    },
    user: function () {
      return Meteor.user();
    },
    // showBanner: function () {
    //   // note: should not be reactive
    //   if(
    //         Settings.get('showBanner', false) === false
    //     ||  !Users.can.view(Meteor.user())
    //     ||  Cookie.get('showBanner') === "no"
    //     ||  (Meteor.user() && Meteor.user().getSetting('newsletter.showBanner', true) === false)
    //     ||  (Meteor.user() && Meteor.user().getSetting('newsletter.subscribeToNewsletter', false) === true)
    //   ){
    //     return false;
    //   } else {
    //     return true;
    //   }
    // }
  });

  Template.newsletter_banner.events({
    'click .newsletter-button': function (e) {
      e.preventDefault();
      var $banner = $('.newsletter-banner');
      if(Meteor.user()){
        $banner.addClass('show-loader');
        Meteor.call('addCurrentUserToMailChimpList', function (error, result) {
          $banner.removeClass('show-loader');

          if(error){
            Bert.alert( error.message, 'danger', 'growl-top-right' );
          } else{
            confirmSubscription();
          }

        });
      } else{
        var email = $('.newsletter-email').val();
        if(!email){
          alert('Please fill in your email.');
          return;
        }
        $banner.addClass('show-loader');
        Meteor.call('addEmailToMailChimpList', email, function (error, result) {
          $banner.removeClass('show-loader');
          if(error){
            Bert.alert( error.reason, 'danger', 'growl-top-right' );
          }else{
            confirmSubscription();
          }
        });
      }
    }
  });
});
