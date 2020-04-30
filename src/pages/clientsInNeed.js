import React from 'react';
import SEO from '../components/seo';

import FeaturedClients from '../components/Home/featuredClients';

import '../styles/global.scss';

const ClientsInNeed = () => {
  return (
    <div className="page-content-container">
      <SEO title="Unhoused Humanity Featured Clients" />
      <div className="container-four">
        <div className="container-head">
          <h2>Featured Clients</h2>
          <p>
            Read a story and connect with that individual. Donate to change
            their life today.
          </p>
        </div>

        <FeaturedClients />
      </div>
    </div>
  );
};

export default ClientsInNeed;
