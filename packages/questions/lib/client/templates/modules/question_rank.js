Template.question_rank.helpers({
  oneBasedRank: function(){
    if (typeof this.rank !== 'undefined') {
      return this.rank + 1;
    }
  }
});
