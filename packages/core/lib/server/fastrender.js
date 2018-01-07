Meteor.startup(function () {

  FastRender.onAllRoutes(function(path) {

    var fr = this;

    Grudr.subscriptions.forEach(function (sub) {

      if (typeof sub === 'object'){

        fr.subscribe(sub.subName, sub.subArguments);

      }else{

        fr.subscribe(sub);

      }

    });

  });

});
