import React, { useState, useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

import { FirebaseContext } from '../components/Firebase';
import SEO from '../components/seo';
import Hero from '../components/Home/hero';
import HowItWorks from '../components/Crowdfund/howItWorks';
import FeaturedClients from '../components/Home/featuredClients';
import Metrics from '../components/common/Metrics/metrics';

import ButtonSubmit from '../components/common/Button/buttonSubmit';

import '../styles/global.scss';

/**
 * todo wrap the p text in hero component, make width smaller
 */

const CrowdfundPage = props => {
  const { firebase = null } = useContext(FirebaseContext) || {};
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    firstNameClient: '',
    familySize: 1,
    message: '',
  });

  const data = useStaticQuery(graphql`
    query {
      mockImage: file(relativePath: { eq: "mac-home-mockup.png" }) {
        base
        childImageSharp {
          fluid(maxWidth: 250) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  function handleInputChange(event) {
    event.persist();

    setFormValues(currentValues => ({
      ...currentValues,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <div className="page-body">
      <SEO title="Crowdfunding" />
      <Hero
        title="What is Crowdfunding?"
        subtitle="The practice of funding a project or venture by raising many small amounts of money from a large number of people, typically via the Internet."
        label="Donate"
        destination="/contactDonate"
        location="Crowdfund"
      />
      <Metrics />
      <div className="page-content-container">
        <div />
        <HowItWorks />
        <div className="content-container-two">
          <div className="content-element-two">
            <Img
              fluid={data.mockImage.childImageSharp.fluid}
              alt={data.mockImage.base.split('.')[0]}
            />
          </div>
          <div className="form-layout-crowdfund">
            <div className="form-header-crowdfund">
              <h3>Do you know someone experiencing homelessness?</h3>
              <p>
                Provide your contact information and tell us about their
                situation.
              </p>
            </div>
            <div className="form-container-crowdfund">
              <form
                id="contact-help-referral"
                method="POST"
                className="form-component"
                name="contact-help-referral"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                data-netlify-recaptcha="true"
                action="/successMessage"
              >
                <input type="hidden" name="bot-field" />
                <input
                  type="hidden"
                  name="form-name"
                  value="contact-help-referral"
                />
                <div className="form-input-row">
                  <label for="firstName">First name</label>
                  <input
                    type="text"
                    onChange={handleInputChange}
                    value={formValues.firstName}
                    name="firstName"
                    placeholder="Your first name"
                  />
                </div>
                <div className="form-input-row">
                  <label for="lastName">Last name</label>
                  <input
                    type="text"
                    onChange={handleInputChange}
                    value={formValues.lastName}
                    name="lastName"
                    placeholder="Your last name"
                  />
                </div>
                <div className="form-input-row">
                  <label for="email">Email</label>
                  <input
                    type="email"
                    onChange={handleInputChange}
                    value={formValues.email}
                    name="email"
                    placeholder="Your email address"
                  />
                </div>
                <div className="form-input-row">
                  <label for="firstNameClient">Client's first name</label>
                  <input
                    type="text"
                    onChange={handleInputChange}
                    value={formValues.firstNameClient}
                    name="firstNameClient"
                  />
                </div>
                <div className="form-input-row">
                  <label for="message">Describe their situation</label>
                  <textarea
                    onChange={handleInputChange}
                    value={formValues.message}
                    name="message"
                    placeholder="Provide details about the clients situation"
                  />
                </div>
                <div className="form-input-row">
                  <label for="familySize">Family size</label>
                  <input
                    type="number"
                    name="familySize"
                    id="familySize"
                    min="1"
                  />
                </div>
                <div className="form-input-row">
                  <div data-netlify-recaptcha="true"></div>
                </div>
                <div className="form-submit-row-left">
                  <ButtonSubmit value="Submit" />
                  <div />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="container-three">
          <h2>Crowdfund these clients today</h2>
          <FeaturedClients firebase={firebase} />
        </div>
      </div>
    </div>
  );
};

export default CrowdfundPage;
