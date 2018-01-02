import { registerComponent } from 'meteor/vulcan:core';
import React from 'react';

const AnswersLoadMore = ({loadMore, count, totalCount}) => {
  const label = totalCount ? `Load More (${count}/${totalCount})` : "Load More";
  return <a className="answers-load-more" onClick={e => { e.preventDefault(); loadMore();}}>{label}</a>
}

AnswersLoadMore.displayName = "AnswersLoadMore";

registerComponent('AnswersLoadMore', AnswersLoadMore);
