import { addRoute } from 'meteor/vulcan:core';

addRoute([
  {name:'homePage',           path:'/',                             componentName: 'HomePage'},
  
  {name:'posts.new',          path:'/posts/new(/:postId)',          componentName: 'PostsNewForm'},
  {name:'posts.edit',         path:'posts/:_id(/:slug)/edit',       componentName: 'PostsEditForm'},
  {name:'posts.list',         path:'posts',                         componentName: 'PostsHome'},
  {name:'posts.single',       path:'posts/:_id(/:slug)',            componentName: 'PostsSingle'},

  {name:'questions.new',      path:'/questions/new(/:postId)',      componentName: 'QuestionsNewForm'},
  {name:'questions.edit',     path:'questions/:_id(/:slug)/edit',   componentName: 'QuestionsEditForm'},
  {name:'questions.list',     path:'questions',                     componentName: 'QuestionsDaily'},
  {name:'questions.single',   path:'questions/:_id(/:slug)',        componentName: 'QuestionsSingle'},

  {name:'users.single',       path:'users/:slug',                   componentName: 'UsersSingle'},
  {name:'users.account',      path:'account',                       componentName: 'UsersAccount'},
  {name:'users.edit',         path:'users/:slug/edit',              componentName: 'UsersAccount'},
]);
