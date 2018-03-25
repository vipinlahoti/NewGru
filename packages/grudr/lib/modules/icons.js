import { replaceComponent, Utils } from 'meteor/vulcan:core';
import React from 'react';

const Icon = ({ name, iconClass, onClick }) => {
  const icons = Utils.icons;
  const iconCode = !!icons[name] ? icons[name] : name;
  const c = 'material-icons';
  return <i onClick={onClick} className={c}>{iconCode}</i>;
}

replaceComponent('Icon', Icon);

/**
 * @summary A directory of icon keys and icon codes
 */
Utils.icons = {
  calendar: 'today',
  stars: 'stars',
  help_outline: 'help_outline',
  apps: 'apps',
  view_day: 'view_day',
  view_carousel: 'view_carousel',
  back: 'arrow_back',
  person_add: 'person_add',
  add: 'add',
  delete: 'delete',
  lock: 'lock_outline',
  favorite: 'favorite',
  palette: 'palette',
  people: 'people',
  camera: 'camera',
  books: 'library_books',
  forum: 'forum',
  assignment: 'assignment',
  reply: 'reply',
  expand: "angle-right",
  collapse: "angle-down",
  next: "angle-right",
  close: "times",
  upvote: "thumb_up",
  voted: "check",
  downvote: "thumb_down",
  facebook: "facebook-square",
  twitter: "twitter",
  googleplus: "google-plus",
  linkedin: "linkedin-square",
  comment: "comment",
  share: "share-square-o",
  more: "ellipsis-h",
  menu: "subject",
  subscribe: "envelope-o",
  delete: "delete",
  popularity: "fire",
  time: "access_time",
  best: "star",
  search: "search",
  edit: "mode_edit",
  approve: "check-circle-o",
  reject: "times-circle-o",
  views: "visibility",
  clicks: "mouse", 
  score: "trending_up",
  down: 'keyboard_arrow_down',
  up: 'keyboard_arrow_up',
  spinner: "spinner",
  check_circle: 'check_circle',
  notifications_none: 'notifications_none',
  add_circle_outline: 'add_circle_outline',
  menu: 'menu'
};
