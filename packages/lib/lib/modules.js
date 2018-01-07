/**
 * Template modules let you insert templates in specific zones in the app's layout. 
 * @namespace Grudr.modules
 */

Grudr.modules = {};

/**
 * Add a module to a template zone
 * @param {string} zone - The name of the zone
 * @param {Object|Object[]} module - The module object (or an array of modules)
 * @param {string} module.template - The template to include
 * @param {number} module.order - The order of the template in the zone
 *
 * @example
 * Grudr.modules.add("hero", {
 *   template: "newsletterBanner",
 *   order: 10,
 *   only: ["articlesDefault"]
 * });
 */
Grudr.modules.add = function (zone, module) {

  // if module zone array doesn't exist yet, initialize it
  if (typeof Grudr.modules[zone] === "undefined") {
    Grudr.modules[zone] = [];
  }

  if (Array.isArray(module)) {

    var modules = module; // we're dealing with an Array, so let's add an "s"
    modules.forEach( function (module) {
      Grudr.modules[zone].push(module);
    });

  } else {

    Grudr.modules[zone].push(module);

  }
};

/**
 * Remove a module from a zone
 * @param {string} zone - The name of the zone
 * @param {string} template - The name of the template to remove
 */
Grudr.modules.remove = function (zone, template) {
  Grudr.modules[zone] = _.reject(Grudr.modules[zone], function (module) {
    return module.template === template;
  });
};

/**
 * Removes all modules from a zone
 * @param {string} zone - The name of the zone
 */
Grudr.modules.removeAll = function (zone) {
  Grudr.modules[zone] = [];
};

/**
 * Retrieve an array containing all modules for a zone
 * @param {string} zone - The name of the zone
 * @returns {Object[]} Returns a sorted array of the zone's modules
 */
Grudr.modules.get = function (zone) {
  return _.sortBy(Grudr.modules[zone], "order");
};

/**
 * Add a route to the list of routes a module should be displayed on
 * @param {string} zone - The name of the zone
 * @param {string} template - The name of the module
 * @param {string} route - The name of the route on which to display the module
 */
Grudr.modules.addRoute = function (zone, template, route) {
  _.findWhere(Grudr.modules[zone], {template: template}).only.push(route);
};
