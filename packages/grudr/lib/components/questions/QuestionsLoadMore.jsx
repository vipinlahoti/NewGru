import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import classNames from 'classnames';
import Button from 'react-bootstrap/lib/Button';

const QuestionsLoadMore = ({loading, loadMore, count, totalCount}) => {
  return (
    <div className={classNames('section-components-md-t', {'questions-load-more-loading': loading})}>
      <Button className="waves-effect waves-light" block onClick={e => {e.preventDefault(); loadMore();}}>
        <span><FormattedMessage id="questions.load_more"/></span>
        &nbsp;
        {totalCount ? <span className="load-more-count">{`(${count}/${totalCount})`}</span> : null}
      </Button>
      {loading ? <div className="questions-load-more-loader"><Components.Loading/></div> : null}
    </div>
  )
}

QuestionsLoadMore.displayName = "QuestionsLoadMore";

registerComponent('QuestionsLoadMore', QuestionsLoadMore);
