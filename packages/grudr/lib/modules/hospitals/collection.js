/*
 * Hospitals collection
 */

import schema from './schema.js';
import { createCollection, getDefaultResolvers, getDefaultMutations } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';

/**
 * @summary The global namespace for Hospitals.
 * @namespace Hospitals
 */
export const Hospitals = createCollection({
  collectionName: 'Hospitals',
  typeName: 'Hospital',
  schema,
  resolvers: getDefaultResolvers('Hospitals'),
  mutations: getDefaultMutations('Hospitals'),
});

Hospitals.checkAccess = (currentUser, hospital) => {
  return Users.isAdmin(currentUser) || Users.owns(currentUser, hospital)
}
