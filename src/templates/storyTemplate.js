import React, { useContext, useEffect, useState } from 'react';
import { graphql } from 'gatsby';

import { FirebaseContext } from '../components/Firebase';
import SEO from '../components/seo';
import StoryHead from '../components/Story/storyHead';
import StoryBody from '../components/Story/storyBody';
import { StoryComments } from '../components/common';

import '../styles/global.scss';
import './templates.scss';

/**
 * todo figure out this page reload issue
 * * why is data from graphql old data and not new data?
 */

const StoryTemplate = props => {
  const { firebase = null } = useContext(FirebaseContext) || {};
  const [client, setClient] = useState({});
  const [isMounted, setIsMounted] = useState(true);

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

  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    if (firebase) {
      firebase.getClient({ clientId: id }).then(snapshot => {
        console.log(`client from firebase`);
        if (isMounted) {
          console.dir(snapshot.data());
          setClient(snapshot.data());
        }
      });
    }
  }, []);

  return (
    <div className="page-body">
      <SEO title={`${client.firstName}'s Story`} />
      <div className="story-template">
        <StoryHead
          firstName={client.firstName}
          goal={client.goal}
          raised={client.raised}
          status={client.status}
          familySize={client.familySize}
          imageUrl={localImage.childImageSharp.fixed}
          dateHoused={client.dateHoused}
          dateFundingBegan={client.dateFundingBegan}
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
