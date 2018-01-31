import Users from 'meteor/vulcan:users';
import { addCallback } from 'meteor/vulcan:lib';

function userRoleAddPrefix (modifier) {
  if (modifier.$set && modifier.$set.userRole === 'Doctor') {
    modifier.$set.isDoctor = true;
  } else {
    modifier.$set.isDoctor = false;
  }
  return modifier;
}
addCallback("users.edit.sync", userRoleAddPrefix);

/**
 * @summary Update username if Doctor
 * @param {Object|string} user - The user
 */
Users.getDisplayName = function (user) {
  let userRole = user.isDoctor ? 'Dr. ' : '';
  if (typeof user === "undefined") {
    return "";
  } else {
    return (userRole + ' ' + user.displayName) ? (userRole + ' ' + user.displayName) : (userRole + ' ' + Users.getUserName(user));
  }
};
