import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { FormattedMessage } from 'meteor/vulcan:i18n';

const AnswersList = ({answers, answerCount, currentUser}) => {

  if (answerCount > 0) {
    return (
      <div className="answers-list">
        {answers.map(answer => <Components.AnswersNode currentUser={currentUser} answer={answer} key={answer._id} />)}
        {/*hasMore ? (ready ? <Components.AnswersLoadMore loadMore={loadMore} count={count} totalCount={totalCount} /> : <Components.Loading/>) : null*/}
      </div>
    )
  } else {
    return (
      <div className="answers-list">
        <p>
          <FormattedMessage id="answers.no_answers"/>
        </p>
      </div>
    )
  }

};

AnswersList.displayName = "AnswersList";

registerComponent('AnswersList', AnswersList);
