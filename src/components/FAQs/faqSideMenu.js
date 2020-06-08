import React from 'react';
import scrollTo from 'gatsby-plugin-smoothscroll';

import '../Resources/resources.scss';

import '../common/Metrics/metrics.scss';

const FAQSideMenu = () => {
  return (
    <div className="side-menu-content">
      <h1>Get Informed</h1>
      <div className="question-div">
        <p className="faq-title">What Is Homelessness?</p>
        <ul>
          <li>
            <span onClick={() => scrollTo('#homeless-types')}>Unsheltered</span>
          </li>
          <li>
            <span onClick={() => scrollTo('#homeless-types')}>Sheltered</span>
          </li>
          <li>
            <span onClick={() => scrollTo('#homeless-types')}>Doubled Up</span>
          </li>
          <li>
            <span onClick={() => scrollTo('#homeless-types')}>
              Couch Surfing
            </span>
          </li>
        </ul>
      </div>

      <div className="question-div">
        <p className="faq-title">What Causes Homelessness?</p>
        <ul>
          <li>
            <span onClick={() => scrollTo('#housing-out-of-reach')}>
              Housing Out of Reach
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#income-affordability')}>
              Income Affordability
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#homelessness-health')}>
              Homelessness &amp; Health
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#domestic-violence')}>
              Domestic Violence
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#racial-inequality')}>
              Racial Inequality
            </span>
          </li>
        </ul>
      </div>

      <div className="question-div">
        <p className="faq-title">Who Experiences Homelessness?</p>
        <ul>
          <li>
            <span onClick={() => scrollTo('#single-adults')}>
              Single Adults
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#children-families')}>
              Children &amp; Families
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#veterans')}>Veterans</span>
          </li>
          <li>
            <span onClick={() => scrollTo('#chronically-homeless')}>
              Chronically Homeless
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#youth-young-adults')}>
              Youth &amp; Young Adults
            </span>
          </li>
        </ul>
      </div>

      <div className="question-div">
        <p className="faq-title">Some Solutions</p>
        <ul>
          <li>
            <span onClick={() => scrollTo('#creating-systems-that-work')}>
              A Coordinated Approach
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#rapid-rehousing')}>
              Rapid Re-Housing
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#permanent-supportive-housing')}>
              Permanent Supportive Housing
            </span>
          </li>

          <li>
            <span onClick={() => scrollTo('#crisis-response')}>
              Crisis Response
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#income-opportunities')}>
              Income Opportunities
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FAQSideMenu;
