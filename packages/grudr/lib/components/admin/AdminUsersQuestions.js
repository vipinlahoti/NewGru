import React from 'react';
import { Questions } from '../../modules/questions/index.js';
import { Link } from 'react-router';

const AdminUsersQuestions = ({ document: user }) => 
  <ul>
    {user.questions && user.questions.map(question => 
      <li key={question._id}><Link to={Questions.getPageUrl(question)}>{question.title}</Link></li>
    )}
  </ul>

export default AdminUsersQuestions;
