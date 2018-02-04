/*
 * Custom fields on Users collection
 */

import React from 'react';
import { Components } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import { getHospitalsAsOptions } from './schema.js';

Users.addField([
  /**
    Count of the user's hospitals
  */
  {
    fieldName: 'hospitalCount',
    fieldSchema: {
      type: Number,
      optional: true,
      defaultValue: 0,
      viewableBy: ['guests'],
    }
  },
  /**
    Hospital names
  */
  {
    fieldName: 'hospitalName',
    fieldSchema: {
      type: Array,
      control: 'checkboxgroup',
      optional: true,
      insertableBy: ['members'],
      editableBy: ['members'],
      viewableBy: ['guests'],
      options: props => {
        return getHospitalsAsOptions(props.data.HospitalsList);
      },
      query: `
        HospitalsList{
          _id
          name
          slug
        }
      `,
      // afterComponent: <span className="component-help">Select hospital from dropdown, If does'nt found one please <a href="">add your hospital</a></span>
    }
  },
  {
    fieldName: 'hospitalName.$',
    fieldSchema: {
      type: String,
      optional: true
    }
  },
  /**
    The user's associated hospitals (GraphQL only)
  */
  {
    fieldName: 'hospitals',
    fieldSchema: {
      type: Array,
      optional: true,
      viewableBy: ['guests'],
      resolveAs: {
        arguments: 'limit: Int = 5',
        type: '[Hospital]',
        resolver: (user, { limit }, { currentUser, Users, Hospitals }) => {
          const hospitals = Hospitals.find({ userId: user._id }, { limit }).fetch();

          // restrict documents fields
          const viewableHospitals = _.filter(hospitals, hospital => Hospitals.checkAccess(currentUser, hospital));
          const restrictedHospitals = Users.restrictViewableFields(currentUser, Hospitals, viewableHospitals);
        
          return restrictedHospitals;
        }
      }
    }
  }
]);
