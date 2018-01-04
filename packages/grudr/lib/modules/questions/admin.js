/*

Admin dashboard extension

*/

import { extendFragment, addAdminColumn, addStrings } from 'meteor/vulcan:core';
import AdminUsersQuestions from '../../components/admin/AdminUsersQuestions';

extendFragment('UsersAdmin', `
  questions(limit: 5){
    ...QuestionsPage
  }
`);

addAdminColumn({
  name: 'questions',
  order: 50,
  component: AdminUsersQuestions
});


addStrings('en', {
  'admin.users.questions': 'Questions',
});
