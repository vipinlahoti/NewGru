import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { Grid, Row, Col, Jumbotron } from 'react-bootstrap';
import { Hospitals } from '../../modules/hospitals/index.js';


const HospitalsHome = (props, context) =>
  <div>
    <Jumbotron>
      <Grid>
        <Row>
          <Col md={8}>
            <h3 className="title">Hospitals</h3>
            <h5>Meet the amazing team behind this project and find out more about how we work.</h5>
          </Col>
        </Row>
      </Grid>
    </Jumbotron>
    <div className="main">
      <Grid>
        <Components.ShowIf check={Hospitals.options.mutations.new.check}>
          <Components.HospitalsNewButton/>
        </Components.ShowIf>
        <Components.HospitalsList/>
      </Grid>
    </div>
  </div>

HospitalsHome.displayName = "HospitalsHome";

registerComponent('HospitalsHome', HospitalsHome);
