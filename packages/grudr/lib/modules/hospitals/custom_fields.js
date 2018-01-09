/*

Custom fields on Users collection

*/

import Users from 'meteor/vulcan:users';

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
