/**
 * Grudr configuration namespace
 * @namespace Grudr.config
 */
Grudr.config = {};

 /**
 * Subscriptions namespace
 * @namespace Grudr.subscriptions
 */
Grudr.subscriptions = [];

/**
 * Add a subscription to be preloaded
 * @param {string} subscription - The name of the subscription
 */
Grudr.subscriptions.preload = function (subscription) {
  Grudr.subscriptions.push(subscription);
};

