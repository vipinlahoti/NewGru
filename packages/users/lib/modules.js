
Grudr.modules.add("profileDisplay", [
  {
    template: 'user_info',
    order: 1
  },
]);


Grudr.modules.add("profileDetails", [
  
  {
    template: 'user_articles',
    order: 1
  },
  // {
  //   template: 'user_upvoted_articles',
  //   order: 2
  // },
  // {
  //   template: 'user_downvoted_articles',
  //   order: 3
  // },
  {
    template: 'user_comments',
    order: 4
  }
]);

Grudr.modules.add("profileQuestions", [
  {
    template: 'user_questions',
    order: 1
  },
  {
    template: 'user_answers',
    order: 2
  }
]);

Grudr.modules.add("profileEdit", [
  {
    template: 'user_account',
    order: 1
  }
]);
