import React, { useState, useContext } from 'react';
import { Link, navigate } from 'gatsby';

import { FirebaseContext } from '../components/Firebase';
import SEO from '../components/seo';
import ButtonSubmit from '../components/common/Button/buttonSubmit';

import '../styles/global.scss';

const Contact = () => {
  const { firebase = null } = useContext(FirebaseContext) || {};
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

  function handleSubmit(ev) {
    ev.preventDefault();
    const { firstName, lastName, email, message } = formValues;
    try {
      if (firebase) {
        const result = firebase.createMessage({
          firstName,
          lastName,
          email,
          message,
          subject: 'General',
        });
        console.log(`result from message: ${typeof result}`);
        console.dir(result);
        navigate('/successMessage', {
          state: { name: firstName },
        });
      }
    } catch (error) {
      console.log(`createMessage frontend: ${error.message}`);
    }
  }

  return (
    <div className="form-layout-container">
      <SEO title="Contact Unhoused Humanity" />
      <div className="form-layout">
        <div className="form-header">
          <h1>Contact Us</h1>
          <p>Send us a detailed message and we will get back to you.</p>
        </div>
        <div className="form-container">
          <div />
          <form
            id="contact-general"
            className="form-component"
            name="contact-general"
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
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                placeholder="Say hello"
                value={formValues.message}
                onChange={handleInputChange}
                required
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
                  <span className="form-description-link">Request help</span>
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
