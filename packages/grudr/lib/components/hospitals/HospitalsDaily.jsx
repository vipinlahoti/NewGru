import { Components, registerComponent, getSetting, registerSetting } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';
import moment from 'moment';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Grid, Row, Col, Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router';

registerSetting('forum.numberOfDays', 5, 'Number of days to display in Daily view');

const HospitalsDaily = props => {
  // const terms = props.location && props.location.query;
  const numberOfDays = getSetting('forum.numberOfDays', 5);
  const terms = {
    view: 'top',
    after: moment().subtract(numberOfDays - 1, 'days').format('YYYY-MM-DD'),
    before: moment().format('YYYY-MM-DD'),
  };

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
          <Link to={`/hospitals/new`} className="btn btn-floating pull-right waves-effect waves-light">
            <Components.Icon name="add"/>
          </Link>
          <Components.HospitalsDailyList terms={terms}/>
        </Grid>
      </div>
    </div>
  )
};

HospitalsDaily.displayName = 'HospitalsDaily';

registerComponent('HospitalsDaily', HospitalsDaily);
