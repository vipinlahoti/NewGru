i18n = {};

// do this better:
i18n.setLanguage = function (language) {
  // Session.set('i18nReady', false);
  //console.log('1. i18n loading… '+language)

  // moment
  Session.set('momentReady', false);
  //console.log('2. moment loading…')
  if (language.toLowerCase() === 'en') {
    Session.set('momentReady', true);
    //console.log('3. moment loaded en')
  } else {
    $.getScript("//cdnjs.cloudflare.com/ajax/libs/moment.js/2.5.1/lang/" + language.toLowerCase() + ".js", function (result) {
      moment.locale(language);
      //console.log(`4. ${moment.locale(language)}`);
      Session.set('momentReady', true);
      Session.set('momentLocale', language);
      //console.log('6. moment loaded!')
    });
  }

  // TAPi18n
  Session.set("TAPi18nReady", false);
  //console.log('7. TAPi18n loading…')
  TAPi18n.setLanguage(language)
    .done(function () {
      Session.set("TAPi18nReady", true);
      //console.log('8. TAPi18n loaded!')
    });

  // T9n
  T9n.setLanguage(language);
};

i18n.t = function (str, options) {
  if (Meteor.isServer) {
    return TAPi18n.__(str, options, Settings.get('language', 'en'));
    console.log(`11. ${TAPi18n.__(str, options, Settings.get('language', 'en'))}`)
  } else {
    return TAPi18n.__(str, options);
    console.log(`12. TAPi18n.__ else ${TAPi18n.__(str, options)}`);
  }
};

Mongo.Collection.prototype.internationalize = function(){
  var schema = this.simpleSchema()._schema;
  _.each(schema, function (property, key) {
    if (!property.label) {
      schema[key].label = function () {
        // if property is nested ("grudr.email"), only consider the last part ("email")
        if (key.indexOf(".") !== -1) {
          key = _.last(key.split("."));
        }
        return key;
      };
    }
  });
  return this;
};

Meteor.startup(function () {

  if (Meteor.isClient) {
    i18n.setLanguage(Settings.get('language', 'en'));
    //console.log('TAPi18n loaded! - en')
  }

});
