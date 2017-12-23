Template.post_item.helpers({
  postClass: function () {
    var post = this;
    var postClass = 'post ';
    
    postClass += 'author-' + Telescope.utils.slugify(this.author) + ' ';

    if (this.sticky) {
      postClass += 'sticky ';
    }
    postClass = Telescope.callbacks.run('postClass', postClass, post);
    return postClass;
  }
});
