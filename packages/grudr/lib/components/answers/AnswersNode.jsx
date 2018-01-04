import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const AnswersNode = ({ answer, currentUser }) =>
  <div className="media-node">
    <Components.AnswersItem currentUser={currentUser} answer={answer} key={answer._id} />
    {answer.childrenResults ? 
      <div className="media-children">
        {answer.childrenResults.map(answer => <AnswersNode currentUser={currentUser} answer={answer} key={answer._id} />)}
      </div>
      : null
    }
  </div>

AnswersNode.propTypes = {
  answer: PropTypes.object.isRequired, // the current answer
};

registerComponent('AnswersNode', AnswersNode);
