import { replaceComponent } from 'meteor/vulcan:lib';
import React from 'react';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Grid, Row, Col, Jumbotron } from 'react-bootstrap';

const Error404 = () => {
  return (
    <div>
      <Jumbotron>
        <Grid>
          <Row>
            <Col md={8}>
              <h3 className="title">404</h3>
            </Col>
          </Row>
        </Grid>
      </Jumbotron>
      <div className="main">
        <Grid>
          <div className="section">
            <h2 className="title center-align error-page">404</h2>
            <h6 className="title center-align"><FormattedMessage id="app.404"/></h6>
          </div>
        </Grid>
      </div>
    </div>
  )
}

replaceComponent('Error404', Error404);
