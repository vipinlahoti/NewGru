// important: the helper must be defined on the *old* "article_title" template

Template.article_title.helpers({
  randomEmoji: function () {
    return _.sample(["😀", "😰", "👮", " 🌸", "🐮", "⛅️", "🍟", "🍌", "🎃", "⚽️", "🎵"]);
  }
});
