import { Components, registerComponent, ModalTrigger } from 'meteor/vulcan:core';
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

  renderCommenters() {
    return this.props.hospital.commenters && this.props.hospital.commenters.length > 0 ? <Components.HospitalsCommenters hospital={this.props.hospital}/> : "";
  }

  renderActions() {
    return (
      <div className="stats article-admin">
        <ModalTrigger title="Edit Hospital" component={<Button className="pink waves-effect waves-light" bsSize="small"><FormattedMessage id="hospitals.edit"/></Button>}>
          <Components.HospitalsEditForm hospital={this.props.hospital} />
        </ModalTrigger>
      </div>
    )
  }
  
  render() {

    const {hospital} = this.props;

    let hospitalClass = "card";
    if (hospital.sticky) hospitalClass += " card";

    return (
      <div className={hospitalClass}>

        {hospital.thumbnailUrl ?
          <div className="card-image">
            <Components.HospitalsThumbnail hospital={hospital}/>
          </div>
        : null}

        <div className="card-content">
          <h3 className="card-title">
            <Link to={Hospitals.getPageUrl(hospital)}>
              {hospital.name}
            </Link>
          </h3>
          
          <div className="card-footer">
            {this.props.currentUser && this.props.currentUser.isAdmin ? <Components.HospitalsStats hospital={hospital} /> : null}
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
