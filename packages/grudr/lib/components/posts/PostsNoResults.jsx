import { registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { FormattedMessage } from 'meteor/vulcan:i18n';

const PostsNoResults = props => 
  <div className="section">
    <h5 className="title center-align"><FormattedMessage id="posts.no_results"/></h5>
  </div>

PostsNoResults.displayName = "PostsNoResults";

registerComponent('PostsNoResults', PostsNoResults);
