import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Link } from 'react-router';
import { Questions } from '../../modules/questions/index.js';
import moment from 'moment';
import { Grid, Row, Col, Jumbotron, Button } from 'react-bootstrap';

class QuestionsItem extends PureComponent {

  renderCategories() {
    return this.props.question.categories && this.props.question.categories.length > 0 ? <Components.QuestionsCategories question={this.props.question} /> : "";
  }

  renderAnswerers() {
    return this.props.question.answerers && this.props.question.answerers.length > 0 ? <Components.QuestionsAnswerers question={this.props.question}/> : "";
  }

  renderActions() {
    return (
      <div className="stats article-admin">
        <Components.ModalTrigger title="Edit Question" component={<Button className="pink waves-effect waves-light" bsSize="small"><FormattedMessage id="questions.edit"/></Button>}>
          <Components.QuestionsEditForm question={this.props.question} />
        </Components.ModalTrigger>
      </div>
    )
  }
  
  render() {

    const {question} = this.props;

    let questionClass = "card";
    if (question.sticky) questionClass += " card";

    return (
      <div className={questionClass}>
        
        {question.thumbnailUrl ?
          <div className="card-image">
            <Components.QuestionsThumbnail question={question}/>
          </div>
        : null}

        <div className="card-content">
          <h3 className="card-title">
            <Link to={Questions.getPageUrl(question)}>
              {question.title}
            </Link>
            {/* {this.renderCategories()} */}
          </h3>
          
          <div className="card-excerpt">
            {question.excerpt}
          </div>
          
          <div className="card-footer">
            <div className="author">
              {question.user? <div className="author"><Components.UsersAvatar user={question.user} size="xsmall"/> <Components.UsersName user={question.user}/>, &nbsp;</div> : null}
              <span className="article-time">
                {question.postedAt ? moment(new Date(question.postedAt)).fromNow() : <FormattedMessage id="questions.dateNotDefined"/>}
              </span>
            </div>
            
            <div className="stats">
              <Button className="btn-flat waves-effect waves-dark" bsSize="small">
                <Components.Icon name="comment" />
                {!question.answerCount || question.answerCount === 0 ? <FormattedMessage id="answers.count_0"/> : 
                  question.answerCount === 1 ? <FormattedMessage id="answers.count_1" /> :
                    <FormattedMessage id="answers.count_2" values={{count: question.answerCount}}/>
                }
              </Button>
            </div>

            {/*
            <div className="stats">
              <Components.Vote collection={Questions} document={question} currentUser={this.props.currentUser} />
            </div>
            */}

            {this.props.currentUser && this.props.currentUser.isAdmin ? <Components.QuestionsStats question={question} /> : null}
            {/*
            {Questions.options.mutations.edit.check(this.props.currentUser, question) ? this.renderActions() : null}
            {this.renderAnswerers()}
            */}
          </div>
          
        </div>
      </div>
    )
  }
}

QuestionsItem.propTypes = {
  currentUser: PropTypes.object,
  question: PropTypes.object.isRequired,
  terms: PropTypes.object,
};

registerComponent('QuestionsItem', QuestionsItem);
