import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/seo';
import Hero from '../components/Home/hero';
import Process from '../components/Home/process';
import Newsletter from '../components/Home/newsletter';
import CallToActions from '../components/Home/callToActions';
import ClientsFeatured from '../components/Home/featuredClients';

import '../styles/global.scss';

const IndexPage = props => {
  console.log('graphql query to props:');
  console.dir(props.data.allClient.edges);

  return (
    <div className="page-container">
      <SEO title="Home" />
      <div className="page-body">
        <Hero
          title="IT STARTS WITH YOU"
          subtitle="Join the fight against homelessness today"
          label="Meet client"
          destination="/story/Sheena-Salmon"
        />
        <div className="content-container">
          <h2>Our Mission</h2>
          <p>
            To provide a fresh start to people experiencing homelessness while
            chipping away the barrier separating them from society.
          </p>
        </div>
        <div className="container-three">
          <h2>Featured Clients</h2>
          <ClientsFeatured />
        </div>
        <Process />
        <Newsletter />
        <CallToActions />
      </div>
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
