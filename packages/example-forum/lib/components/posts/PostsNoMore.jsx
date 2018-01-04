import { registerComponent } from 'meteor/vulcan:core';
import React from "react";
import { FormattedMessage } from 'meteor/vulcan:i18n';

const PostsNoMore = props => <p className="posts-no-more"><FormattedMessage id="posts.no_more"/></p>;

PostsNoMore.displayName = "PostsNoMore";

registerComponent('PostsNoMore', PostsNoMore);