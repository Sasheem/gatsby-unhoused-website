import React, { useContext } from 'react';
import SEO from '../components/seo';

import { FirebaseContext } from '../components/Firebase';
import FeaturedClients from '../components/Home/featuredClients';

import '../styles/global.scss';

const ClientsInNeed = () => {
  const { firebase = null } = useContext(FirebaseContext) || {};
  return (
    <div className="page-content-container">
      <SEO
        title="Featured clients"
        description="These are the clients currently being funded by Unhoused Humanity. Read their story and donate to change their life today."
      />
      <div className="container-four">
        <div className="container-head">
          <h2>Featured Clients</h2>
          <p>
            Read a story and connect with that individual. Donate to change
            their life today.
          </p>
        </div>

        <FeaturedClients firebase={firebase} />
      </div>
    </div>
  );
};

export default ClientsInNeed;
