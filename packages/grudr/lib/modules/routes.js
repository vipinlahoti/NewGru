import { addRoute } from 'meteor/vulcan:core';

addRoute([
  {name: 'theme',         path: '/theme',                 componentName: 'ThemeStyles'},

  {name:'posts.list',     path: '/',                      componentName: 'PostsHome'},
  {name:'posts.single',   path:'posts/:_id(/:slug)',      componentName: 'PostsSingle'},
  {name:'posts.new',      path:'post/new(/:postId)',      componentName: 'PostsNewForm'},
  {name:'posts.edit',     path:'post/edit(/:postId)',     componentName: 'PostsEditForm'},

  {name:'users.single',   path:'users/:slug',           componentName: 'UsersSingle'},
  {name:'users.account',  path:'account',               componentName: 'UsersAccount'},
  {name:'users.edit',     path:'users/:slug/edit',      componentName: 'UsersAccount'},
]);
