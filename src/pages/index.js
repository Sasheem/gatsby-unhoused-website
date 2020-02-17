import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/Layout/layout';
import Image from '../components/image';
import SEO from '../components/seo';
import Hero from '../components/Home/hero';
import CardClientFeatured from '../components/Cards/cardClientFeatured';

import '../styles/global.scss';

const IndexPage = props => {
  console.dir(props.data.allPost);
  return (
    <Layout>
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
          {props.data.allPost.edges.map(client =>
            client.node.status === 'Unhoused' ? (
              <CardClientFeatured
                key={client.node.id}
                name={client.node.firstName}
                situation={`${client.node.situation.slice(0, 90)}...`}
                raised={client.node.raised}
                goal={client.node.goal}
                imageUrl={client.node.imageUrl}
              />
            ) : null
          )}
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  {
    allPost {
      edges {
        node {
          firstName
          raised
          goal
          situation
          status
          slug
          imageUrl
          dateHoused
        }
      }
    }
  }
`;

export default IndexPage;
