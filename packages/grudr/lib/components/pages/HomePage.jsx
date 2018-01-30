import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';
import { Grid, Row, Col, Jumbotron } from 'react-bootstrap';


const HomePage = () => {
  const headerBg = {
    background: `url(//s3.amazonaws.com/creativetim_bucket/products/56/cover_nuk_regular.jpg) no-repeat 50% center / cover`
  }
  return (
    <div>
      <Jumbotron>
        <Grid>
          <Row>
            <Col md={8}>
              <h3 className="title">Your Story Starts With Us.</h3>
              <h5>Every landing page needs a small description after the big bold title, that's why we added this text here. Add here all the information that can make you or your product create the first impression.</h5>
            </Col>
          </Row>
        </Grid>
      </Jumbotron>

      <div className="main no-padding-bottom">
        <div className="section-components">
          <Grid>
            <Row>
              <Col md={8} mdOffset={2}>
                <h5 className="description center-align">Material Kit PRO is a Bootstrap UI Kit with a fresh, new design inspired by Google's Material Design. You asked for it, so we built it. It's a great pleasure to introduce to you the material concepts in an easy to use and beautiful set of components.</h5>
              </Col>
            </Row>
          </Grid>

          <div className="center-align">
            <Grid>
              <Row>
                <Col md={4}>
                  <div className="info">
                    <div className="icon icon-pink">
                      <Components.Icon name="apps" />
                    </div>
                    <h5 className="title">Huge Number of Components</h5>
                    <p>Every element that you need in a product comes built in as a component. All components fit perfectly with each other and can take variations in colour.</p>
                  </div>
                </Col>

                <Col md={4}>
                  <div className="info">
                    <div className="icon icon-info">
                      <Components.Icon name="view_day" />
                    </div>
                    <h5 className="title">Multi-Purpose Sections</h5>
                    <p>Putting together a page has never been easier than matching together sections. From team presentation to pricing options, you can easily customise and built your pages.</p>
                  </div>
                </Col>

                <Col md={4}>
                  <div className="info">
                    <div className="icon icon-success">
                      <Components.Icon name="view_carousel" />
                    </div>
                    <h5 className="title">Example Pages</h5>
                    <p>If you want to get inspiration or just show something directly to your clients, you can jump start your development with our pre-built example pages.</p>
                  </div>
                </Col>
              </Row>
            </Grid>
          </div>

        </div>

        <div className="section-components section-dark">
          <Grid>
            <Row className="middle-md">
              <Col md={5}>
                <h3 className="title">Basic Components</h3>
                <h6 className="description">The core elements of your website</h6>
                <p>We re-styled every Bootstrap element to make it resemble Material Design and also fit with each other. All the Bootstrap components that you need in a development have been re-design with the new look. Besides the numerous basic elements, we have also created additional classes. All these items will help you take your project to the next level.
                </p>
              </Col>
              <Col md={6} mdOffset={1}>
                <div className="image-container">
                  <img src="dashboard1.png" alt="" />
                </div>
              </Col>
            </Row>
          </Grid>
        </div>

        <div className="section-components">
          <Grid>
            <Row className="middle-md">
              <Col md={5}>
                <div className="image-container image-container-left">
                  <img src="dashboard1.png" alt="" />
                </div>
              </Col>
              <Col md={6} mdOffset={1}>
                <h3 className="title">Basic Components</h3>
                <h6 className="description">The core elements of your website</h6>
                <p>We re-styled every Bootstrap element to make it resemble Material Design and also fit with each other. All the Bootstrap components that you need in a development have been re-design with the new look. Besides the numerous basic elements, we have also created additional classes. All these items will help you take your project to the next level.
                </p>
              </Col>
            </Row>
          </Grid>
        </div>

        <div className="newsletter-banner-wrapper section subscribe-line subscribe-line-image" style={headerBg}>
          <Grid className="newsletter-banner banner">
            <Row>
              <Col md={6} mdOffset={3}>
                <div className="center-align">
                  <h3 className="title">Subscribe to our Newsletter</h3>
                  <p className="description">Join our newsletter and get news in your inbox every week! We hate spam too, so no worries about this.</p>
                </div>

                <div className="z-depth-2 card-form-horizontal">
                  <Grid>
                    <form>
                      <Row>
                        {/*<Components.Newsletter />*/}
                      </Row>
                    </form>
                  </Grid>
                </div>
              
              </Col>
            </Row>
          </Grid>
        </div>

      </div>
    </div>
  )
}

registerComponent('HomePage', HomePage);
