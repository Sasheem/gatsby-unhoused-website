import React from 'react';

import SEO from '../components/seo';

import '../styles/global.scss';

const SuccessDonation = () => {
  return (
    <div className="page-content-container">
      <SEO title="Successful donation" />
      <div className="page-message">
        <h1>Unhoused Humanity thanks you!</h1>
        <p>Stripe has successfully process your donation.</p>
      </div>
    </div>
  );
};

export default SuccessDonation;
