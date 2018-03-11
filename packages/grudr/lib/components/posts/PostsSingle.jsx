import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';

const PostsSingle = (props, context) => {
  return <Components.PostsPage documentId={props.params._id} routerBack={props.routes} />
};

PostsSingle.displayName = "PostsSingle";

registerComponent('PostsSingle', PostsSingle);
