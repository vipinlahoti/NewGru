import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import classNames from 'classnames';
import Button from 'react-bootstrap/lib/Button';

const HospitalsLoadMore = ({loading, loadMore, count, totalCount}) => {
  return (
    <div className={classNames('section-components-md-t', {'hospitals-load-more-loading': loading})}>
      <Button className="waves-effect waves-light" block onClick={e => {e.preventDefault(); loadMore();}}>
        <span><FormattedMessage id="hospitals.load_more"/></span>
        &nbsp;
        {totalCount ? <span className="load-more-count">{`(${count}/${totalCount})`}</span> : null}
      </Button>
      {loading ? <div className="hospitals-load-more-loader"><Components.Loading/></div> : null}
    </div>
  )
}

HospitalsLoadMore.displayName = "HospitalsLoadMore";

registerComponent('HospitalsLoadMore', HospitalsLoadMore);
