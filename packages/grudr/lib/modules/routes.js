import { addRoute, extendRoute } from 'meteor/vulcan:core';

addRoute([
  {name:'homePage',           path:'/',                     componentName: 'HomePage'},

  {name:'posts.list',         path:'posts',                 componentName: 'PostsHome'},
  {name:'posts.single',       path:'posts/:_id(/:slug)',    componentName: 'PostsSingle'},

  {name:'hospitals.new',      path:'hospitals/new',         componentName: 'HospitalsNewForm'},
  
  {name:'users.single',       path:'users/:slug',           componentName: 'UsersSingle'},
  {name:'users.account',      path:'account',               componentName: 'UsersAccount'},
  {name:'users.edit',         path:'users/:slug/edit',      componentName: 'UsersAccount'},

  {name: 'posts.dashboard',   path:'/admin/posts',          componentName: 'PostsDashboard',    layoutName: 'AdminLayout'},

]);

extendRoute('admin', { layoutName: 'AdminLayout' });
