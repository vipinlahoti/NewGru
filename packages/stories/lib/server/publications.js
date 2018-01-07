Stories._ensureIndex({userId: 1});
Stories._ensureIndex({parentStoryId: 1});

// Publish a list of stories

Meteor.publish('storiesList', function(terms) {
  
  this.unblock();

  if (this.userId) { // add currentUserId to terms if a user is logged in
    terms.currentUserId = this.userId; 
  }
  
  if(Users.can.viewById(this.userId)){
    var parameters = Stories.parameters.get(terms);
    var stories = Stories.find(parameters.find, parameters.options);
  
    // if there are stories, find out which users were storyed on
    var storyedUserIds = stories.count() ? _.pluck(stories.fetch(), 'userId') : [];
    return [
      stories,
      Users.find({_id: {$in: storyedUserIds}})
    ];
  }
});

// Publish a single story

Meteor.publish('singleStoryAndChildren', function(storyId) {

  check(storyId, String);

  this.unblock();
  
  if(Users.can.viewById(this.userId)){
    // publish both current story and child stories
    var storyIds = [storyId];
    var childStoryIds = _.pluck(Stories.find({parentStoryId: storyId}, {fields: {_id: 1}}).fetch(), '_id');
    storyIds = storyIds.concat(childStoryIds);
    return Stories.find({_id: {$in: storyIds}}, {sort: {score: -1, postedAt: -1}});
  }
  return [];
});

// Publish the user related to the current story

Meteor.publish('storyUser', function(storyId) {

  check(storyId, String);

  this.unblock();

  if(Users.can.viewById(this.userId)){
    var story = Stories.findOne(storyId);
    return Users.find({_id: story && story.userId});
  }
  return [];
});

// Publish author of the current story, and author of the user related to the current story

Meteor.publish('storyUsers', function(storyId) {

  check(storyId, String);

  this.unblock();
    
  var userIds = [];

  if(Users.can.viewById(this.userId)){

    var story = Stories.findOne(storyId);

    if (!!story) {
      userIds.push(story.userId);

      var user = Users.findOne(story.userId);
      if (!!user) {
        userIds.push(user.userId);
      }

      return Meteor.users.find({_id: {$in: userIds}}, {fields: Users.pubsub.publicProperties});
    
    }

  }

  return [];

});
