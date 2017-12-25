import Users from 'meteor/vulcan:users';

/*
  Let's create a new 'writer' group that can edit and delete any posts
*/

Users.createGroup('writer');

const writerActions = [
  'posts.new', 
  'posts.edit.own', 
  'posts.remove.own',
];
Users.groups.writer.can(writerActions);


Users.createGroup('doctors');

const doctorsActions = [
  'users.new', 
  'users.edit.own', 
];
Users.groups.doctors.can(doctorsActions);


Users.createGroup('students');

const students = [
  'users.new', 
  'users.edit.own', 
];
Users.groups.doctors.can(students);


Users.createGroup('patients');

const patients = [
  'users.new', 
  'users.edit.own', 
];
Users.groups.doctors.can(patients);
