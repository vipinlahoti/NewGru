/*
 * Custom fields on collections
 */

import { Posts } from '../../modules/posts/index.js';
import { Hospitals } from '../../modules/hospitals/index.js';
import { getCategoriesAsOptions } from './schema.js';
import Users from 'meteor/vulcan:users';

Posts.addField([
  {
    fieldName: 'categoriesIds',
    fieldSchema: {
      type: Array,
      control: 'checkboxgroup',
      optional: true,
      insertableBy: ['members'],
      editableBy: ['members'],
      viewableBy: ['guests'],
      options: props => {
        return getCategoriesAsOptions(props.data.CategoriesList);
      },
      query: `
        CategoriesList{
          _id
          name
          slug
          order
        }
      `,
      resolveAs: {
        fieldName: 'categories',
        type: '[Category]',
        resolver: async (post, args, {currentUser, Users, Categories}) => {
          if (!post.categoriesIds) return [];
          const categories = _.compact(await Categories.loader.loadMany(post.categoriesIds));
          return Users.restrictViewableFields(currentUser, Categories, categories);
        },
        addOriginalField: true,
      }
    }
  },
  {
    fieldName: 'categoriesIds.$',
    fieldSchema: {
      type: String,
      optional: true
    }
  }
]);

Users.addField([
  {
    fieldName: 'categoriesIds',
    fieldSchema: {
      type: Array,
      control: 'checkboxgroup',
      optional: true,
      insertableBy: ['members'],
      editableBy: ['members'],
      viewableBy: ['guests'],
      options: props => {
        return getCategoriesAsOptions(props.data.CategoriesList);
      },
      query: `
        CategoriesList{
          _id
          name
          slug
          order
        }
      `,
    }
  },
  {
    fieldName: 'categoriesIds.$',
    fieldSchema: {
      type: String,
      optional: true
    }
  }
]);

Hospitals.addField([
  {
    fieldName: 'categoriesIds',
    fieldSchema: {
      type: Array,
      control: 'checkboxgroup',
      optional: true,
      insertableBy: ['members'],
      editableBy: ['members'],
      viewableBy: ['guests'],
      options: props => {
        return getCategoriesAsOptions(props.data.CategoriesList);
      },
      query: `
        CategoriesList{
          _id
          name
          slug
          order
        }
      `,
      resolveAs: {
        fieldName: 'categories',
        type: '[Category]',
        resolver: async (hospital, args, {currentUser, Users, Categories}) => {
          if (!hospital.categoriesIds) return [];
          const categories = _.compact(await Categories.loader.loadMany(hospital.categoriesIds));
          return Users.restrictViewableFields(currentUser, Categories, categories);
        },
        addOriginalField: true,
      },
      order: 2
    }
  },
  {
    fieldName: 'categoriesIds.$',
    fieldSchema: {
      type: String,
      optional: true
    }
  }
]);
