import React, { useState } from 'react';
import { Link } from 'gatsby';

import SEO from '../components/seo';
import ButtonSubmit from '../components/common/Button/buttonSubmit';

import '../styles/global.scss';

const Contact = () => {
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  function handleInputChange(event) {
    event.persist();
    setErrorMessage('');
    setFormValues(currentValues => ({
      ...currentValues,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <div className="form-layout-container">
      <SEO title="Contact Unhoused Humanity" />
      <div className="form-layout">
        <div className="form-header">
          <h1>Contact Us</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className="form-container">
          <div />
          <form
            id="contact-general"
            className="form-component"
            name="contact-general"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            action="/successMessage"
          >
            <h3>Your Info</h3>
            <input type="hidden" name="bot-field" />
            <input type="hidden" name="form-name" value="contact-general" />
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
              <label for="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Say hello"
                value={formValues.message}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-submit-row">
              <div />
              <ButtonSubmit value="Submit" />
              <div />
            </div>
            <div className="form-description-row">
              <p>
                Are you about to be or experiencing homelessness?{' '}
                <Link to="/contactHelp">
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

export default Contact;
