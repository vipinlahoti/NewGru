// Invitation email
Picker.route('/email/invite-existing-user/:id?', function(params, req, res, next) {
  
  var html;
  var invitingUser = typeof params.id === "undefined" ? Meteor.users.findOne() : Meteor.users.findOne(params.id);
  
  var communityName = Settings.get('title','Grudr'),
      emailProperties = {
        newUser : false,
        communityName : communityName,
        actionLink : Grudr.utils.getSigninUrl(),
        invitedBy : Users.getDisplayName(invitingUser),
        profileUrl : Users.getProfileUrl(invitingUser)
      };

  html = Grudr.email.getTemplate('emailInvite')(emailProperties);
  res.end(Grudr.email.buildTemplate(html));
});

// Invitation email
Picker.route('/email/invite-new-user/:id?', function(params, req, res, next) {
  
  var html;
  var invitingUser = typeof params.id === "undefined" ? Meteor.users.findOne() : Meteor.users.findOne(params.id);
  
  var communityName = Settings.get('title','Grudr'),
      emailProperties = {
        newUser : true,
        communityName : communityName,
        actionLink : Grudr.utils.getSignupUrl(),
        invitedBy : Users.getDisplayName(invitingUser),
        profileUrl : Users.getProfileUrl(invitingUser)
      };

  html = Grudr.email.getTemplate('emailInvite')(emailProperties);
  res.end(Grudr.email.buildTemplate(html));
});
