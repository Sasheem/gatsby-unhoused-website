import React, { useState } from 'react';
import { Link } from 'gatsby';

import SEO from '../components/seo';
import { Button, ErrorMessage, FormSection } from '../components/common';

import '../styles/global.scss';

/**
 * todo Make position field a dropdown of available positions
 * todo Backend: send form data  to youhumanity@gmail.com
 * todo Frontend: form validation
 */

const ContactVolunteer = () => {
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    message: '',
    discoverMethod: '',
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
      <SEO title="Unhoused Humanity contact volunteer form" />
      <div className="form-layout">
        <div className="form-header">
          <h1>Join our team</h1>
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
                type="text"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-input-row">
              <label for="position">Position</label>
              <input
                type="text"
                name="position"
                value={formValues.position}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-input-row">
              <label for="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell us a little about yourself"
                value={formValues.message}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-input-row">
              <label for="file-volunteer">Attach your resume</label>
              <input type="file" name="file-volunteer" id="file-volunteer" />
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
    </FormSection>
  );
};

export default ContactVolunteer;
