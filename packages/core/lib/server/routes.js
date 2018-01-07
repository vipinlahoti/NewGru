var increaseArticleClicks = function(articleId, ip){

  var clickEvent = {
    name: 'click',
    properties: {
      articleId: articleId,
      ip: ip
    }
  };

  // make sure this IP hasn't previously clicked on this article
  var existingClickEvent = Events.findOne({name: 'click', 'properties.articleId': articleId, 'properties.ip': ip});

  if(!existingClickEvent){
    Events.log(clickEvent);
    Articles.update(articleId, { $inc: { clickCount: 1 }});
  }
};

// Questions per click
var increaseQuestionClicks = function(questionId, ip){

  var clickEvent = {
    name: 'click',
    properties: {
      questionId: questionId,
      ip: ip
    }
  };

  // make sure this IP hasn't previously clicked on this question
  var existingClickEvent = Events.findOne({name: 'click', 'properties.questionId': questionId, 'properties.ip': ip});

  if(!existingClickEvent){
    Events.log(clickEvent);
    Questions.update(questionId, { $inc: { clickCount: 1 }});
  }
};

Picker.route('/out', function(params, req, res, next) {
  var query = params.query;
  if(query.url){ // for some reason, query.url doesn't need to be decoded
    var article = Articles.findOne({url: query.url});
    if (article) {
      var ip = req.connection.remoteAddress;
      increaseArticleClicks(article._id, ip);
      res.writeHead(302, {'Location': query.url});
      res.end();
    } else {
      // don't redirect if we can't find a article for that link
      res.end('Invalid URL');
    }
  } else {
    res.end("Please provide a URL");
  }
});
