import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { withList, withCurrentUser, Components, registerComponent, Utils } from 'meteor/vulcan:core';
import { Answers } from '../../modules/answers/index.js';
import { Row, Col } from 'react-bootstrap';

const QuestionsAnswersThread = (props, /* context*/) => {

  const {loading, terms: { questionId }, results, totalCount, currentUser} = props;
  
  if (loading) {
  
    return <div className="questions-answers-thread"><Components.Loading/></div>
  
  } else {
    
    const resultsClone = _.map(results, _.clone); // we don't want to modify the objects we got from props
    const nestedAnswers = Utils.unflatten(resultsClone, {idProperty: '_id', parentIdProperty: 'parentAnswerId'});

    return (
      <div className="section-answers">
        <Row>
          <Col md={8} mdOffset={2}>
            <div className="media-area">
              {(totalCount > 0) ?
                <div>
                  <div className="section-half">
                    <h4 className="title center-align">{totalCount} <FormattedMessage id="answers.answers"/></h4>
                  </div>
                  <Components.AnswersList currentUser={currentUser} answers={nestedAnswers} answerCount={totalCount}/>
                </div>
              : null }
              
              {!!currentUser ?
                <div>
                  <h4 className="title center-align"><FormattedMessage id="answers.new"/></h4>
                  <Components.AnswersNewForm
                    questionId={questionId} 
                    type="answer" 
                  />
                </div> :
                <Components.ModalTrigger size="small" component={<a href="" className="title"><FormattedMessage id="answers.please_log_in"/></a>}>
                  <Components.AccountsLoginForm/>
                </Components.ModalTrigger>
              }
            </div>
          </Col>
        </Row>
      </div>
    );
  }
};


QuestionsAnswersThread.displayName = 'QuestionsAnswersThread';

QuestionsAnswersThread.propTypes = {
  currentUser: PropTypes.object
};

const options = {
  collection: Answers,
  queryName: 'answersListQuery',
  fragmentName: 'AnswersList',
  limit: 0,
};

registerComponent('QuestionsAnswersThread', QuestionsAnswersThread, [withList, options], withCurrentUser);
