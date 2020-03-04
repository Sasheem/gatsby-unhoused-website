import React, { useState, useContext, useEffect } from 'react';
import { graphql } from 'gatsby';

import { FirebaseContext } from '../components/Firebase';
import SEO from '../components/seo';
import Hero from '../components/Home/hero';
import Process from '../components/Home/process';
import CardClientFeatured from '../components/Cards/cardClientFeatured';

import '../styles/global.scss';

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
      firebase.getFeaturedClients().then(snapshot => {
        if (isMounted) {
          const featuredClients = [];
          snapshot.forEach(doc => {
            featuredClients.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setClients(featuredClients);
        }
      });
    }
  }, [firebase]);

  console.log('clients from FirebaseContext now set to state using hooks');
  console.dir(clients);

  return (
    <div className="page-body">
      <SEO title="Home" />
      <Hero
        title="IT STARTS WITH YOU"
        subtitle="Join the fight against homelessness today"
        label="Meet client"
      />
      <div className="mission-container">
        <h2>Our Mission</h2>
        <p>
          To provide a fresh start to people experiencing homelessness while
          chipping away the barrier separating them from society.
        </p>
      </div>
      <div className="clients-featured-container">
        <h2>Featured Clients</h2>
        <div className="clients-featured-content">
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
          {/* {props.data.allClient.edges.map(client => (
            <CardClientFeatured
              key={client.node.id}
              firstName={client.node.firstName}
              lastName={client.node.lastName}
              situation={`${client.node.situation.slice(0, 90)}...`}
              raised={client.node.raised}
              goal={client.node.goal}
              imageUrl={client.node.localImage.childImageSharp.fixed}
            />
            client.node.status === 'Unhoused' ? (
              <CardClientFeatured
                key={client.node.id}
                name={client.node.firstName}
                situation={`${client.node.situation.slice(0, 90)}...`}
                raised={client.node.raised}
                goal={client.node.goal}
                imageUrl={client.node.localImage.publicURL}
              />
            ) : null
          ))} */}
        </div>
      </div>
      <Process />
    </div>
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
