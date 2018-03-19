import { Components, registerComponent, withDocument, withCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import Users from 'meteor/vulcan:users';
import { Link } from 'react-router';

import { Jumbotron, Container, Row, Col, Button } from 'reactstrap';


const UsersProfile = (props) => {
  if (props.loading) {

    return <div><Components.Loading/></div>

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
        </Jumbotron>

        <div className="main">
          <Container>
             <div className="profile-header">
              <Row>
                <Col md={8}>
                  <div className="profile">
                    <div className="avatar avatar-large">
                      <Components.Avatar user={user} link={false} />
                    </div>
                    <div className="profile-initials">
                      <h4 className="title">{Users.getDisplayName(user)}</h4>
                      <div className="profile-certificates">MBBS</div>
                    </div>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="follow float-right">
                    <Components.ShowIf check={Users.options.mutations.edit.check} document={user}>
                      <Button tag={Link} to={Users.getEditUrl(user)} size="sm" className="waves-effect waves-light"><Components.Icon name="mode_edit" /> <FormattedMessage id="users.edit_account"/></Button>
                    </Components.ShowIf>
                  </div>
                </Col>
              </Row>
            </div>

            <div className="section-half stories">
              <Row>
                <Col md={7}>
                  <Components.PostsList terms={terms} showHeader={false} />
                </Col>

                <Col md={{ size: 4, offset: 1 }}>
                  <div>
                    <div className="section-components">
                      { user.affiliation ? 
                        <div>
                          <h5 className="title">Affiliation</h5>
                          <p>{ user.affiliation }</p>
                        </div>
                        :
                        <Components.ShowIf check={Users.options.mutations.edit.check} document={user}>
                          <div>
                            <h5 className="title">Affiliation</h5>
                            <p><Link to={Users.getEditUrl(user)}>Click here</Link> to add Affiliation.</p>
                          </div>
                        </Components.ShowIf>
                      }
                    </div>

                    <div className="section-components">
                      { user.awards ? 
                        <div>
                          <h5 className="title">Awards</h5>
                          <p>{ user.awards }</p>
                        </div>
                        :
                        <Components.ShowIf check={Users.options.mutations.edit.check} document={user}>
                          <div>
                            <h5 className="title">Awards</h5>
                            <p><Link to={Users.getEditUrl(user)}>Click here</Link> to add Awards.</p>
                          </div>
                        </Components.ShowIf>
                      }
                    </div>
                  </div>
                </Col>
              </Row>
            </div>

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
