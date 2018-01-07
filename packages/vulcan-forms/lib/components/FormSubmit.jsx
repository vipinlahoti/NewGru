import React from 'react';
import PropTypes from 'prop-types';
import { Components } from 'meteor/vulcan:core';
import { registerComponent } from 'meteor/vulcan:core';
import Button from 'react-bootstrap/lib/Button';
import { FormattedMessage } from 'meteor/vulcan:i18n';


const FormSubmit = ({
                      submitLabel,
                      cancelLabel,
                      cancelCallback,
                      document,
                      deleteDocument,
                      collectionName,
                      classes
                    }) => (
  <div className="form-submit">
    
    <Button type="submit" bsStyle="primary">
      {submitLabel ? submitLabel : <FormattedMessage id="forms.submit"/>}
    </Button>
    
    {
      cancelCallback
        ?
        <a className="form-cancel" onClick={(e) => {
          e.preventDefault();
          cancelCallback(document);
        }}>{cancelLabel ? cancelLabel :
          <FormattedMessage id="forms.cancel"/>}</a>
        :
        null
    }
    
    {
      deleteDocument
        ?
        <div>
          <br />
          <Button onClick={deleteDocument} className={`delete-link ${collectionName}-delete-link btn-flat waves-effect waves-light`} bsSize="small">
            <Components.Icon name="delete"/> <FormattedMessage id="forms.delete"/>
          </Button>
        </div>
        :
        null
    }
  
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
