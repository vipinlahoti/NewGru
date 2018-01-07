import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';
import Users from 'meteor/vulcan:users';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Grid, Row, Col, Jumbotron } from 'react-bootstrap';

const QuestionsHome = ({currentUser}, props, context) => {
  const terms = _.isEmpty(props.location && props.location.query) ? {view: 'top'}: props.location.query;
  

  return (
    <div>
      <Jumbotron>
        <Grid>
          <Row>
            <Col md={8}>
              <h3 className="title"><FormattedMessage id="questions.questions"/></h3>
              <h5>Meet the amazing team behind this project and find out more about how we work.</h5>
            </Col>
          </Row>
        </Grid>
      </Jumbotron>
      <div className="main">
        <Grid>    
          <Components.QuestionsNewButton />
          <Components.QuestionsList terms={terms}/>
        </Grid>
      </div>
    </div>
  )
};

QuestionsHome.displayName = "QuestionsHome";

registerComponent('QuestionsHome', QuestionsHome);
