import React, { useState } from 'react';
import { Link } from 'gatsby';

import SEO from '../components/seo';
import { Button, ErrorMessage, FormSection } from '../components/common';

import '../styles/global.scss';

/**
 * todo Backend: navigate to stripe form for checkout
 * todo Frontend: form validation
 * todo Frontend: add register components inside donation form
 * todo Frontend: create and link to contactGeneral page
 */

const ContactDonate = () => {
  const [formValues, setFormValues] = useState({
    clientName: '',
    donationAmount: '',
    message: '',
    firstName: '',
    lastName: '',
    email: '',
    discoveryMethod: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  function handleSubmit(event) {
    event.preventDefault();
    // upon submit, direct user to stripe
  }

  function handleInputChange(event) {
    event.persist();
    setErrorMessage('');
    setFormValues(currentValues => ({
      ...currentValues,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <FormSection>
      <SEO title="Unhoused Humanity donation form" />
      <div className="form-layout">
        <div className="form-header">
          <h1>Donate to Unhoused Humanity</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lacus
            nisi, aliquam a tortor et, vulputate consectetur ex.
          </p>
        </div>
        <div className="form-container">
          <div />
          <form onSubmit={handleSubmit} className="form-component">
            <h3>Client Info</h3>
            <div className="form-input-row">
              <label for="clientName">First Name</label>
              <input
                type="text"
                name="clientName"
                value={formValues.clientName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-input-row">
              <label for="donationAmount">Amount</label>
              <input
                type="number"
                name="donationAmount"
                value={formValues.donationAmount}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-input-row">
              <label for="message">Message to client</label>
              <textarea id="message" name="message" />
            </div>
            <h3>Your Info</h3>
            <div className="two-input-row">
              <div className="form-input-row">
                <label for="firstName">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formValues.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-input-row">
                <label for="lastName">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formValues.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-input-row">
              <label for="email">Email</label>
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-input-row">
              <label for="discoveryMethod">
                How did you hear about Unhoused Humanity?
              </label>
              <input
                type="text"
                name="discoveryMethod"
                value={formValues.discoveryMethod}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-submit-row">
              <div />
              <Button type="submit" block submit>
                Donate
              </Button>
              <div />
            </div>
            <div className="form-description-row">
              <p>
                Need help making a donation?{' '}
                <Link to="/contact">
                  <span className="form-description-link">Contact Us</span>
                </Link>
              </p>
            </div>
          </form>
          <div />
        </div>
      </div>
    </FormSection>
  );
};

export default ContactDonate;
