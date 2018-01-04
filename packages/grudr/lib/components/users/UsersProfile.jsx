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

    console.log(`// missing user (_id/slug: ${props.documentId || props.slug})`);
    return <div className="page users-profile"><FormattedMessage id="app.404"/></div> 
  
  } else {

    const user = props.document;
    const postTerms = {view: "userPosts", userId: user._id};
    const commentsTerms = {view: "userComments", userId: user._id};
    const avatarUrl = user.avatarUrl || Users.avatar.getUrl(user);
    const headerBg = {
      background: `url(${avatarUrl}) no-repeat 50% center / cover`
    };

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
                        <Components.UsersAvatar size="exlarge" user={user} link={false} />
                      </div>
                      <div className="profile-initials left">
                        <h4 className="title">{Users.getDisplayName(user)}</h4>
                        <p className="title profile-certificates">{ user.categories } { user.categories ? ',' : null } { user.certification }</p>
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
                  <p>{Users.getDisplayName(user)} is a { user.categories } and is licenced from { user.location }. He  and has been practicing for { user.yearOfExperience } Years. As far as education concerns, He has done { user.certification } from { user.medicalCollege }. He is affiliated with { user.affiliation } He has been awarded with { user.awards } and practicing at { user.hospitalName }</p>
                </Col>
              </Row>

              <Row>
                <Col md={8} mdOffset={2}>
                  <ul className="list-unstyled profile-stats center-align">
                    <li><b>{ user.karma ? user.karma : '0' }</b> Points</li>
                    <li><b>{ user.postCount ? user.postCount : '0' }</b> Articles</li>
                    <li><b>{ user.commentCount ? user.commentCount : '0' }</b> Comments</li>
                    <li><b>{ user.questionCount ? user.questionCount : '0' }</b> Questions</li>
                    <li><b>{ user.answerCount ? user.answerCount : '0' }</b> Answers</li>
                  </ul>
                </Col>
              </Row>

              
              <div className="section-half stories">
                <Row>
                  <Col md={7}>
                    <div className="section-components-sm">
                      { user.postCount > 0 ?
                        <div className="media">
                          <div className="pull-left">
                            <Components.UsersAvatar size="small" user={user} link={false} />
                          </div>
                          <div className="media-body">
                            <div>
                              <h4 className="media-heading">{Users.getDisplayName(user)} <small>Posted an <span className="badge">Article</span></small></h4>
                              <div className="profile-story">
                                <Components.PostsList terms={postTerms} showHeader={false} />
                              </div>
                            </div>
                          </div>
                        </div>
                        :
                        <h5>No articles to display</h5>
                      }
                    </div>

                  </Col>
                  
                  <Col md={4} mdOffset={1}>
                    {/*
                    <div className="section-components-sm">
                      { user.hospitalName ? 
                        <div>
                          <h5 className="title">Hospital name</h5>
                          <p>{ user.hospitalName }</p>
                        </div>
                        :
                        <Components.ShowIf check={Users.options.mutations.edit.check} document={user}>
                          <div>
                            <h5 className="title">Hospital name</h5>
                            <p><Link to={Users.getEditUrl(user)}>Click here</Link> to add Hospital name.</p>
                          </div>
                        </Components.ShowIf>
                      }
                    </div>

                    <div className="section-components-sm">
                      { user.hospitalAddress ? 
                        <div>
                          <h5 className="title">Hospital Address</h5>
                          <p>{ user.hospitalAddress }</p>
                        </div>
                        :
                        <Components.ShowIf check={Users.options.mutations.edit.check} document={user}>
                          <div>
                            <h5 className="title">Hospital Address</h5>
                            <p><Link to={Users.getEditUrl(user)}>Click here</Link> to add Hospital address.</p>
                          </div>
                        </Components.ShowIf>
                      }
                    </div>
                    */}
                    <div className="section-components-sm">
                      { user.college ? 
                        <div>
                          <h5 className="title">Education</h5>
                          <p>{ user.college }</p>
                        </div>
                        :
                        <Components.ShowIf check={Users.options.mutations.edit.check} document={user}>
                          <div>
                            <h5 className="title">Education</h5>
                            <p><Link to={Users.getEditUrl(user)}>Click here</Link> to add Education.</p>
                          </div>
                        </Components.ShowIf>
                      }
                    </div>

                    <div className="section-components-sm">
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

                    <div className="section-components-sm">
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
