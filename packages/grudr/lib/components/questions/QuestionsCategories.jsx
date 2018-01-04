import { registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { Link } from 'react-router';

const QuestionsCategories = ({question}) => {
  return (
    <div className="questions-categories">
      {question.categories.map(category => 
        <Link className="questions-category" key={category._id} to={{pathname: "/", query: {cat: category.slug}}}>{category.name}</Link>
      )}
    </div>
  )
};

QuestionsCategories.displayName = "QuestionsCategories";

registerComponent('QuestionsCategories', QuestionsCategories);
