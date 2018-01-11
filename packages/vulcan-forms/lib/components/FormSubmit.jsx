import React from 'react';
import PropTypes from 'prop-types';
import { Components } from 'meteor/vulcan:core';
import { registerComponent } from 'meteor/vulcan:core';
import Button from 'react-bootstrap/lib/Button';
import { FormattedMessage } from 'meteor/vulcan:i18n';


const FormSubmit = ({ submitLabel, cancelLabel, cancelCallback, document, deleteDocument, collectionName, classes }) => (
  <div className="form-submit">
    <Button type="submit" className="waves-effect waves-light">
      {submitLabel ? submitLabel : <FormattedMessage id="forms.submit"/>}
    </Button>
    
    { cancelCallback ?
      <Button className="btn-flat waves-effect waves-dark" bsSize="small" onClick={(e) => {cancelCallback(document);}}>
        {cancelLabel ? cancelLabel : <FormattedMessage id="forms.cancel"/>}
      </Button>
    : null }
    
    { deleteDocument ?
      <Button className={`delete-link ${collectionName}-delete-link btn-flat waves-effect waves-dark`} bsSize="small" onClick={deleteDocument}>
        <Components.Icon name="delete"/> <FormattedMessage id="forms.delete"/>
      </Button>
    : null }
  </div>
);


FormSubmit.propTypes = {
  submitLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  cancelCallback: PropTypes.func,
  document: PropTypes.object,
  deleteDocument: PropTypes.func,
  collectionName: PropTypes.string,
  classes: PropTypes.object,
};

registerComponent('FormSubmit', FormSubmit);
