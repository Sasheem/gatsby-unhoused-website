import React from 'react';

import SEO from '../components/seo';

import '../styles/global.scss';

const NotFoundPage = () => (
  <div className="page-content-container">
    <SEO title="404: Not found" />
    <div className="page-message">
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </div>
  </div>
);

export default NotFoundPage;
