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

  renderCategories() {
    return this.props.document.categories && this.props.document.categories.length > 0 ? <Components.HospitalsCategories hospital={this.props.document} /> : "";
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

          <Components.HeadTags url={Hospitals.getPageUrl(hospital, true)} title={hospital.name} image={hospital.thumbnailUrl} description={hospital.excerpt} />
          
          <Jumbotron>
          <Grid>
          </Grid>
        </Jumbotron>

          <div className="main">
            <Grid>
              <div className="profile-content">
                <div className="profile-header">
                  <Row>
                    <Col md={8}>
                      <div className="profile">
                        <div className="avatar avatar-large avatar-hospital left">
                          {hospital.thumbnailUrl ?
                            <Components.HospitalsThumbnail hospital={hospital}/>
                          : 
                          <img className="avatar-image" src="https://www.susquehannahealth.org/sites/default/files/styles/wide/public/default_images/hospital-placeholder.jpg?itok=iWo4HDoj" />
                        }
                        </div>
                        <div className="profile-initials left">
                          <h4 className="title">{ hospital.name }</h4>
                          <div className="title profile-certificates">{this.renderCategories()} </div>
                        </div>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="follow">
                        {Hospitals.options.mutations.edit.check(this.props.currentUser, hospital) ? this.renderActions() : null}
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
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
