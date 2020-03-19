import React, { useState } from 'react';
import { Link } from 'gatsby';

import SEO from '../components/seo';
import { Button, ErrorMessage, FormSection } from '../components/common';

import '../styles/global.scss';

/**
 * todo Backend: send form data  to youhumanity@gmail.com
 * todo Frontend: form validation
 */

const ContactHelp = () => {
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    phone: '',
    familySize: 1,
    discoveryMethod: '',
    clientPhone: '',
    clientFirstName: '',
    clientLastName: '',
  });
  const [userIsClient, setUserIsClient] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleUserClientSwitch(event) {
    setUserIsClient(!userIsClient);
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
      <SEO title="Unhoused Humanity contact for help form" />
      <div className="form-layout">
        <div className="form-header">
          <h1>Request our help</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lacus
            nisi, aliquam a tortor et, vulputate consectetur ex.
          </p>
        </div>
        <div className="form-container">
          <div />
          <form onSubmit={handleSubmit} className="form-component">
            <h3>Your Info</h3>
            <div className="two-input-row">
              <div className="form-input-row">
                <label for="firstName">First Name</label>
                <input type="text" name="firstName" id="firstName" />
              </div>
              <div className="form-input-row">
                <label for="lastName">Last Name</label>
                <input type="text" name="lastName" id="lastName" />
              </div>
            </div>
            <div className="form-input-row">
              <label for="email">Email</label>
              <input type="email" name="email" id="email" />
            </div>
            <div className="form-input-row">
              <label for="phone">Phone Number</label>
              <input type="tel" name="phone" id="phone" />
            </div>
            <div className="form-input-row">
              <label for="message">Describe the situation</label>
              <textarea id="message" name="message" />
            </div>
            <div className="two-input-row">
              <div class="form-input-row">
                <label for="familySize">Family Size</label>
                <input
                  type="number"
                  name="familySize"
                  id="familySize"
                  min="1"
                />
              </div>
              <div className="form-input-row">
                <label for="switch-help">
                  I am filling this form out for someone else
                </label>
                <label class="switch-help">
                  <input
                    type="checkbox"
                    name="switch-help"
                    id="switch-help"
                    checked={userIsClient}
                    onChange={handleUserClientSwitch}
                  />
                  <span className="slider-help" />
                </label>
              </div>
            </div>
            {userIsClient ? (
              <div className="form-client-container">
                <h4>Client Info</h4>
                <div className="two-input-row">
                  <div className="form-input-row">
                    <label for="clientFirstName">First Name</label>
                    <input
                      type="text"
                      name="clientFirstName"
                      value={formValues.clientFirstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-input-row">
                    <label for="clientLastName">Last Name</label>
                    <input
                      type="text"
                      name="clientLastName"
                      value={formValues.clientLastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-input-row">
                  <label for="clientEmail">Email</label>
                  <input
                    type="email"
                    name="clientEmail"
                    value={formValues.clientEmail}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-input-row">
                  <label for="clientPhone">Phone Number</label>
                  <input
                    type="tel"
                    name="clientPhone"
                    value={formValues.clientPhone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            ) : null}
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
                Send
              </Button>
              <div />
            </div>
            <div className="form-description-row">
              <p>
                Are you a case worker?{' '}
                <Link to="/">
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

export default ContactHelp;