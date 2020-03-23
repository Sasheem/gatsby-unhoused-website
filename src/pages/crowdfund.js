import React, { useState, useContext, useEffect } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

import { FirebaseContext } from '../components/Firebase';
import SEO from '../components/seo';
import Hero from '../components/Home/hero';
import CallToActions from '../components/Crowdfund/callToActions';
import CardClientFeatured from '../components/Cards/cardClientFeatured';

import { Button } from '../components/common';

import '../styles/global.scss';

/**
 * todo query graphql image to display next to referral form
 * todo create call to actions
 * todo find generic icons to relate to text in call to actions
 * todo wrap the p text in hero component
 */

const CrowdfundPage = props => {
  const { firebase = null } = useContext(FirebaseContext) || {};
  const [clients, setClients] = useState([]);
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    firstNameClient: '',
    familySize: 1,
    message: '',
  });
  let isMounted = true;

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

  useEffect(() => {
    return () => {
      isMounted = false;
    };
  }, []);

  // fetch clients to be featured
  useEffect(() => {
    if (firebase) {
      firebase.getFeaturedClients().then(snapshot => {
        if (isMounted) {
          const featuredClients = [];
          snapshot.forEach(doc => {
            featuredClients.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setClients(featuredClients);
        }
      });
    }
  }, [firebase]);

  console.log('clients from FirebaseContext now set to state using hooks');
  console.dir(clients);

  function handleInputChange(event) {
    event.persist();

    setFormValues(currentValues => ({
      ...currentValues,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="page-body">
      <SEO title="Crowdfunding" />
      <Hero
        title="What is Crowdfunding?"
        subtitle="The practice of funding a project or venture by raising many small amounts of money from a large number of people, typically via the Internet."
        label="Donate"
        destination="/contactDonate"
      />
      <div className="clients-featured-container">
        <h2>Featured Clients</h2>
        <div className="clients-featured-content">
          {!!clients &&
            clients.map(client => (
              <CardClientFeatured
                key={client.id}
                firstName={client.firstName}
                lastName={client.lastName}
                situation={`${client.situation.slice(0, 90)}...`}
                raised={client.raised}
                goal={client.goal}
                imageUrl={client.imageUrl}
              />
            ))}
        </div>
      </div>
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
            <form className="form-component" onSubmit={handleSubmit}>
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
              <div className="form-submit-row-left">
                <Button type="submit" block>
                  Send
                </Button>
                <div />
              </div>
            </form>
          </div>
        </div>
      </div>
      <CallToActions />
    </div>
  );
};

export default CrowdfundPage;
