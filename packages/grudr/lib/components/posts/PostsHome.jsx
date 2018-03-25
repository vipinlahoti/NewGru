import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Components, registerComponent } from 'meteor/vulcan:core';
import { Jumbotron, Container, Row, Button } from 'reactstrap';

const PostsHome = (props, context) => {
  const terms = _.isEmpty(props.location && props.location.query) ? {view: 'new'}: props.location.query;
  return (
    <div>
      <Jumbotron>
        <h3 className="title">Articles</h3>
      </Jumbotron>
      <div className="main">
        <Container>
          <Row>
            <Components.PostsList terms={terms}/>
          </Row>
        </Container>
      </div>
    </div>
  )
};

PostsHome.displayName = "PostsHome";

registerComponent('PostsHome', PostsHome);
