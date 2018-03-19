import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Components, registerComponent } from 'meteor/vulcan:core';
import { Posts } from '../../modules/posts/index.js';
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
            <Components.ShowIf check={Posts.options.mutations.new.check}>
              <Button tag={Link} to={`post/new`} className="waves-effect waves-light">
                New
              </Button>
            </Components.ShowIf>
            <Components.PostsList terms={terms}/>
          </Row>
        </Container>
      </div>
    </div>
  )
};

PostsHome.displayName = "PostsHome";

registerComponent('PostsHome', PostsHome);
