import { addRoute, extendRoute } from 'meteor/vulcan:core';

addRoute([
  {name:'posts.new',      path:'post/new(/:postId)',    componentName: 'PostsNewForm'},
  {name:'posts.edit',     path:'post/edit(/:postId)',   componentName: 'PostsEditForm'},
  {name:'posts.list',     path: '/',                    componentName: 'PostsHome'},
  {name:'posts.single',   path:'posts/:_id(/:slug)',    componentName: 'PostsSingle'},

  {name:'users.single',   path:'users/:slug',           componentName: 'UsersSingle'},
  {name:'users.account',  path:'account',               componentName: 'UsersAccount'},
  {name:'users.edit',     path:'users/:slug/edit',      componentName: 'UsersAccount'},
]);

extendRoute('admin', { layoutName: 'AdminLayout' });
