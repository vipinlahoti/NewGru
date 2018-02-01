/*
 * Extend the users admin dashboard
 * http://docs.vulcanjs.org/admin.html
 */

import { extendFragment, addAdminColumn } from 'meteor/vulcan:core';
import AdminUsersPosts from '../components/admin/AdminUsersPosts';
import AdminUsersHospitals from '../components/admin/AdminUsersHospitals';

addAdminColumn({
  name: 'posts',
  order: 50,
  component: AdminUsersPosts
});

addAdminColumn({
  name: 'hospitals',
  order: 60,
  component: AdminUsersHospitals
});
