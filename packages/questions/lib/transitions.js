// Questions.addStateTransition("status", [
//   {
//     name: "approve",
//     from: "*",
//     to: Questions.config.STATUS_APPROVED,
//     callback: function (oldQuestion, newQuestion) {
//       Grudr.callbacks.runAsync("questionApproveAsync", newQuestion, oldQuestion);
//     }
//   },
//   {
//     name: "unapprove",
//     from: Questions.config.STATUS_APPROVED,
//     to: "*",
//     callback: function (oldQuestion, newQuestion) {
//       Grudr.callbacks.runAsync("questionUnapproveAsync", newQuestion, oldQuestion);
//     }
//   },
//   {
//     name: "makePending",
//     from: "*",
//     to: Questions.config.STATUS_PENDING,
//     callback: function (oldQuestion, newQuestion) {
//       Grudr.callbacks.runAsync("questionMakePendingAsync", newQuestion, oldQuestion);
//     }
//   },
//   {
//     name: "reject",
//     from: "*",
//     to: Questions.config.STATUS_REJECTED,
//     callback: function (oldQuestion, newQuestion) {
//       Grudr.callbacks.runAsync("questionRejectAsync", newQuestion, oldQuestion);
//     }
//   }
// ]);
