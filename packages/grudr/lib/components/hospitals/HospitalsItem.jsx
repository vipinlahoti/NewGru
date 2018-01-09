import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Link } from 'react-router';
import { Hospitals } from '../../modules/hospitals/index.js';
import moment from 'moment';
import { Grid, Row, Col, Jumbotron, Button } from 'react-bootstrap';

class HospitalsItem extends PureComponent {

  renderCategories() {
    return this.props.hospital.categories && this.props.hospital.categories.length > 0 ? <Components.HospitalsCategories hospital={this.props.hospital} /> : "";
  }

  renderHosReviewers() {
    return this.props.hospital.hosReviewers && this.props.hospital.hosReviewers.length > 0 ? <Components.HospitalsHosReviewers hospital={this.props.hospital}/> : "";
  }

  renderActions() {
    return (
      <div className="stats article-admin">
        <Components.ModalTrigger title="Edit Hospital" component={<Button className="pink waves-effect waves-light" bsSize="small"><FormattedMessage id="hospitals.edit"/></Button>}>
          <Components.HospitalsEditForm hospital={this.props.hospital} />
        </Components.ModalTrigger>
      </div>
    )
  }
  
  render() {

    const {hospital} = this.props;

    let hospitalClass = "card";
    if (hospital.sticky) hospitalClass += " card";

    return (
      <div className={hospitalClass}>
        
        <div className="card-content">
          <h3 className="card-title">
            <Link to={Hospitals.getPageUrl(hospital)}>
              {hospital.excerpt}
            </Link>
            {/* {this.renderCategories()} */}
          </h3>
          
          <div className="card-footer">
            <div className="author">
              {hospital.user? <div className="author"><Components.UsersAvatar user={hospital.user} size="xsmall"/> <Components.UsersName user={hospital.user}/>, &nbsp;</div> : null}
              <span className="article-time">
                {hospital.postedAt ? moment(new Date(hospital.postedAt)).fromNow() : <FormattedMessage id="hospitals.dateNotDefined"/>}
              </span>
            </div>
            
            <div className="stats">
              <Button className="btn-flat waves-effect waves-dark" bsSize="small">
                <Components.Icon name="comment" />
                {!hospital.hosReviewCount || hospital.hosReviewCount === 0 ? <FormattedMessage id="hosReviews.count_0"/> : 
                  hospital.hosReviewCount === 1 ? <FormattedMessage id="hosReviews.count_1" /> :
                    <FormattedMessage id="hosReviews.count_2" values={{count: hospital.hosReviewCount}}/>
                }
              </Button>
            </div>

            {/*
            <div className="stats">
              <Components.Vote collection={Hospitals} document={hospital} currentUser={this.props.currentUser} />
            </div>
            */}

            {this.props.currentUser && this.props.currentUser.isAdmin ? <Components.HospitalsStats hospital={hospital} /> : null}
            {/*
            {Hospitals.options.mutations.edit.check(this.props.currentUser, hospital) ? this.renderActions() : null}
            {this.renderHosReviewers()}
            */}
          </div>
          
        </div>
      </div>
    )
  }
}

HospitalsItem.propTypes = {
  currentUser: PropTypes.object,
  hospital: PropTypes.object.isRequired,
  terms: PropTypes.object,
};

registerComponent('HospitalsItem', HospitalsItem);
