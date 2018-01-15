import Users from 'meteor/vulcan:users';
import { addCallback } from 'meteor/vulcan:lib';

function userRoleAddPrefix (modifier) {
  if (modifier.$set && modifier.$set.userRole === 'Doctor') {
    modifier.$set.userRolePrefix = 'Dr.';
  } else {
    modifier.$set.userRolePrefix = ' ';
  }
  return modifier;
}
addCallback("users.edit.sync", userRoleAddPrefix);


/**
 * @summary Check if a user is a doctor
 * @param {Object|string} userOrUserId - The user or their userId
 */
Users.isDoctor = function (userOrUserId) {
  try {
    var user = Users.getUser(userOrUserId);
    return !!user && !!user.isDoctor;
  } catch (e) {
    return false; // user not logged in
  }
};
Users.isDoctorById = Users.isDoctor;


/**
 * @summary Check if a user is a writer
 * @param {Object|string} userOrUserId - The user or their userId
 */
Users.isWriter = function (userOrUserId) {
  try {
    var user = Users.getUser(userOrUserId);
    return !!user && !!user.isWriter;
  } catch (e) {
    return false; // user not logged in
  }
};
Users.isWriterById = Users.isWriter;

Users.getDisplayName = function (user) {
  let userRole = user.userRolePrefix ? user.userRolePrefix : '';
  if (typeof user === "undefined") {
    return "";
  } else {
    return (userRole + ' ' + user.displayName) ? (userRole + ' ' + user.displayName) : (userRole + ' ' + Users.getUserName(user));
  }
};

Users.addView('doctorsList', terms => ({
  selector: {
    isDoctor: true
  },
  options: {
    sort: {createdAt: -1}
  }
}));
