// Articles.addStateTransition("status", [
//   {
//     name: "approve",
//     from: "*",
//     to: Articles.config.STATUS_APPROVED,
//     callback: function (oldArticle, newArticle) {
//       Grudr.callbacks.runAsync("articleApproveAsync", newArticle, oldArticle);
//     }
//   },
//   {
//     name: "unapprove",
//     from: Articles.config.STATUS_APPROVED,
//     to: "*",
//     callback: function (oldArticle, newArticle) {
//       Grudr.callbacks.runAsync("articleUnapproveAsync", newArticle, oldArticle);
//     }
//   },
//   {
//     name: "makePending",
//     from: "*",
//     to: Articles.config.STATUS_PENDING,
//     callback: function (oldArticle, newArticle) {
//       Grudr.callbacks.runAsync("articleMakePendingAsync", newArticle, oldArticle);
//     }
//   },
//   {
//     name: "reject",
//     from: "*",
//     to: Articles.config.STATUS_REJECTED,
//     callback: function (oldArticle, newArticle) {
//       Grudr.callbacks.runAsync("articleRejectAsync", newArticle, oldArticle);
//     }
//   }
// ]);
