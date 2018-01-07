/**
 * The global namespace/collection for Articles.
 * @namespace Articles
 */
Articles = new Mongo.Collection("articles");

Slingshot.fileRestrictions("grudrArticlesThumbnails", {
  allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
  maxSize: 10 * 1024 * 1024 // 10 MB (use null for unlimited)
});
