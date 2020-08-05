import React, { useContext } from 'react';

import { FirebaseContext } from '../components/Firebase';
import SEO from '../components/seo';
import Hero from '../components/Home/hero';
import Process from '../components/Home/process';
import Newsletter from '../components/Home/newsletter';
import CallToActions from '../components/Home/callToActions';
import ClientsFeatured from '../components/Home/featuredClients';
import Metrics from '../components/common/Metrics/metrics';

import '../styles/global.scss';

const IndexPage = () => {
  const { firebase = null } = useContext(FirebaseContext) || {};
  return (
    <div className="page-container">
      <SEO title="Home" />
      <div className="page-body">
        <Hero
          title="Housed or not, we are all human"
          subtitle="Are you about to experience homelessness? See our resources for help."
          label="Resources"
          destination="/resources"
          location="Home"
        />
        <Metrics />
        <div className="page-content-container">
          <div />
          <div className="content-grid-one">
            <div />
            <div className="content-container">
              <h2>Our Mission</h2>
              <p>
                To provide a fresh start to people experiencing homelessness
                while chipping away the barrier separating them from society.
              </p>
            </div>
            <div />
          </div>
          <div className="container-three">
            <h2>Featured Clients</h2>
            <ClientsFeatured firebase={firebase} />
          </div>
          <Process />
          <Newsletter />
          <div className="container-three">
            <h2>Get Involved</h2>
            <CallToActions />
          </div>
          <div />
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
