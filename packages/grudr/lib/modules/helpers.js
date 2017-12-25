import Users from 'meteor/vulcan:users';
import { addCallback } from 'meteor/vulcan:lib';

// function userIsDoctor (modifier) {
//   if (modifier.$set && modifier.$set.userRole === 'Doctor') {
//     modifier.$set.isDoctor = 'true';
//     modifier.$set.isPatient = 'false';
//     modifier.$set.isStudent = 'false';

//     console.log(`modifier isDoctor: ${modifier.$set.isDoctor}, isPatient: ${modifier.$set.isPatient}, isStudent: ${modifier.$set.isStudent}`);

//   } else if (modifier.$set && modifier.$set.userRole === 'Patient') {
//     modifier.$set.isDoctor = 'false';
//     modifier.$set.isPatient = 'true';
//     modifier.$set.isStudent = 'false';

//     console.log(`modifier isDoctor: ${modifier.$set.isDoctor}, isPatient: ${modifier.$set.isPatient}, isStudent: ${modifier.$set.isStudent}`);

//   } else {
//     modifier.$set.isDoctor = 'false';
//     modifier.$set.isPatient = 'false';
//     modifier.$set.isStudent = 'true';
    
//     console.log(`modifier isDoctor: ${modifier.$set.isDoctor}, isPatient: ${modifier.$set.isPatient}, isStudent: ${modifier.$set.isStudent}`);
//   }
//   return modifier;

// }
// addCallback("users.edit.sync", userIsDoctor);

function userRoleAddPrefix (modifier) {
  if (modifier.$set && modifier.$set.userRole === 'Doctor') {
    modifier.$set.userRolePrefix = 'Dr';
    modifier.$set.isDoctor = true;
  } else {
    modifier.$set.userRolePrefix = ' ';
    modifier.$set.isDoctor = false;
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
Users.isAdminById = Users.isDoctor;

/**
 * @summary check if a user is a member of a group
 * @param {Array} user 
 * @param {String} group or array of groups
 */
Users.isMemberOf = (user, groupOrGroups) => {
  const groups = Array.isArray(groupOrGroups) ? groupOrGroups : [groupOrGroups];
  
  // everybody is considered part of the guests group
  if (groups.indexOf('guests') !== -1) return true;
  
  // every logged in user is part of the members group
  if (groups.indexOf('members') !== -1) return !!user; 
  
  // the admin group have their own function
  if (groups.indexOf('admin') !== -1) return Users.isAdmin(user);

  // the doctor group have their own function
  if (groups.indexOf('doctor') !== -1) return Users.isDoctor(user);

  // else test for the `groups` field
  return _.intersection(Users.getGroups(user), groups).length > 0;
};

/**
 * @summary get a list of a user's groups
 * @param {Object} user
 */
Users.getGroups = user => {

  let userGroups = [];

  if (!user) { // guests user

    userGroups = ["guests"];
  
  } else {
  
    userGroups = ["members"];

    if (user.groups) { // custom groups
      userGroups = userGroups.concat(user.groups);
    } 
    
    if (Users.isAdmin(user)) { // admin
      userGroups.push("admins");
    }

    if (Users.isDoctor(user)) { // doctor
      userGroups.push("doctors");
    }

  }

  return userGroups;

};

Users.getDisplayName = function (user) {
  let userRole = user.userRolePrefix ? user.userRolePrefix : '';
  if (typeof user === "undefined") {
    return "";
  } else {
    return (userRole + ' ' + user.displayName) ? (userRole + ' ' + user.displayName) : (userRole + ' ' + Users.getUserName(user));
  }
};
