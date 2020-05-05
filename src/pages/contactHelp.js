import React, { useState, useContext } from 'react';
import { Link, navigate } from 'gatsby';

import { FirebaseContext } from '../components/Firebase';
import SEO from '../components/seo';
import ButtonSubmit from '../components/common/Button/buttonSubmit';

import '../styles/global.scss';

/**
 * todo Backend: send form data  to youhumanity@gmail.com
 * todo Frontend: form validation
 */

const ContactHelp = () => {
  const { firebase = null } = useContext(FirebaseContext) || {};
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    situation: '',
    phone: '',
    familySize: 1,
    discoveryMethod: '',
    clientEmail: '',
    clientPhone: '',
    clientFirstName: '',
    clientLastName: '',
  });
  const [userIsClient, setUserIsClient] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  function handleSubmit(ev) {
    ev.preventDefault();
    let emailValues = {};
    const { firstName } = formValues;

    // loop through formValues
    for (let [key, value] of Object.entries(formValues)) {
      if (value.length !== 0) {
        emailValues[key] = value;
      }
    }

    emailValues['subject'] = 'Request Help';
    console.log(`emailValues: ${typeof emailValues}`);
    console.dir(emailValues);
    try {
      if (firebase) {
        const result = firebase.createHelpMessage({
          emailValues,
        });
        navigate('/successMessage', {
          state: { name: firstName },
        });
      }
    } catch (error) {
      setErrorMessage(`createMessage frontend: ${error.message}`);
    }
  }

  return (
    <div className="form-layout-container">
      <SEO title="Unhoused Humanity contact for help form" />
      <div className="form-layout">
        <div className="form-header">
          <h1>Request our help</h1>
          <p>
            Fill out the form if you know someone or are about to experience
            homelessness.
          </p>
        </div>
        <div className="form-container">
          <div />
          <form
            id="contact-request-for-help"
            className="form-component"
            name="contact-request-for-help"
            onSubmit={handleSubmit}
          >
            <h3>Your Info</h3>
            <div className="two-input-row">
              <div className="form-input-row">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  onChange={handleInputChange}
                  value={formValues.firstName}
                  required
                />
              </div>
              <div className="form-input-row">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  onChange={handleInputChange}
                  value={formValues.lastName}
                />
              </div>
            </div>
            <div className="form-input-row">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                onChange={handleInputChange}
                value={formValues.email}
                required
              />
            </div>
            <div className="form-input-row">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                name="phone"
                onChange={handleInputChange}
                value={formValues.phone}
              />
            </div>
            <div className="form-input-row">
              <label htmlFor="situation">Describe the situation</label>
              <textarea
                name="situation"
                onChange={handleInputChange}
                value={formValues.situation}
                required
              />
            </div>
            <div className="two-input-row">
              <div className="form-input-row">
                <label htmlFor="familySize">Family Size</label>
                <input
                  type="number"
                  name="familySize"
                  min="1"
                  max="12"
                  onChange={handleInputChange}
                  value={formValues.familySize}
                  required
                />
              </div>
              <div className="form-input-row">
                <label htmlFor="switch-help">
                  I am filling this form out for someone else
                </label>
                <label className="switch-help">
                  <input
                    type="checkbox"
                    name="switch-help"
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
                    <label htmlFor="clientFirstName">First Name</label>
                    <input
                      type="text"
                      name="clientFirstName"
                      value={formValues.clientFirstName}
                      onChange={handleInputChange}
                      required={userIsClient ? true : false}
                    />
                  </div>
                  <div className="form-input-row">
                    <label htmlFor="clientLastName">Last Name</label>
                    <input
                      type="text"
                      name="clientLastName"
                      value={formValues.clientLastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-input-row">
                  <label htmlFor="clientEmail">Email</label>
                  <input
                    type="email"
                    name="clientEmail"
                    value={formValues.clientEmail}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-input-row">
                  <label htmlFor="clientPhone">Phone Number</label>
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
              <label htmlFor="discoveryMethod">
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
              <ButtonSubmit value="Submit" />
              <div />
            </div>
            {!!errorMessage && (
              <div className="error-message">ERROR: {errorMessage}</div>
            )}
            <div className="form-description-row">
              <p>
                Are you a case worker?{' '}
                <Link to="/contact">
                  <span className="form-description-link">Contact Us</span>
                </Link>
              </p>
            </div>
          </form>
          <div />
        </div>
      </div>
    </div>
  );
};

export default ContactHelp;
