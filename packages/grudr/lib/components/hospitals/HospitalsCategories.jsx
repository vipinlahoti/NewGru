import { registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { Link } from 'react-router';

const HospitalsCategories = ({hospital}) => {
  return (
    <div className="hospitals-categories">
      {hospital.categories.map(category => 
        <Link className="hospitals-category" key={category._id} to={{pathname: "/", query: {cat: category.slug}}}>{category.name}</Link>
      )}
    </div>
  )
};

HospitalsCategories.displayName = "HospitalsCategories";

registerComponent('HospitalsCategories', HospitalsCategories);
