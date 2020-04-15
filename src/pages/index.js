import React, { useState, useContext, useEffect } from 'react';
import { graphql } from 'gatsby';

import { FirebaseContext } from '../components/Firebase';
import SEO from '../components/seo';
import Hero from '../components/Home/hero';
import Process from '../components/Home/process';
import Newsletter from '../components/Home/newsletter';
import CallToActions from '../components/Home/callToActions';
import CardClientFeatured from '../components/Cards/cardClientFeatured';

import {
  FormSection,
  PageContent,
  ContentRow,
  ClientsFeatured,
  ClientsContent,
} from '../components/common';

const IndexPage = props => {
  const { firebase = null } = useContext(FirebaseContext) || {};
  const [clients, setClients] = useState([]);
  let isMounted = true;
  console.log('graphql query to props:');
  console.dir(props.data.allClient.edges);

  useEffect(() => {
    return () => {
      isMounted = false;
    };
  }, []);

  // fetch clients to be featured
  useEffect(() => {
    if (firebase) {
      firebase.getClients().then(snapshot => {
        if (isMounted) {
          const featuredClients = [];
          snapshot.forEach(doc => {
            if (doc.data().status === 'Unhoused') {
              featuredClients.push({
                id: doc.id,
                ...doc.data(),
              });
            }
          });
          setClients(featuredClients);
        }
      });
    }
  }, [firebase]);

  return (
    <FormSection>
      <SEO title="Home" />
      <PageContent>
        <Hero
          title="IT STARTS WITH YOU"
          subtitle="Join the fight against homelessness today"
          label="Meet client"
          destination="/story/Sheena-Salmon"
        />
        <ContentRow>
          <h2>Our Mission</h2>
          <p>
            To provide a fresh start to people experiencing homelessness while
            chipping away the barrier separating them from society.
          </p>
        </ContentRow>
        <ClientsFeatured>
          <h2>Featured Clients</h2>
          <ClientsContent>
            {!!clients &&
              clients.map(client => (
                <CardClientFeatured
                  key={client.id}
                  firstName={client.firstName}
                  lastName={client.lastName}
                  situation={`${client.situation.slice(0, 90)}...`}
                  raised={client.raised}
                  goal={client.goal}
                  imageUrl={client.imageUrl}
                />
              ))}
          </ClientsContent>
        </ClientsFeatured>
        <Process />
        <Newsletter />
        <CallToActions />
      </PageContent>
    </FormSection>
  );
};

export const query = graphql`
  {
    allClient {
      edges {
        node {
          id
          firstName
          lastName
          raised
          goal
          situation
          familySize
          status
          imageUrl
          localImage {
            childImageSharp {
              fixed(width: 331) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          dateHoused
          dateFundingBegan
          questions
          answers
        }
      }
    }
  }
`;

export default IndexPage;
