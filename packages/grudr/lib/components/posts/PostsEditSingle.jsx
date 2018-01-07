import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';

const PostsEditSingle = (props, context) => {
  const terms = props.params.slug ? { slug: props.params.slug } : props.params._id ? { documentId: props.params._id } : {};
  return <Components.PostsEditForm terms={terms} />
};

PostsEditSingle.displayName = "PostsEditSingle";

registerComponent('PostsEditSingle', PostsEditSingle);
