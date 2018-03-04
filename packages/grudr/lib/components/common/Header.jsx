import React from 'react';
import PropTypes from 'prop-types';
import { withCurrentUser, getSetting, Components, registerComponent } from 'meteor/vulcan:core';
import { Posts } from '../../modules/posts/index.js';
import { Link } from 'react-router';
import Button from 'react-bootstrap/lib/Button';
import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';

const Header = (props) => {
  
  const logoUrl = getSetting('logoUrl');
  const siteTitle = getSetting('title', 'Grudr');

  return (
    <div className="header-wrapper">

      <header className="header">

        <div className="logo">
          <Components.Logo logoUrl={logoUrl} siteTitle={siteTitle} />
        </div>
        
        <div className="nav">
          
          <div className="nav-user">
            {!!props.currentUser ? <Components.UsersMenu/> : 
              <Components.ModalTrigger size="small" component={<Button><Components.Icon name="lock"/> Login</Button>}>
                <Components.AccountsLoginForm />
              </Components.ModalTrigger>
            }
          </div>

          <div className="nav-new-post">
            <Components.ShowIf check={Posts.options.mutations.new.check}>
              <Link to={`post/new`}>
                <FormattedMessage id="posts.new_post"/>
              </Link>
            </Components.ShowIf>
          </div>

        </div>

      </header>
    </div>
  )
}

Header.displayName = "Header";

Header.propTypes = {
  currentUser: PropTypes.object,
};

registerComponent('Header', Header, withCurrentUser);
