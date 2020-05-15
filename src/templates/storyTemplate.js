import React, { useContext } from 'react';
import moment from 'moment';

import { FirebaseContext } from '../components/Firebase';
import SEO from '../components/seo';
import StoryHead from '../components/Story/storyHead';
import StoryBody from '../components/Story/storyBody';
import { StoryComments } from '../components/common';
import Comments from '../components/common/Comments/comments';

import '../styles/global.scss';
import './templates.scss';

/**
 * todo determine if you need firebase here
 * * could just set it up within StoryComments
 */

const StoryTemplate = ({ pageContext, location }) => {
  const { firebase = null, user } = useContext(FirebaseContext) || {};
  const {
    id,
    firstName,
    lastName,
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
  const date = status === 'Housed' ? dateHoused : dateFundingBegan;

  return (
    <div className="page-content-container">
      <SEO title={`${firstName}'s Story`} />
      <div className="story-template">
        {location &&
        location.state &&
        location.state.raised &&
        location.state.status &&
        location.state.date ? (
          <StoryHead
            clientId={id}
            firstName={firstName}
            lastName={lastName}
            goal={goal}
            raised={location.state.raised}
            status={location.state.status}
            familySize={familySize}
            imageUrl={imageUrl}
            date={location.state.date}
          />
        ) : (
          <StoryHead
            clientId={id}
            firstName={firstName}
            lastName={lastName}
            goal={goal}
            raised={raised}
            status={status}
            familySize={familySize}
            imageUrl={imageUrl}
            date={date}
          />
        )}

        <StoryBody
          situation={situation}
          questions={questions}
          answers={answers}
        />
        {firebase && (
          <Comments
            firebase={firebase}
            storyId={`${firstName}-${lastName}`}
            user={user}
          />
        )}
      </div>
    </div>
  );
};

export default StoryTemplate;
