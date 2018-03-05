import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const PostsHome = (props, context) => {
  const terms = _.isEmpty(props.location && props.location.query) ? {view: 'new'}: props.location.query;
  return (
    <div className="container">
      <div className="row">
        <Components.PostsList terms={terms}/>
      </div>
    </div>
  )
};

PostsHome.displayName = "PostsHome";

registerComponent('PostsHome', PostsHome);
