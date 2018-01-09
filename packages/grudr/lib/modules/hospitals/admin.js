/*

Admin dashboard extension

*/

import { extendFragment, addAdminColumn, addStrings } from 'meteor/vulcan:core';
import AdminUsersHospitals from '../../components/admin/AdminUsersHospitals';

extendFragment('UsersAdmin', `
  hospitals(limit: 5){
    ...HospitalsPage
  }
`);

addAdminColumn({
  name: 'hospitals',
  order: 50,
  component: AdminUsersHospitals
});


addStrings('en', {
  'admin.users.hospitals': 'Hospitals',
});
