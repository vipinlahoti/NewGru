// ------------------------------ Dynamic Icons ------------------------------ //

/**
 * Take an icon name (such as "open") and return the HTML code to display the icon
 * @param {string} iconName - the name of the icon
 * @param {string} [iconClass] - an optional class to assign to the icon
 */
Grudr.utils.getIcon = function (iconName, iconClass) {
  var icons = Grudr.utils.icons;
  var iconCode = !!icons[iconName] ? icons[iconName] : iconName;
  var iconClass = (typeof iconClass === 'string') ? ' '+iconClass : '';

  return '<i class="material-icons">' + iconCode + '</i>';

};

/**
 * A directory of icon keys and icon codes
 */
Grudr.utils.icons = {
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
  down: 'keyboard_arrow_down'
};
