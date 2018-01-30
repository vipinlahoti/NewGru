import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';

const PostsListHeader = () => {

  return (
    <div style={{display: 'none'}}>
      <div className="posts-list-header">
        <div className="posts-list-header-categories">
          <Components.CategoriesList />
        </div>
        <Components.PostsViews />
        <Components.SearchForm/>
      </div>
    </div>
  )
}

PostsListHeader.displayName = "PostsListHeader";

registerComponent('PostsListHeader', PostsListHeader);
