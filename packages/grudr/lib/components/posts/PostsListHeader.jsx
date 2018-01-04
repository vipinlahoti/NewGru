import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';

const PostsListHeader = () => {

  return (
    <div style={{display: 'none'}}>
      <Components.CategoriesList />
      {/*
      <Components.PostsViews />
      <Components.SearchForm/>
    */}
    </div>
  )
}

PostsListHeader.displayName = "PostsListHeader";

registerComponent('PostsListHeader', PostsListHeader);
