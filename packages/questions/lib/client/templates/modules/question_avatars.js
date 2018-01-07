Template.question_avatars.helpers({
  answerers: function () {
    // remove question author ID from answerers to avoid showing author's avatar again
    // limit to 4 answerers in case there's more
    // TODO: show a "..." sign or something
    return _.first(_.without(this.answerers, this.userId), 4);
  }
});
