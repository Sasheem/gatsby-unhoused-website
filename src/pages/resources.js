import React from 'react';
import scrollTo from 'gatsby-plugin-smoothscroll';

import ArrowIcon from '../assets/chevron-up-solid.svg';
import SEO from '../components/seo';
import ResourceItem from '../components/Resources/resourceItem';
import ResourceSideMenu from '../components/Resources/resourceSideMenu';
import ResourceContent from '../components/Resources/resourceContent';

import '../components/common/Metrics/metrics.scss';

const Resources = () => {
  const handleScrollToTop = () => {
    scrollTo('#top-of-faq-page');
  };
  return (
    <div id="top-of-faq-page" style={{ marginTop: `6em` }}>
      <SEO title="Resources for Homeless" />
      <h1>Unhoused Humanity Resources</h1>
      <div className="faq-container">
        <div className="faq-side-menu">
          <div />
          <ResourceSideMenu />
          <div />
        </div>
        <div className="faq-content-container">
          <div />
          <ResourceContent />
          <div />
        </div>
      </div>
      <div className="faq-button" onClick={handleScrollToTop}>
        <ArrowIcon />
      </div>
    </div>
  );
};

export default Resources;
