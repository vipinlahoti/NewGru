import { registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { Link } from 'react-router';

const UsersCategories = ({user}) => {
  return (
    <div className="users-categories">
      {user.categories.map(category => 
        <Link className="hospitals-category" key={category._id} to={{pathname: "/", query: {cat: category.slug}}}>{category.name}</Link>,
      )}
    </div>
  )
};

UsersCategories.displayName = "UsersCategories";

registerComponent('UsersCategories', UsersCategories);
