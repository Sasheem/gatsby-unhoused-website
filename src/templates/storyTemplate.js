import React from 'react';
import Layout from '../components/Layout/layout';
import SEO from '../components/seo';

import StoryHead from '../components/Story/storyHead';
import StoryBody from '../components/Story/storyBody';

import './templates.scss';

const StoryTemplate = props => {
  console.dir(props);
  const {
    firstName,
    goal,
    raised,
    situation,
    status,
    familySize,
    questions,
    answers,
    imageUrl,
    dateHoused,
    dateFundingBegan,
  } = props.pageContext;

  return (
    <Layout>
      <SEO title={`${firstName}'s Story`} />
      <div className="story-template">
        <StoryHead
          firstName={firstName}
          goal={goal}
          raised={raised}
          status={status}
          familySize={familySize}
          imageUrl={imageUrl}
          dateHoused={dateHoused}
          dateFundingBegan={dateFundingBegan}
        />
        <StoryBody
          situation={situation}
          questions={questions}
          answers={answers}
        />
      </div>
    </Layout>
  );
};

export default StoryTemplate;
