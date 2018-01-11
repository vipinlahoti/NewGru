import React from 'react';
import { Components, withCurrentUser, AdminColumns } from 'meteor/vulcan:core';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import Users from 'meteor/vulcan:users';
import { Grid, Row, Col, Jumbotron } from 'react-bootstrap';

import '../modules/columns.js';

const AdminHome = ({ currentUser }) => {

  return (
    <div>
      <Jumbotron>
        <Grid>
          <Row>
            <Col md={8}>
              <h3 className="title">Admin</h3>
            </Col>
          </Row>
        </Grid>
      </Jumbotron>
      <div className="main">
        <Grid>
          <div className="admin-home page">
            <Components.ShowIf check={Users.isAdmin} document={currentUser} failureComponent={<p className="admin-home-message"><FormattedMessage id="app.noPermission" /></p>}>
              <Components.Datatable 
                collection={Users} 
                columns={AdminColumns} 
                options={{
                  fragmentName: 'UsersAdmin',
                  terms: {view: 'usersAdmin'},
                  limit: 20
                }}
                showEdit={true}
              />
            </Components.ShowIf>
          </div>
        </Grid>
      </div>
    </div>
  )
}

export default withCurrentUser(AdminHome);
