import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Users from 'meteor/vulcan:users';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Grid, Row, Col, Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router';

const PostsHome = ({currentUser}, props, context) => {
  const terms = _.isEmpty(props.location && props.location.query) ? {view: 'new'}: props.location.query;
  

  return (
    <div>
      <Jumbotron>
        <Grid>
          <Row>
            <Col md={8}>
              <h3 className="title">Articles</h3>
              <h5>Meet the amazing team behind this project and find out more about how we work.</h5>
            </Col>
          </Row>
        </Grid>
      </Jumbotron>
      <div className="main">
        <Grid>

            {/*<Components.ShowIf check={Users.isAdmin} document={currentUser}>
              <Components.PostsNewButton />
            </Components.ShowIf>*/}
          {/*<Components.PostsNewButton />*/}
          
          <Components.ShowIf check={Users.isWriter} document={currentUser}>
            <Link to={`/posts/new`} className="btn btn-floating pull-right waves-effect waves-light">
              <Components.Icon name="add"/>
            </Link>
          </Components.ShowIf>
          <Components.PostsList terms={terms}/>
        </Grid>
      </div>
    </div>
  )
};

PostsHome.displayName = "PostsHome";

registerComponent('PostsHome', PostsHome);
