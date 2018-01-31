import { Components, registerComponent, withDocument, withCurrentUser, getActions, withMutation } from 'meteor/vulcan:core';
import { Hospitals } from '../../modules/hospitals/index.js';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Grid, Row, Col, Jumbotron, Media } from 'react-bootstrap';
import moment from 'moment';
import Button from 'react-bootstrap/lib/Button';
import { Link } from 'react-router';

class HospitalsPage extends Component {

  renderActions() {
    const hospital = this.props.document;

    return (
      <span className="stats">
        <Components.ModalTrigger title="Edit an Article" component={ <Button className="pink pull-right waves-effect waves-light" bsSize="small"><Components.Icon name="mode_edit" /> <FormattedMessage id="hospitals.edit"/></Button> }>
          <Components.HospitalsEditForm hospital={hospital} />
        </Components.ModalTrigger>
      </span>
    )
  }
  
  render() {
    if (this.props.loading) {
      
      return <div className="hospitals-page"><Components.Loading/></div>
      
    } else if (!this.props.document) {
      
      // console.log(`// missing hospital (_id: ${this.props.documentId})`);
      return <div className="hospitals-page"><FormattedMessage id="app.404"/></div> 

    } else {
      const hospital = this.props.document;
      const htmlBody = {__html: hospital.htmlBody};

      return (
        <div>

          <Components.HeadTags url={Hospitals.getPageUrl(hospital, true)} title={hospital.title} image={hospital.thumbnailUrl} description={hospital.excerpt} />
          
          <Jumbotron>
            <Grid>
              <Row>
                <Col md={9}>
                  <h3 className="title">{ hospital.title }</h3>
                  <h5>
                    { hospital.user ? <div className="author"><Components.Avatar user={hospital.user} /> <Components.UsersName user={ hospital.user }/>, &nbsp;</div> : null }
                    <span className="stats">{ hospital.createdAt ? moment(new Date(hospital.createdAt)).fromNow() : <FormattedMessage id="hospitals.dateNotDefined"/> }</span>

                    {Hospitals.options.mutations.edit.check(this.props.currentUser, hospital) ? this.renderActions() : null}
                  </h5>
                </Col>
              </Row>
            </Grid>
          </Jumbotron>

          <div className="main">
            <Grid>
              <Row>
                <Col md={8} mdOffset={2}>
                  {hospital.thumbnailUrl ?
                  <div className="card card-single no-margin no-padding">
                    <div className="card-image">
                      <Components.HospitalsThumbnail hospital={hospital}/>
                    </div>
                  </div>
                  : null}

                  {hospital.htmlBody ? <div className="section-components-md" dangerouslySetInnerHTML={htmlBody}></div> : null}
                  
                </Col>
              </Row>
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
        hospitalsViewed, 
        // from withMutation, GraphQL HOC
        increaseHospitalViewCount,
      } = this.props;
      
      // a hospital id has been found & it's has not been seen yet on this client session
      if (documentId && !hospitalsViewed.includes(documentId)) {
        
        // trigger the asynchronous mutation with hospitalId as an argument
        await increaseHospitalViewCount({hospitalId: documentId});
        
        // once the mutation is done, update the redux store
        setViewed(documentId);
      }
      
    } catch(error) {
      console.log(error); // eslint-disable-line
    }
  }
}

HospitalsPage.displayName = "HospitalsPage";

HospitalsPage.propTypes = {
  documentId: PropTypes.string,
  document: PropTypes.object,
  hospitalsViewed: PropTypes.array,
  setViewed: PropTypes.func,
  increaseHospitalViewCount: PropTypes.func,
}

const queryOptions = {
  collection: Hospitals,
  queryName: 'hospitalsSingleQuery',
  fragmentName: 'HospitalsPage',
};

const mutationOptions = {
  name: 'increaseHospitalViewCount',
  args: {hospitalId: 'String'},
};

const mapStateToProps = state => ({ hospitalsViewed: state.hospitalsViewed });
const mapDispatchToProps = dispatch => bindActionCreators(getActions().hospitalsViewed, dispatch);

registerComponent(
  // component name used by Vulcan
  'HospitalsPage', 
  // React component 
  HospitalsPage,
  // HOC to give access to the current user
  withCurrentUser, 
  // HOC to load the data of the document, based on queryOptions & a documentId props
  [withDocument, queryOptions], 
  // HOC to provide a single mutation, based on mutationOptions
  withMutation(mutationOptions), 
  // HOC to give access to the redux store & related actions
  connect(mapStateToProps, mapDispatchToProps)
);
