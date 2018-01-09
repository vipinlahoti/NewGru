import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';

const HospitalsListHeader = () => {

  return (
    <div style={{display: 'none'}}>
      <Components.CategoriesList />
      {/*
      <Components.HospitalsViews />
      <Components.SearchForm/>
    */}
    </div>
  )
}

HospitalsListHeader.displayName = "HospitalsListHeader";

registerComponent('HospitalsListHeader', HospitalsListHeader);
