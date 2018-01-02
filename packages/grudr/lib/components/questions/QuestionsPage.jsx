import { Components, registerComponent, withDocument, withCurrentUser, getActions, withMutation } from 'meteor/vulcan:core';
import { Questions } from '../../modules/questions/index.js';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Grid, Row, Col, Jumbotron, Media } from 'react-bootstrap';
import moment from 'moment';
import Button from 'react-bootstrap/lib/Button';

class QuestionsPage extends Component {

  renderActions() {
    const question = this.props.document;

    return (
      <span className="stats">
        <Components.ModalTrigger title="Edit an Article" component={ <Button className="pink pull-right waves-effect waves-light" bsSize="small"><Components.Icon name="mode_edit" /> <FormattedMessage id="questions.edit"/></Button> }>
          <Components.QuestionsEditForm question={question} />
        </Components.ModalTrigger>
      </span>
    )
  }
  
  render() {
    if (this.props.loading) {
      
      return <div className="questions-page"><Components.Loading/></div>
      
    } else if (!this.props.document) {
      
      console.log(`// missing question (_id: ${this.props.documentId})`);
      return <div className="questions-page"><FormattedMessage id="app.404"/></div> 

    } else {
      const question = this.props.document;
      const htmlBody = {__html: question.htmlBody};

      return (
        <div>

          <Components.HeadTags url={Questions.getPageUrl(question, true)} title={question.title} image={question.thumbnailUrl} description={question.excerpt} />
          
          <Jumbotron>
            <Grid>
              <Row>
                <Col md={9}>
                  <h3 className="title">{ question.title }</h3>
                  <h5>
                    { question.user ? <div className="author"><Components.UsersAvatar user={question.user} size="xsmall"/> <Components.UsersName user={ question.user }/>, &nbsp;</div> : null }
                    <span className="stats">{ question.postedAt ? moment(new Date(question.postedAt)).fromNow() : <FormattedMessage id="questions.dateNotDefined"/> }</span>
                    
                    <span className="stats">
                      <Button className="btn-flat waves-effect waves-light" bsSize="small">
                        <Components.Icon name="comment" />
                        {!question.answerCount || question.answerCount === 0 ? <FormattedMessage id="answers.count_0"/> : 
                          question.answerCount === 1 ? <FormattedMessage id="answers.count_1" /> :
                          <FormattedMessage id="answers.count_2" values={{count: question.answerCount}}/>
                        }
                      </Button>
                    </span>

                    {Questions.options.mutations.edit.check(this.props.currentUser, question) ? this.renderActions() : null}
                    <Components.QuestionsListHeader/>
                  </h5>
                </Col>
              </Row>
            </Grid>
          </Jumbotron>

          <div className="main">
            <Grid>
              <Row>
                <Col md={8} mdOffset={2}>
                  {question.thumbnailUrl ?
                  <div className="card card-single no-margin no-padding">
                    <div className="card-image">
                      <Components.QuestionsThumbnail question={question}/>
                    </div>
                  </div>
                  : null}

                  {question.htmlBody ? <div className="section-components-md" dangerouslySetInnerHTML={htmlBody}></div> : null}
                  
                </Col>
              </Row>

              <Components.QuestionsAnswersThread terms={{questionId: question._id, view: 'questionAnswers'}} />
            </Grid>
          </div>

        </div> 
      );
      
    }
  }
  
  // triggered after the component did mount on the client
  async componentDidMount() {
    try {
      
      // destructure the relevant props
      const { 
        // from the parent component, used in withDocument, GraphQL HOC
        documentId,
        // from connect, Redux HOC 
        setViewed, 
        questionsViewed, 
        // from withMutation, GraphQL HOC
        increaseQuestionViewCount,
      } = this.props;
      
      // a question id has been found & it's has not been seen yet on this client session
      if (documentId && !questionsViewed.includes(documentId)) {
        
        // trigger the asynchronous mutation with questionId as an argument
        await increaseQuestionViewCount({questionId: documentId});
        
        // once the mutation is done, update the redux store
        setViewed(documentId);
      }
      
    } catch(error) {
      console.log(error); // eslint-disable-line
    }
  }
}

QuestionsPage.displayName = "QuestionsPage";

QuestionsPage.propTypes = {
  documentId: PropTypes.string,
  document: PropTypes.object,
  questionsViewed: PropTypes.array,
  setViewed: PropTypes.func,
  increaseQuestionViewCount: PropTypes.func,
}

const queryOptions = {
  collection: Questions,
  queryName: 'questionsSingleQuery',
  fragmentName: 'QuestionsPage',
};

const mutationOptions = {
  name: 'increaseQuestionViewCount',
  args: {questionId: 'String'},
};

const mapStateToProps = state => ({ questionsViewed: state.questionsViewed });
const mapDispatchToProps = dispatch => bindActionCreators(getActions().questionsViewed, dispatch);

registerComponent(
  // component name used by Vulcan
  'QuestionsPage', 
  // React component 
  QuestionsPage,
  // HOC to give access to the current user
  withCurrentUser, 
  // HOC to load the data of the document, based on queryOptions & a documentId props
  [withDocument, queryOptions], 
  // HOC to provide a single mutation, based on mutationOptions
  withMutation(mutationOptions), 
  // HOC to give access to the redux store & related actions
  connect(mapStateToProps, mapDispatchToProps)
);
