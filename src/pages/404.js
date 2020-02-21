import React from 'react';

import Layout from '../components/Layout/layout';
import SEO from '../components/seo';

const NotFoundPage = () => (
  <section>
    <SEO title="404: Not found" />
    <div>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </div>
  </section>
);

export default NotFoundPage;
