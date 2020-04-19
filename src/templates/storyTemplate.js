import React, { useContext, useState } from 'react';
import { graphql } from 'gatsby';

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

const StoryTemplate = ({ data, location }) => {
  const { firebase = null } = useContext(FirebaseContext) || {};
  const {
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
  } = location.state.client;

  return (
    <div className="page-body">
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
        {firebase && (
          <StoryComments
            firebase={firebase}
            storyId={`${firstName}-${lastName}`}
          />
        )}
      </div>
    </div>
  );
};

// graphql has access to pageContext set up in gatsby-node.js
// remember this query will inject data into props under 'data'
export const query = graphql`
  query ClientQuery($clientId: String!) {
    client(id: { eq: $clientId }) {
      firstName
      lastName
      raised
      goal
      status
      familySize
      dateFundingBegan
      dateHoused
      situation
      questions
      answers
      imageUrl
      localImage {
        childImageSharp {
          fixed(width: 331) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }
`;

export default StoryTemplate;
