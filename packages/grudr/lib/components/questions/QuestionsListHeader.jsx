import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';

const QuestionsListHeader = () => {

  return (
    <div style={{display: 'none'}}>
      <Components.CategoriesList />
      {/*
      <Components.QuestionsViews />
      <Components.SearchForm/>
    */}
    </div>
  )
}

QuestionsListHeader.displayName = "QuestionsListHeader";

registerComponent('QuestionsListHeader', QuestionsListHeader);
