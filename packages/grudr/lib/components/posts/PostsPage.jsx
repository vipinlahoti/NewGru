import { Components, registerComponent, withDocument, withCurrentUser, getActions, withMutation } from 'meteor/vulcan:core';
import { Posts } from '../../modules/posts/index.js';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Jumbotron, Button, Container, Row, Col, CardHeader, CardBody, CardFooter } from 'reactstrap';
import moment from 'moment';

class PostsPage extends Component {

  renderActions() {
    const post = this.props.document;

    return (
      <span className="stats">
        <Components.ModalTrigger title="Edit an Article" component={ <Button color="secondary" size="sm"><Components.Icon name="mode_edit" /> <FormattedMessage id="posts.edit"/></Button> }>
          <Components.PostsEditForm post={post} />
        </Components.ModalTrigger>
      </span>
    )
  }
  
  render() {
    if (this.props.loading) {
      
      return <div className="posts-page"><Components.Loading/></div>
      
    } else if (!this.props.document) {
      
      // console.log(`// missing post (_id: ${this.props.documentId})`);
      return <div className="posts-page"><FormattedMessage id="app.404"/></div> 

    } else {
      const post = this.props.document;
      const htmlBody = {__html: post.htmlBody};

      return (
        <div>

          <Components.HeadTags url={Posts.getPageUrl(post, true)} title={post.title} image={post.thumbnailUrl} description={post.excerpt} />
          
          <div className="main">
            <Container>
              <Row>
                <Col md={{ size: 8, offset: 2 }}>
                  <CardHeader>
                    <h3 className="title">{ post.title }</h3>
                    <CardFooter>
                      { post.user ? <div className="author"><Components.Avatar user={post.user} /><Components.UsersName user={ post.user }/>, &nbsp;</div> : null }
                      <span className="article-time">{ post.postedAt ? moment(new Date(post.postedAt)).fromNow() : <FormattedMessage id="posts.dateNotDefined"/> }</span>

                      {Posts.options.mutations.edit.check(this.props.currentUser, post) ? this.renderActions() : null}
                    </CardFooter>
                  </CardHeader>

                  {post.thumbnailUrl ?
                  <div className="card-img">
                    <Components.PostsThumbnail post={post}/>
                  </div>
                  : null}

                  {post.htmlBody ? <CardBody dangerouslySetInnerHTML={htmlBody}></CardBody> : null}

                </Col>
              </Row>
            </Container>
          </div>

        </div> 
      );
      
    }
  }
  
  // triggered after the component did mount on the client
  async componentDidMount() {
    try {
      
      // destructure the relevant props
      const { 
        // from the parent component, used in withDocument, GraphQL HOC
        documentId,
        // from connect, Redux HOC 
        setViewed, 
        postsViewed, 
        // from withMutation, GraphQL HOC
        increasePostViewCount,
      } = this.props;
      
      // a post id has been found & it's has not been seen yet on this client session
      if (documentId && !postsViewed.includes(documentId)) {
        
        // trigger the asynchronous mutation with postId as an argument
        await increasePostViewCount({postId: documentId});
        
        // once the mutation is done, update the redux store
        setViewed(documentId);
      }
      
    } catch(error) {
      console.log(error); // eslint-disable-line
    }
  }
}

PostsPage.displayName = "PostsPage";

PostsPage.propTypes = {
  documentId: PropTypes.string,
  document: PropTypes.object,
  postsViewed: PropTypes.array,
  setViewed: PropTypes.func,
  increasePostViewCount: PropTypes.func,
}

const queryOptions = {
  collection: Posts,
  queryName: 'postsSingleQuery',
  fragmentName: 'PostsPage',
};

const mutationOptions = {
  name: 'increasePostViewCount',
  args: {postId: 'String'},
};

const mapStateToProps = state => ({ postsViewed: state.postsViewed });
const mapDispatchToProps = dispatch => bindActionCreators(getActions().postsViewed, dispatch);

registerComponent(
  // component name used by Vulcan
  'PostsPage', 
  // React component 
  PostsPage,
  // HOC to give access to the current user
  withCurrentUser, 
  // HOC to load the data of the document, based on queryOptions & a documentId props
  [withDocument, queryOptions], 
  // HOC to provide a single mutation, based on mutationOptions
  withMutation(mutationOptions), 
  // HOC to give access to the redux store & related actions
  connect(mapStateToProps, mapDispatchToProps)
);
