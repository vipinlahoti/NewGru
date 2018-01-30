import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Helmet from 'react-helmet';
import { Grid, Row, Col, Jumbotron } from 'react-bootstrap';

const AdminLayout = ({currentUser, children, currentRoute}) =>

  <div className={classNames('wrapper', `wrapper-${currentRoute.name.replace('.', '-')}`)} id="wrapper">

    <Helmet>
      <link name="font-face" rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700|Roboto:300,400,500,700|Roboto+Slab:400,500,600,700|Material+Icons"/>
      <link name="font-awesome" rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
    </Helmet>
   
    <Components.HeadTags />

    {currentUser ? <Components.UsersProfileCheck currentUser={currentUser} documentId={currentUser._id} /> : null}

    <div className="admin-layout">
      <Components.Header />
      <Components.AdminHeader />

      <Jumbotron>
        <Grid>
          <Row>
            <Col md={8}>
              <h3 className="title">Admin</h3>
              <h5></h5>
            </Col>
          </Row>
        </Grid>
      </Jumbotron>
      <div className="main">
        <Grid>
          <Components.FlashMessages />
          {React.cloneElement(children, { currentUser })}
        </Grid>
      </div>
      <Components.Footer />
    </div>
  
  </div>

registerComponent('AdminLayout', AdminLayout, withCurrentUser);
