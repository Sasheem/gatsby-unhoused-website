import React from 'react';

import SEO from '../components/seo';

import '../styles/global.scss';

const SuccessDonation = () => {
  return (
    <div className="page-content-container">
      <SEO
        title="Successful donation"
        description="Thank you for supporting Unhoused Humanity! Your donation goes directly to ensuring our clients get housed as quickly as possible."
      />
      <div className="page-message">
        <h1>Unhoused Humanity thanks you!</h1>
        <p>Stripe has successfully process your donation.</p>
      </div>
    </div>
  );
};

export default SuccessDonation;
