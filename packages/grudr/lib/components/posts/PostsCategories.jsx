import { registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { Link } from 'react-router';
import { Badge } from 'reactstrap';

const PostsCategories = ({post}) => {
  return (
    <div className="posts-categories">
      {post.categories.map(category => 
        <Badge tag={Link} color="dark" key={category._id} to={{pathname: "/", query: {cat: category.slug}}}>{category.name}</Badge>
      )}
    </div>
  )
};

PostsCategories.displayName = "PostsCategories";

registerComponent('PostsCategories', PostsCategories);
