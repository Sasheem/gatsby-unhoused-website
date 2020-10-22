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
    name: '',
    email: '',
    situation: '',
    phone: '',
    familySize: 1,
    discoveryMethod: '',
    clientEmail: '',
    clientPhone: '',
    clientName: '',
  });
  const [userIsClient, setUserIsClient] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

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
    const { name } = formValues;

    // loop through formValues
    for (let [key, value] of Object.entries(formValues)) {
      if (value.length !== 0) {
        emailValues[key] = value;
      }
    }

    emailValues['subject'] = 'Request Help';

    setIsProcessing(true);
    try {
      if (firebase) {
        const result = firebase.createHelpMessage({
          emailValues,
        });
        navigate('/successMessage', {
          state: { name: name },
        });
      }
    } catch (error) {
      setErrorMessage(`createMessage frontend: ${error.message}`);
    }
    setIsProcessing(false);
  }

  return (
    <div className="form-layout-container">
      <SEO
        title="Are you about to be homeless?"
        description="Reach out to us if you are about to experience homelessness. Provide as much details about your situation as you can."
      />
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
            <div className="form-input-row">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                name="name"
                onChange={handleInputChange}
                value={formValues.name}
                required
              />
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
                <div className="form-input-row">
                  <label htmlFor="clientName">Client's Full Name</label>
                  <input
                    type="text"
                    name="clientName"
                    value={formValues.clientName}
                    onChange={handleInputChange}
                    required={userIsClient ? true : false}
                  />
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
              <ButtonSubmit
                value={isProcessing ? 'Processing...' : 'Submit'}
                disabled={isProcessing}
              />
              <div />
            </div>
            {!!errorMessage && (
              <div className="error-message">ERROR: {errorMessage}</div>
            )}
            <div className="form-description-row">
              <p>
                Are you a case worker?{' '}
                <Link to="/contactCaseworker">
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
