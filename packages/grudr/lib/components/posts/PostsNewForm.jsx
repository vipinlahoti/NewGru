import { Components, registerComponent, getRawComponent, getFragment, withMessages, withList } from 'meteor/vulcan:core';
import { intlShape, FormattedMessage } from 'meteor/vulcan:i18n';
import { Posts } from '../../modules/posts/index.js';
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router'
import { Jumbotron, Container, Row, Col } from 'reactstrap';

const PostsNewForm = (props, context) => {
  if (props.loading) {
    return <div><Components.Loading/></div>;
  }
  return (
    <div>
      <Jumbotron>
        <h3 className="title">Write an Article</h3>
      </Jumbotron>
      <div className="main">
        <Container>
          <Row>
            <Col md={{ size: 8, offset: 2 }}>
              <Components.ShowIf
                check={Posts.options.mutations.new.check}
                failureComponent={
                  <div>
                    <p className="posts-new-form-message">
                      <FormattedMessage id="posts.sign_up_or_log_in_first" />
                    </p>
                    <Components.AccountsLoginForm />
                  </div>
                }
              >
                <div>
                  <Components.SmartForm
                    layout="vertical"
                    collection={Posts}
                    mutationFragment={getFragment('PostsPage')}
                    successCallback={post => {
                      props.router.push({pathname: props.redirect || Posts.getPageUrl(post)});
                      props.flash(context.intl.formatMessage({id: "posts.created_message"}), "success");
                    }}
                  />
                </div>
              </Components.ShowIf>
            </Col>
          </Row>
        </Container>
      </div>
    </div>

  );
};

PostsNewForm.propTypes = {
  router: PropTypes.object,
  flash: PropTypes.func,
  redirect: PropTypes.string,
}

PostsNewForm.contextTypes = {
  intl: intlShape
};

PostsNewForm.displayName = "PostsNewForm";

const options = {
  collectionName: 'Categories',
  queryName: 'categoriesListQuery',
  fragmentName: 'CategoriesList',
  limit: 0,
  pollInterval: 0,
};

registerComponent('PostsNewForm', PostsNewForm, withRouter, withMessages, [withList, options]);
