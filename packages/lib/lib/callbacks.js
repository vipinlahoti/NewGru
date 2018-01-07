/**
 * Callback hooks provide an easy way to add extra steps to common operations. 
 * @namespace Grudr.callbacks
 */
Grudr.callbacks = {};

/**
 * Add a callback function to a hook
 * @param {String} hook - The name of the hook
 * @param {Function} callback - The callback function
 */
Grudr.callbacks.add = function (hook, callback) {

  // if callback array doesn't exist yet, initialize it
  if (typeof Grudr.callbacks[hook] === "undefined") {
    Grudr.callbacks[hook] = [];
  }

  Grudr.callbacks[hook].push(callback);
};

/**
 * Remove a callback from a hook
 * @param {string} hook - The name of the hook
 * @param {string} functionName - The name of the function to remove
 */
Grudr.callbacks.remove = function (hookName, callbackName) {
  Grudr.callbacks[hookName] = _.reject(Grudr.callbacks[hookName], function (callback) {
    return callback.name === callbackName;
  });
};

/**
 * Successively run all of a hook's callbacks on an item
 * @param {String} hook - The name of the hook
 * @param {Object} item - The article, comment, modifier, etc. on which to run the callbacks
 * @param {Object} [constant] - An optional constant that will be passed along to each callback
 * @returns {Object} Returns the item after it's been through all the callbacks for this hook
 */
Grudr.callbacks.run = function (hook, item, constant) {

  var callbacks = Grudr.callbacks[hook];

  if (typeof callbacks !== "undefined" && !!callbacks.length) { // if the hook exists, and contains callbacks to run

    return callbacks.reduce(function(result, callback) {
      // console.log(callback.name);
      return callback(result, constant);
    }, item);

  } else { // else, just return the item unchanged
    return item;
  }
};

/**
 * Successively run all of a hook's callbacks on an item, in async mode (only works on server)
 * @param {String} hook - The name of the hook
 * @param {Object} item - The article, comment, modifier, etc. on which to run the callbacks
 * @param {Object} [constant] - An optional constant that will be passed along to each callback 
 */
Grudr.callbacks.runAsync = function () {

  // the first argument is the name of the hook
  var hook = arguments[0];
  var args = Array.prototype.slice.call(arguments).slice(1);
  var callbacks = Grudr.callbacks[hook];

  if (Meteor.isServer && typeof callbacks !== "undefined" && !!callbacks.length) {

    // use defer to avoid holding up client
    Meteor.defer(function () {
      // run all article submit server callbacks on article object successively
      callbacks.forEach(function(callback) {
        // console.log("// "+hook+": running callback ["+callback.name+"] at "+moment().format("hh:mm:ss"))
        callback.apply(this, args)
      });
    });
  
  }

};
