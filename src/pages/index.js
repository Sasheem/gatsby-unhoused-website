import React from 'react';

import SEO from '../components/seo';
import Hero from '../components/Home/hero';
import Process from '../components/Home/process';
import Newsletter from '../components/Home/newsletter';
import CallToActions from '../components/Home/callToActions';
import ClientsFeatured from '../components/Home/featuredClients';

import '../styles/global.scss';

const IndexPage = props => {
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
        <div className="content-grid-one">
          <div />
          <div className="content-container">
            <h2>Our Mission</h2>
            <p>
              To provide a fresh start to people experiencing homelessness while
              chipping away the barrier separating them from society.
            </p>
          </div>
          <div />
        </div>
        <div className="container-three">
          <h2>Featured Clients</h2>
          <ClientsFeatured />
        </div>
        <Process />
        <Newsletter />
        <div className="container-three">
          <h2>Get Involved</h2>
          <CallToActions />
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
