import { addRoute } from 'meteor/vulcan:core';

addRoute([
  {name:'homePage',       path:'/',                        componentName: 'HomePage'},
  
  {name:'posts.list',     path:'posts',                    componentName: 'PostsHome'},
  // {name:'posts.daily',    path:'daily',                 componentName: 'PostsDaily'},
  {name:'posts.single',   path:'posts/:_id(/:slug)',       componentName: 'PostsSingle'},
  
  {name:'users.single',   path:'users/:slug',              componentName: 'UsersSingle'},
  {name:'users.account',  path:'account',                  componentName: 'UsersAccount'},
  {name:'users.edit',     path:'users/:slug/edit',         componentName: 'UsersAccount'},
]);
