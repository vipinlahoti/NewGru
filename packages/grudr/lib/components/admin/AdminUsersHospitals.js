import React from 'react';
import { Hospitals } from '../../modules/hospitals/index.js';
import { Link } from 'react-router';
import { registerComponent } from 'meteor/vulcan:core';

const AdminUsersHospitals = ({ document: user }) => 
  <ul>
    {user.hospitals && user.hospitals.map(hospital => 
      <li key={hospital._id}><Link to={Hospitals.getPageUrl(hospital)}>{hospital.title}</Link></li>
    )}
  </ul>

registerComponent('AdminUsersHospitals', AdminUsersHospitals);

export default AdminUsersHospitals;
