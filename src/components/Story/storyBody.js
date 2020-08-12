import React from 'react';

import './story.scss';

// map over questions array, render situation
// and each question/answer pair
const StoryBody = ({ situation, questions, answers }) => (
  <div className="interview-container">
    <div className="interview-content">
      <h2>Situation</h2>
      <p>{situation}</p>
    </div>
    {Object.keys(questions).map(key => {
      return (
        <div className="interview-content" key={key}>
          <h4>{questions[key]}</h4>
          <p>{answers[key]}</p>
        </div>
      );
    })}
  </div>
);

export default StoryBody;
