import React, { useState, useContext, useEffect } from 'react';
import { graphql } from 'gatsby';

import { FirebaseContext } from '../components/Firebase';
import SEO from '../components/seo';
import Hero from '../components/Home/hero';
import CallToActions from '../components/Home/callToActions';
import CardClientFeatured from '../components/Cards/cardClientFeatured';

import { Form, Input, Button } from '../components/common';

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
  console.log('graphql query to props:');
  console.dir(props.data.allClient.edges);

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
        <p>Read their story and help fund a clients housing</p>
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
          <h3>Place mockup image here</h3>
        </div>
        <div />
        <div className="form-layout-crowdfund">
          <div className="form-header-crowdfund">
            <h3>Do you know someone experiencing homelessness?</h3>
            <p>
              Provide your contact information and tell us about their
              situation.
            </p>
          </div>
          <div className="form-container-crowdfund">
            <form className="form-component">
              <div className="form-input-row">
                <label for="firstName">First name</label>
                <input
                  type="text"
                  onChange={handleInputChange}
                  value={formValues.firstName}
                  name="firstName"
                />
              </div>
              <div className="form-input-row">
                <label for="lastName">Last name</label>
                <input
                  type="text"
                  onChange={handleInputChange}
                  value={formValues.lastName}
                  name="lastName"
                />
              </div>
              <div className="form-input-row">
                <label for="email">Email</label>
                <input
                  type="email"
                  onChange={handleInputChange}
                  value={formValues.email}
                  name="email"
                  placeholder="example@email.com"
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
                  placeholder="Provide client details"
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

export const query = graphql`
  {
    allClient {
      edges {
        node {
          id
          firstName
          lastName
          raised
          goal
          situation
          familySize
          status
          imageUrl
          localImage {
            childImageSharp {
              fixed(width: 331) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          dateHoused
          dateFundingBegan
          questions
          answers
        }
      }
    }
  }
`;

export default CrowdfundPage;
