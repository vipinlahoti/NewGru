// //////////////////////////////////
// // AccountsTemplates configuration
// //////////////////////////////////

AccountsTemplates.configure({
  defaultLayout: 'layout',
  defaultLayoutRegions: {},
  defaultContentRegion: 'main',
  // Behavior
  confirmPassword: false,
  enablePasswordChange: true,
  forbidClientAccountCreation: false,
  overrideLoginErrors: true,
  sendVerificationEmail: true,
  lowercaseUsername: false,
  focusFirstInput: true,
  overrideLoginErrors: true,

  // Appearance
  showAddRemoveServices: true,
  socialLoginStyle: "popup",
  showForgotPasswordLink: true,
  showLabels: false,
  showPlaceholders: true,
  showResendVerificationEmailLink: true,

  // Client-side Validation
  continuousValidation: true,
  negativeFeedback: true,
  negativeValidation: true,
  positiveValidation: true,
  positiveFeedback: true,
  showValidating: true,

  // Privacy Policy and Terms of Use
  privacyUrl: 'privacy',
  termsUrl: 'terms-of-use',
  redirectTimeout: 0,
  reCaptcha: {
    siteKey: '6LeDphgUAAAAAE0YYHvFcbss4GjCg5KMcwA0RUcP',
    theme: "light",
    data_type: "image"
  },
  showReCaptcha: false,
  texts: {
    // button: {
    //   signUp: 'Create my Profil'
    // },
    socialSignUp: '',
    // socialIcons: {
    //   'meteor-developer': 'fa fa-rocket'
    // },
    title: {
      signIn: 'Log in with',
      signUp: 'Sign up with'
    }
  },
});

AccountsTemplates.configureRoute('signIn', {
    name: 'signIn',
    path: '/sign-in',
});
AccountsTemplates.configureRoute('signUp', {
    name: 'signUp',
    path: '/register',
});
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('verifyEmail', {
  name: 'verifyEmail',
  path: '/verify-email',
});

// /* global
//     AccountsTemplates: false,
//     Settings: false
// */


if (Meteor.isServer) {
  Meteor.startup(function () {
    Accounts.emailTemplates.siteName = Settings.get('title');
    Accounts.emailTemplates.from = Settings.get('defaultEmail');
  });
}

//Fields
AccountsTemplates.addField({
    _id: 'username',
    type: 'text',
    displayName: 'username',
    required: true,
    minLength: 3,
    errStr: 'error.minChar'
});

AccountsTemplates.removeField('email');
AccountsTemplates.addField({
    _id: 'email',
    type: 'email',
    required: true,
    re: /.+@(.+){2,}\.(.+){2,}/,
    errStr: 'error.accounts.Invalid email',
});

AccountsTemplates.removeField('password');
AccountsTemplates.addField({
    _id: 'password',
    type: 'password',
    required: true,
    minLength: 8,
    errStr: 'error.minChar'
});

AccountsTemplates.addField({
    _id: 'username_and_email',
    type: 'text',
    required: true,
    displayName: 'usernameOrEmail',
    placeholder: 'usernameOrEmail',
});

// hack to get signOut route not considered among previous paths
if (Meteor.isClient) {
  Meteor.startup(function(){
    AccountsTemplates.knownRoutes.push('/sign-out');
  });
}
