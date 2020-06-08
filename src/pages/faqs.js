import React from 'react';
import scrollTo from 'gatsby-plugin-smoothscroll';

import ArrowIcon from '../assets/chevron-up-solid.svg';
import SEO from '../components/seo';
import FAQSideMenu from '../components/FAQs/faqSideMenu';
import FAQContent from '../components/FAQs/faqContent';

const FAQs = () => {
  const handleScrollToTop = () => {
    scrollTo('#top-of-faq-page');
  };
  return (
    <div id="top-of-faq-page" style={{ marginTop: `6em` }}>
      <SEO title="Frequently Asked Questions" />
      <h1>Breaking Down Homelessness</h1>
      <div className="faq-container">
        <div id="faq-side-bar" className="faq-side-menu">
          <div />
          <FAQSideMenu />
          <div />
        </div>
        <div id="faq-content" className="faq-content-container">
          <div />
          <FAQContent />
          <div />
        </div>
      </div>
      <div className="faq-button" onClick={handleScrollToTop}>
        <ArrowIcon />
      </div>
    </div>
  );
};

export default FAQs;
