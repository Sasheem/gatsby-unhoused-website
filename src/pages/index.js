import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/Layout/layout';
import Image from '../components/image';
import SEO from '../components/seo';
import Hero from '../components/Home/hero';

import '../styles/global.scss';

const IndexPage = () => (
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
      <div className="clients-featured-content"></div>
    </div>
  </Layout>
);

export default IndexPage;
