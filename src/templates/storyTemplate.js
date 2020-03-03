import React, { useContext, useEffect } from 'react';
import { graphql } from 'gatsby';

import { FirebaseContext } from '../components/Firebase';
import SEO from '../components/seo';
import StoryHead from '../components/Story/storyHead';
import StoryBody from '../components/Story/storyBody';
import { StoryComments } from '../components/common';

import '../styles/global.scss';
import './templates.scss';

const StoryTemplate = props => {
  const { firebase } = useContext(FirebaseContext);
  console.log(`firebase storyTemplate:`);
  console.dir(firebase);
  console.dir(props.data);
  const {
    id,
    firstName,
    goal,
    raised,
    situation,
    status,
    familySize,
    questions,
    answers,
    imageUrl,
    localImage,
    dateHoused,
    dateFundingBegan,
  } = props.data.client;

  return (
    <section className="page-body">
      <SEO title={`${firstName}'s Story`} />
      <div className="story-template">
        <StoryHead
          firstName={firstName}
          goal={goal}
          raised={raised}
          status={status}
          familySize={familySize}
          imageUrl={localImage.childImageSharp.fixed}
          dateHoused={dateHoused}
          dateFundingBegan={dateFundingBegan}
        />
        <StoryBody
          situation={situation}
          questions={questions}
          answers={answers}
        />
        {firebase && <StoryComments firebase={firebase} storyId={id} />}
      </div>
    </section>
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
