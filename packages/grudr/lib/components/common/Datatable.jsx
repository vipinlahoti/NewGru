import { Components, replaceComponent, withList, withCurrentUser, Utils } from 'meteor/vulcan:core';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';
import Button from 'react-bootstrap/lib/Button';

/*

Datatable Component

*/

// see: http://stackoverflow.com/questions/1909441/jquery-keyup-delay
const delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

/*

DatatableHeader Component

*/
const DatatableHeader = ({ collection, column }, { intl }) => {
  const schema = collection.simpleSchema()._schema;
  const columnName = typeof column === 'string' ? column : column.name;

  /*

  use either:
  
  1. the column name translation
  2. the column name label in the schema (if the column name matches a schema field)
  3. the raw column name.
  
  */
  const formattedLabel = intl.formatMessage({ id: `${collection._name}.${columnName}`, defaultMessage: schema[columnName] ? schema[columnName].label : columnName });
  return <th>{formattedLabel}</th>;
}

DatatableHeader.contextTypes = {
  intl: intlShape
};

replaceComponent('DatatableHeader', DatatableHeader);

/*

DatatableContents Component

*/

const DatatableContents = (props) => {
  const {collection, columns, results, loading, loadMore, count, totalCount, networkStatus, showEdit, currentUser, emptyState} = props;
  
  if (loading) {
    return <Components.Loading />;
  } else if (!results.length) {
    return emptyState || null;
  }

  const isLoadingMore = networkStatus === 2;
  const hasMore = totalCount > results.length;

  return (
    <div className="datatable-list">
      <div>
        {results.map((document, index) => <Components.DatatableRow collection={collection} columns={columns} document={document} key={index} showEdit={showEdit} currentUser={currentUser}/>)}
      </div>
      
      <div className="admin-users-load-more">
        {hasMore ? 
          isLoadingMore ? 
            <Components.Loading/> 
            : <Button bsStyle="primary" onClick={e => {e.preventDefault(); loadMore();}}>Load More ({count}/{totalCount})</Button> 
          : null
        }
      </div>
    </div>
  )
}
replaceComponent('DatatableContents', DatatableContents);

/*

DatatableRow Component

*/
const DatatableRow = ({ collection, columns, document, showEdit, currentUser }, { intl }) => {
  return (
  <div className="card card-single datatable-item">
    <div className="card-footer">
      {_.sortBy(columns, column => column.order).map((column, index) => <Components.DatatableCell key={index} column={column} document={document} currentUser={currentUser} />)}
    </div>
    
    {showEdit ? 
      <Components.ModalTrigger 
        label={intl.formatMessage({id: 'datatable.edit'})} 
        component={<Button bsStyle="primary"><FormattedMessage id="datatable.edit" /></Button>}
      >
        <Components.DatatableEditForm collection={collection} document={document} />
      </Components.ModalTrigger>
    : null}

  </div>
  )
}
replaceComponent('DatatableRow', DatatableRow);

DatatableRow.contextTypes = {
  intl: intlShape
};


/*

DatatableCell Component

*/
const DatatableCell = ({ column, document, currentUser }) => {
  const Component = column.component || Components[column.componentName] || Components.DatatableDefaultCell;
  const columnName = column.name || column;
  return (
    <div className={`datatable-item-${columnName.toLowerCase()}`}><Component column={column} document={document} currentUser={currentUser} /></div>
  )
}
replaceComponent('DatatableCell', DatatableCell);
