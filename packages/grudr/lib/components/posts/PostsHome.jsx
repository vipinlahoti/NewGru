import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import { Posts } from '../../modules/posts/index.js';
import { Jumbotron, Button, Container, Row } from 'reactstrap';

const PostsHome = (props, context) => {
  const terms = _.isEmpty(props.location && props.location.query) ? {view: 'top'}: props.location.query;
  return (
    <div>
      <Jumbotron>
        <Container>
          <Row>
            <div>
            <h3 className="title">Hello, world!</h3>
            <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
            <hr className="my-2" />
            <p>It uses utility classes for typgraphy and spacing to space content out within the larger container.</p>
            <p className="lead">
              <Button color="primary">Learn More</Button>
            </p>
            </div>
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
