Grudr.modules.add("primaryNav", [
  {
    template: 'questions_menu',
    order: 10
  }
]);

Grudr.modules.add("questionsListTop", {
  template: "views_menu",
  order: 1
});

Grudr.modules.add("questionComponents", [
  {
    template: 'question_content',
    order: 20
  }
]);

Grudr.modules.add("questionRanks", [
  {
    template: 'question_rank',
    order: 10
  }
]);

Grudr.modules.add("questionHeading", [
  {
    template: 'question_title',
    order: 10
  }
]);

Grudr.modules.add("questionSingleHeading", [
  {
    template: 'question_single_title',
    order: 10
  }
]);

Grudr.modules.add("questionMeta", [
  {
    template: 'question_author',
    order: 10
  },
  {
    template: 'question_info',
    order: 20
  },
  // {
  //   template: 'question_answers_link',
  //   order: 30
  // },
  {
    template: 'question_discuss',
    order: 30
  },
  // {
  //   template: 'question_avatars',
  //   order: 50
  // },
  {
    template: 'question_admin',
    order: 50
  },
  // {
  //   template: 'question_actions',
  //   order: 60
  // }
]);
