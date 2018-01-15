import React from 'react';
import { Components, addRoute } from 'meteor/vulcan:core';

addRoute([
  {name:'homePage',           path:'/',                             componentName: 'HomePage'},
  {name:'clinics',            path:'/clinics',                      componentName: 'Clinics'},
  {name:'doctors',            path:'/doctors',                      componentName: 'DoctorsList'},
  
  {name:'posts.new',          path:'/posts/new(/:postId)',          componentName: 'PostsNewForm'},
  {name:'posts.edit',         path:'posts/:_id(/:slug)/edit',       componentName: 'PostsEditForm'},
  {name:'posts.list',         path:'posts',                         componentName: 'PostsHome'},
  {name:'posts.single',       path:'posts/:_id(/:slug)',            componentName: 'PostsSingle'},

  {name:'questions.new',      path:'/questions/new(/:questionId)',  componentName: 'QuestionsNewForm'},
  {name:'questions.edit',     path:'questions/:_id(/:slug)/edit',   componentName: 'QuestionsEditForm'},
  {name:'questions.list',     path:'questions',                     componentName: 'QuestionsDaily'},
  {name:'questions.single',   path:'questions/:_id(/:slug)',        componentName: 'QuestionsSingle'},

  {name:'hospitals.new',      path:'/hospitals/new(/:hospitalId)',  componentName: 'HospitalsNewForm'},
  {name:'hospitals.edit',     path:'hospitals/:_id(/:slug)/edit',   componentName: 'HospitalsEditForm'},
  {name:'hospitals.list',     path:'hospitals',                     componentName: 'HospitalsHome'},
  {name:'hospitals.single',   path:'hospitals/:_id(/:slug)',        componentName: 'HospitalsSingle'},

  {name:'users.single',       path:'users/:slug',                   componentName: 'UsersSingle'},
  {name:'users.account',      path:'account',                       componentName: 'UsersAccount'},
  {name:'users.edit',         path:'users/:slug/edit',              componentName: 'UsersAccount'},
]);
