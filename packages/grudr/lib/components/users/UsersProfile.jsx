import { Components, registerComponent, withDocument, withCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import Users from 'meteor/vulcan:users';
import { Link } from 'react-router';
import { Grid, Row, Col, Jumbotron } from 'react-bootstrap';

const UsersProfile = (props) => {
  if (props.loading) {

    return <div className="page users-profile"><Components.Loading/></div>

  } else if (!props.document) {

    // console.log(`// missing user (_id/slug: ${props.documentId || props.slug})`);
    return <div className="page users-profile"><FormattedMessage id="app.404"/></div> 
  
  } else {

    const user = props.document;
    const postTerms = {view: "userPosts", userId: user._id};
    const hospitalTerms = {view: "userHospitals", userId: user._id};

    return (
      <div>
        <Components.HeadTags url={Users.getProfileUrl(user, true)} title={Users.getDisplayName(user)} />
        
        <Jumbotron>
          <Grid>
          </Grid>
        </Jumbotron>

        <div className="main no-padding-bottom">
          <Grid>
            <div className="profile-content">
              <div className="profile-header">
                <Row>
                  <Col md={8}>
                    <div className="profile">
                      <div className="avatar avatar-large left">
                        <Components.Avatar user={user} link={false} />
                      </div>
                      <div className="profile-initials left">
                        <h4 className="title">{Users.getDisplayName(user)}</h4>
                        <Components.HospitalsList terms={hospitalTerms} showHeader={false} />
                      </div>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="follow">
                      <Components.ShowIf check={Users.options.mutations.edit.check} document={user}>
                        <Link className="btn btn-sm waves-effect waves-light pink pull-right" to={Users.getEditUrl(user)}><Components.Icon name="mode_edit" /> <FormattedMessage id="users.edit_account"/></Link>
                      </Components.ShowIf>
                    </div>
                  </Col>
                </Row>
              </div>

              <Row>
                <Col md={10}>
                  <h5 className="title">About me</h5>
                  <p></p>
                </Col>
              </Row>

              <div className="section-half stories">
                <Row>
                  <Col md={7}>
                    <div className="section-components-sm">
                      { user.postCount > 0  ?
                        <div className="media">
                          <div className="pull-left">
                            <Components.Avatar user={user} link={false} />
                          </div>
                          <div className="media-body">
                            <h4 className="media-heading">{Users.getDisplayName(user)} <small>Posted an <span className="badge">Article</span></small></h4>
                            <div className="profile-story">
                              <Components.PostsList terms={postTerms} showHeader={false} />
                            </div>
                          </div>
                        </div>
                        :
                        <h5 className="title">No articles to display</h5>
                      }
                    </div>

                  </Col>
                  
                  <Col md={4} mdOffset={1}>
                    <div className="section-components-sm">
                      <div>
                        <h5 className="title">Education</h5>
                        <p></p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              
            </div>
          </Grid>
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
