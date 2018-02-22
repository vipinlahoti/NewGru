import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import { Posts } from '../../modules/posts/index.js';
import { Jumbotron, Container, Row } from 'reactstrap';

const PostsHome = (props, context) => {
  const terms = _.isEmpty(props.location && props.location.query) ? {view: 'new'}: props.location.query;
  return (
    <div>
      <Jumbotron>
        <Container>
          <Row>
            <h3 className="title">Articles</h3>
          </Row>
        </Container>
      </Jumbotron>
      <div className="main">
        <Container>
          <Row>
            <Components.ShowIf check={Posts.options.mutations.new.check}>
              <Components.PostsNewButton/>
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
