import { Components, registerComponent, withDocument, withCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import Users from 'meteor/vulcan:users';
import { Link } from 'react-router';
import { Jumbotron, Container, Row } from 'reactstrap';

const UsersProfile = (props) => {
  if (props.loading) {

    return <div className="page users-profile"><Components.Loading/></div>

  } else if (!props.document) {

    // console.log(`// missing user (_id/slug: ${props.documentId || props.slug})`);
    return <div className="page users-profile"><FormattedMessage id="app.404"/></div> 
  
  } else {

    const user = props.document;
    const terms = {view: "userPosts", userId: user._id};

    return (
      <div>
        <Components.HeadTags url={Users.getProfileUrl(user, true)} title={Users.getDisplayName(user)} />
        
        <Jumbotron>
          <Container>
            <Row>
              <div>
              <h3 className="title">Hello, world!</h3>
              <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
              </div>
            </Row>
          </Container>
        </Jumbotron>
        <div className="main">
          <Container>
            <Row>
              <div>
                <h2 className="page-title">{Users.getDisplayName(user)}</h2>
                {user.htmlBio ? <div dangerouslySetInnerHTML={{__html: user.htmlBio}}></div> : null }
                <ul>
                  {user.twitterUsername ? <li><a href={"http://twitter.com/" + user.twitterUsername}>@{user.twitterUsername}</a></li> : null }
                  {user.website ? <li><a href={user.website}>{user.website}</a></li> : null }
                  <Components.ShowIf check={Users.options.mutations.edit.check} document={user}>
                    <li><Link to={Users.getEditUrl(user)}><FormattedMessage id="users.edit_account"/></Link></li>
                  </Components.ShowIf>
                </ul>
                <h3><FormattedMessage id="users.posts"/></h3>
                <Components.PostsList terms={terms} showHeader={false} />
              </div>
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}

UsersProfile.propTypes = {
  // document: PropTypes.object.isRequired,
}

UsersProfile.displayName = "UsersProfile";

const options = {
  collection: Users,
  queryName: 'usersSingleQuery',
  fragmentName: 'UsersProfile',
};

registerComponent('UsersProfile', UsersProfile, withCurrentUser, [withDocument, options]);
