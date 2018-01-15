import React from 'react';
import { Components, registerComponent, AdminColumns } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import { Grid, Row, Col, Jumbotron } from 'react-bootstrap';

import DoctorName from './columns/DoctorName';

const DoctorsList = () => {

  const headerBg = {
    background: `url(//s3.amazonaws.com/creativetim_bucket/products/56/cover_nuk_regular.jpg) no-repeat 50% center / cover`
  }

  return (
    <div>
      <Jumbotron>
        <Grid>
          <Row>
            <Col md={8}>
              <h3 className="title">Doctors Network</h3>
              <h5>Follow doctors related to your medical condition to stay updated with latest in healthcare</h5>
            </Col>
          </Row>
        </Grid>
      </Jumbotron>

      <div className="main">
        <div className="section-components">
          <Grid>
            <Row>
              <Col md={8} mdOffset={2}>
                <h5 className="description">Lists of nearby Doctors related to your medical condition to stay updated with latest in healthcare</h5>
                <div>
                  
                  <Components.Datatable
                    collection={Users}
                    options={{
                      terms: {view: 'doctorsList'},
                      fragmentName: 'UsersMinimumInfo'
                    }}
                    columns={[
                    {
                      name: 'name',
                      component: DoctorName
                    }
                    ]}
                    showEdit={false}
                  />

                </div>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    </div>
  )
}

registerComponent('DoctorsList', DoctorsList);
