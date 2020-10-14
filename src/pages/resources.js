import React from 'react';
import scrollTo from 'gatsby-plugin-smoothscroll';

import ArrowIcon from '../assets/chevron-up-solid.svg';
import SEO from '../components/seo';
import ResourceSideMenu from '../components/Resources/resourceSideMenu';
import ResourceContent from '../components/Resources/resourceContent';

import '../components/Resources/resources.scss';

import '../components/common/Metrics/metrics.scss';

const Resources = () => {
  const handleScrollToTop = () => {
    scrollTo('#top-of-faq-page');
  };
  return (
    <div id="top-of-faq-page" style={{ marginTop: `10em` }}>
      <SEO
        title="Resources for Homeless"
        description="Our resources for those about to be or experiencing homelessness include Emergency Services, Housing Services, Veterans Services, Food and Clothing, Drop-In Centers, Job Training and Placement, Legal Services, Financial Services, Mental Health and Medical Services, Family Services, Social Security Cards and Disability Benefits, Transportation and Identification, and Substance Abuse Services."
      />
      <div className="faq-header">
        <div className="faq-header-info">
          <h1>
            <a href="http://bigbendcoc.org/" target="_blank">
              Big Bend Continuum of Care
            </a>
          </h1>
        </div>
        <div className="faq-header-spacing" />
        <div className="faq-header-details">
          <p>
            For 24‐Hour Counseling, Suicide Prevention, Community Information,
            and Referrals, contact 2‐1‐1 Big Bend Helpline Dial “211,”{' '}
            <a href="tel:850-617-6333" className="resource-detail">
              850‐617‐NEED (6333)
            </a>
            , or{' '}
            <a href="tel:850-921-4020" className="resource-detail">
              850‐921‐4020
            </a>{' '}
            TTY
          </p>
          <p>
            If you are in an emotional crisis, you can also <br />
            call{' '}
            <a href="tel:1-800-273-8255" className="resource-detail">
              1‐800‐273‐TALK (8255)
            </a>{' '}
          </p>
        </div>
      </div>

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
