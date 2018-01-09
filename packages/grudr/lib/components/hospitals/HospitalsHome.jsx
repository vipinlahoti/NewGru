import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';
import Users from 'meteor/vulcan:users';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Grid, Row, Col, Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router';

const HospitalsHome = ({currentUser}, props, context) => {
  const terms = _.isEmpty(props.location && props.location.query) ? {view: 'top'}: props.location.query;  

  return (
    <div>
      <Jumbotron>
        <Grid>
          <Row>
            <Col md={8}>
              <h3 className="title"><FormattedMessage id="hospitals.hospitals"/></h3>
              <h5>Meet the amazing team behind this project and find out more about how we work.</h5>
            </Col>
          </Row>
        </Grid>
      </Jumbotron>
      <div className="main">
        <Grid>    
          {/*<Components.HospitalsNewButton />*/}
          <Link to={`/hospitals/new`} className="btn btn-floating pull-right waves-effect waves-light">
            <Components.Icon name="add"/>
          </Link>
          <Components.HospitalsList terms={terms}/>
        </Grid>
      </div>
    </div>
  )
};

HospitalsHome.displayName = "HospitalsHome";

registerComponent('HospitalsHome', HospitalsHome);
