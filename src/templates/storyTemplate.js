import React, { useContext } from 'react';

import { FirebaseContext } from '../components/Firebase';
import SEO from '../components/seo';
import StoryHead from '../components/Story/storyHead';
import StoryBody from '../components/Story/storyBody';
import { StoryComments } from '../components/common';

import '../styles/global.scss';
import './templates.scss';

/**
 * todo determine if you need firebase here
 * * could just set it up within StoryComments
 */

const StoryTemplate = ({ location, pageContext }) => {
  const { firebase = null } = useContext(FirebaseContext) || {};
  const {
    id,
    firstName,
    situation,
    goal,
    raised,
    status,
    familySize,
    imageUrl,
    dateHoused,
    dateFundingBegan,
    questions,
    answers,
  } = pageContext;

  console.log(`storyTemplate page context`);
  console.dir(pageContext);
  return (
    <div className="page-body">
      <SEO title={`${firstName}'s Story`} />
      <div className="story-template">
        <StoryHead
          clientId={id}
          firstName={firstName}
          goal={goal}
          raised={location.state.raised ? location.state.raised : raised}
          status={location.state.status ? location.state.status : status}
          familySize={familySize}
          imageUrl={imageUrl}
          dateHoused={
            location.state.dateHoused ? location.state.dateHoused : dateHoused
          }
          dateFundingBegan={dateFundingBegan}
        />
        <StoryBody
          situation={situation}
          questions={questions}
          answers={answers}
        />
        {firebase && <StoryComments firebase={firebase} storyId={id} />}
      </div>
    </div>
  );
};

export default StoryTemplate;
