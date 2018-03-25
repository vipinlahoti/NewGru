import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';
import { Posts } from '../../modules/posts/index.js';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class NewButton extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    // const button = <Button color="secondary" className="btn-floating pull-right waves-effect waves-light"><Components.Icon name="add"/>New</Button>;
    return (
      <div className="new-button">
        <ButtonDropdown direction="up" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>
            <Components.Icon name="add"/>
          </DropdownToggle>
          <DropdownMenu>
            <Components.ShowIf check={Posts.options.mutations.new.check}>
              <DropdownItem tag={Link} to={`post/new`} className="waves-effect waves-light">Write an Article</DropdownItem>
            </Components.ShowIf>
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    )
  }
}

NewButton.displayName = 'NewButton';

NewButton.propTypes = {
  currentUser: PropTypes.object,
};

NewButton.contextTypes = {
  messages: PropTypes.object,
  intl: intlShape
};

registerComponent('NewButton', NewButton, withCurrentUser);
