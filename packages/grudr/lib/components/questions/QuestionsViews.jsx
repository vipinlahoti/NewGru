import { registerComponent, withCurrentUser, Utils } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import { LinkContainer } from 'react-router-bootstrap';
import { withRouter } from 'react-router'
import Users from 'meteor/vulcan:users';

const QuestionsViews = (props, context) => {

  let views = ['top', 'new', 'best'];
  const adminViews = ['pending', 'rejected', 'scheduled'];

  if (Users.canDo(props.currentUser, 'questions.edit.all')) {
    views = views.concat(adminViews);
  }

  const query = _.clone(props.router.location.query);

  return (
    <div className="questions-views">
      <DropdownButton
        bsStyle="default"
        className="views btn-secondary"
        title={context.intl.formatMessage({id: 'questions.view'})}
        id="views-dropdown"
      >
        {views.map(view =>
          <LinkContainer key={view} to={{pathname: Utils.getRoutePath('questions.list'), query: {...query, view: view}}} className="dropdown-item">
            <MenuItem>
              <FormattedMessage id={"questions."+view}/>
            </MenuItem>
          </LinkContainer>
        )}
        <LinkContainer to="/daily" className="dropdown-item">
          <MenuItem className="bar">
            <FormattedMessage id="questions.daily"/>
          </MenuItem>
        </LinkContainer>
      </DropdownButton>
    </div>
  )
}

QuestionsViews.propTypes = {
  currentUser: PropTypes.object,
  defaultView: PropTypes.string
};

QuestionsViews.defaultProps = {
  defaultView: 'top'
};

QuestionsViews.contextTypes = {
  currentRoute: PropTypes.object,
  intl: intlShape
};

QuestionsViews.displayName = 'QuestionsViews';

registerComponent('QuestionsViews', QuestionsViews, withCurrentUser, withRouter);
