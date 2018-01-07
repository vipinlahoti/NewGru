Template.question_admin.helpers({
  showApprove: function () {
    return !!Settings.get('requireQuestionsApproval') && (this.status === Questions.config.STATUS_PENDING || this.status === Questions.config.STATUS_REJECTED);
  },
  showReject: function(){
    return !!Settings.get('requireQuestionsApproval') && (this.status === Questions.config.STATUS_PENDING || this.status === Questions.config.STATUS_APPROVED);
  },
  shortScore: function(){
    return Math.floor(this.score*100)/100;
  }
});

Template.question_admin.events({
  'click .approve-link': function(e){
    Meteor.call('approveQuestion', this._id);
    e.preventDefault();
  },
  'click .reject-link': function(e){
    Meteor.call('rejectQuestion', this._id);
    e.preventDefault();
  },
  'click .delete-link': function(e){
    var question = this;

    e.preventDefault();

    if(confirm("Delete “"+question.body+"”?")){
      FlowRouter.go('questionsDefault');
      Meteor.call("deleteQuestionById", question._id, function(error) {
        if (error) {
          Bert.alert( error.reason, 'danger', 'growl-top-right' );
        } else {
          Bert.alert( 'Question has been deleted.', 'success', 'growl-top-right' );
        }
      });
    }
  }
});
