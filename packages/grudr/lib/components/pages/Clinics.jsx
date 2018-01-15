import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';
import { Grid, Row, Col, Jumbotron } from 'react-bootstrap';


const Clinics = () => {
  const headerBg = {
    background: `url(//s3.amazonaws.com/creativetim_bucket/products/56/cover_nuk_regular.jpg) no-repeat 50% center / cover`
  }
  return (
    <div>
      <Jumbotron>
        <Grid>
          <Row>
            <Col md={8}>
              <h3 className="title">Near by Hospitals / Clinics</h3>
              <h5></h5>
            </Col>
          </Row>
        </Grid>
      </Jumbotron>

      <div className="main">
        <div className="section-components">
          <Grid>
            <Row>
              <Col md={8} mdOffset={2}>
                <h5 className="description center-align">Lists of nearby Clinics and Hospitals with Map.</h5>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    </div>
  )
}

registerComponent('Clinics', Clinics);
