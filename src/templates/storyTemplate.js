import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/layout';
import SEO from '../components/seo';

import StoryHead from '../components/Story/storyHead';
import StoryBody from '../components/Story/storyBody';

import './templates.scss';

const StoryTemplate = props => {
  console.dir(props.data);
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
    localImage,
    dateHoused,
    dateFundingBegan,
  } = props.data.client;

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
          imageUrl={localImage.childImageSharp.fixed}
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
