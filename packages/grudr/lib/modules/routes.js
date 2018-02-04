import { addRoute, extendRoute } from 'meteor/vulcan:core';

addRoute([
  {name:'homePage',               path:'/',                       componentName: 'HomePage'},

  {name:'posts.list',             path:'posts',                   componentName: 'PostsHome'},
  {name:'posts.single',           path:'posts/:_id(/:slug)',      componentName: 'PostsSingle'},

  {name:'hospitals.list',         path:'hospitals',               componentName: 'HospitalsHome'},
  {name:'hospitals.single',       path:'hospitals/:_id(/:slug)',  componentName: 'HospitalsSingle'},
  
  {name:'users.single',           path:'users/:slug',             componentName: 'UsersSingle'},
  {name:'users.account',          path:'account',                 componentName: 'UsersAccount'},
  {name:'users.edit',             path:'users/:slug/edit',        componentName: 'UsersAccount'},

  {name:'posts.dashboard',        path:'/admin/posts',            componentName: 'PostsDashboard',      layoutName: 'AdminLayout'},
  {name:'hospitals.dashboard',    path:'/admin/hospitals',        componentName: 'HospitalsDashboard',  layoutName: 'AdminLayout'},
  {name:'categories.dashboard',   path:'/admin/categories',       componentName: 'CategoriesDashboard',  layoutName: 'AdminLayout'},

]);

extendRoute('admin', { layoutName: 'AdminLayout' });
