Cloudinary = Npm.require("cloudinary").v2;

Cloudinary.config({
  cloud_name: Settings.get("cloudinaryCloudName"),
  api_key: Settings.get("cloudinaryAPIKey"),
  api_secret: Settings.get("cloudinaryAPISecret"),
  secure: true,
});

var uploadSync = Meteor.wrapAsync(Cloudinary.uploader.upload);

// send an image URL to Cloudinary and get a URL in return
var uploadImageFromURL = function (imageUrl) {
  try {
    var result = uploadSync(Grudr.utils.addHttp(imageUrl));
    var cachedUrl = result.url;
    return cachedUrl;
  } catch (error) {
    console.log("// Cloudinary upload failed for URL: "+imageUrl);
    // console.log(error.stack);
  }
}

// methods
Meteor.methods({
  testCloudinaryUpload: function (thumbnailUrl) {
    if (Users.is.admin(Meteor.user())) {
      var thumbnailUrl = typeof thumbnailUrl === "undefined" ? "http://www.grudrapp.org/images/logo.png" : thumbnailUrl;
      var cachedUrl = uploadImageFromURL(thumbnailUrl);
      // console.log(cachedUrl);
    }
  },
  cacheArticleThumbnails: function (limit) {

    // default to caching articles 20 at a time if no limit is passed
    var limit = typeof limit === "undefined" ? 20 : limit;
    
    if (Users.is.admin(Meteor.user())) {

      var articlesWithUncachedThumbnails = Articles.find({
        thumbnailUrl: { $exists: true },
        originalThumbnailUrl: { $exists: false }
      }, {sort: {createdAt: -1}, limit: limit});

      articlesWithUncachedThumbnails.forEach(Meteor.bindEnvironment(function (article) {

        console.log("// Caching thumbnail for article: "+article.title);

        var originalUrl = article.thumbnailUrl;
        var cachedUrl = uploadImageFromURL(originalUrl);

        Articles.update(article._id, {$set:{
          thumbnailUrl: cachedUrl,
          originalThumbnailUrl: originalUrl
        }});

      }));
    }
  }
});

// article submit callback
function cacheArticleThumbnailOnSubmit (article) {
  if (Settings.get("cloudinaryAPIKey")) {
    if (article.thumbnailUrl) {
      var newThumbnailUrl = uploadImageFromURL(article.thumbnailUrl);
    }
    Articles.update(article._id, {$set: {
      thumbnailUrl: newThumbnailUrl,
      originalThumbnailUrl: article.thumbnailUrl
    }});
  }
}
Grudr.callbacks.add("articleSubmitAsync", cacheArticleThumbnailOnSubmit);

// article edit callback
function cacheArticleThumbnailOnEdit (newArticle, oldArticle) {
  if (Settings.get("cloudinaryAPIKey")) {
    if (newArticle.thumbnailUrl && newArticle.thumbnailUrl !== oldArticle.thumbnailUrl) {
      var newThumbnailUrl = uploadImageFromURL(newArticle.thumbnailUrl);
    }
    Articles.update(newArticle._id, {$set: {
      thumbnailUrl: newThumbnailUrl,
      originalThumbnailUrl: newArticle.thumbnailUrl
    }});
  }
}
Grudr.callbacks.add("articleEditAsync", cacheArticleThumbnailOnEdit);
