import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';

const HospitalsListHeader = () => {

  return (
    <div style={{display: 'none'}}>
      <div className="hospitals-list-header">
        <div className="hospitals-list-header-categories">
          <Components.CategoriesList />
        </div>
        <Components.HospitalsViews />
        <Components.SearchForm/>
      </div>
    </div>
  )
}

HospitalsListHeader.displayName = "HospitalsListHeader";

registerComponent('HospitalsListHeader', HospitalsListHeader);
