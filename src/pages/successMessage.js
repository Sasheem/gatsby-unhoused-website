import React from 'react';

import SEO from '../components/seo';
import CallToActions from '../components/Home/callToActions';

import '../styles/global.scss';

const SuccessDonation = () => {
  return (
    <div className="page-body">
      <SEO title="Successful message to Unhoused Humanity" />
      <div className="page-message">
        <h1>Thank you for reaching out!</h1>
        <p>
          We will get back to you shortly. Find other ways to get involved
          below.
        </p>
        <div className="success-message-content">
          <CallToActions />
        </div>
      </div>
    </div>
  );
};

export default SuccessDonation;
