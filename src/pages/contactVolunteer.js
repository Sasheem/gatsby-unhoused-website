import React, { useState, useContext } from 'react';
import { Link, navigate } from 'gatsby';

import SEO from '../components/seo';
import { FirebaseContext } from '../components/Firebase';
import ButtonSubmit from '../components/common/Button/buttonSubmit';

import '../styles/global.scss';

/**
 * todo Make position field a dropdown of available positions
 * todo Backend: send form data  to youhumanity@gmail.com
 * todo Frontend: form validation
 */

const ContactVolunteer = () => {
  const { firebase = null } = useContext(FirebaseContext) || {};
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    message: '',
    discoverMethod: '',
  });
  const [resume, setResume] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  function handleInputChange(event) {
    event.persist();
    setErrorMessage('');
    setFormValues(currentValues => ({
      ...currentValues,
      [event.target.name]: event.target.value,
    }));
  }

  // handle file change
  function handleFileChange(ev) {
    ev.persist();
    setResume(ev.target.files[0]);
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    let emailValues = {};
    let filePath = '';
    const { firstName, lastName } = formValues;

    // loop through formValues
    for (let [key, value] of Object.entries(formValues)) {
      if (value.length !== 0) {
        emailValues[key] = value;
      }
    }

    emailValues['subject'] = 'Volunteer Opportunity';

    if (resume !== null) {
      const result = await firebase.uploadVolunteerResume({
        name: resume.name,
        fileObject: resume,
        volunteerId: `${firstName}-${lastName}`,
      });
      filePath = result.metadata.fullPath;
    }
    try {
      if (firebase) {
        const result = await firebase.createVolunteerMessage({
          emailValues,
          filePath,
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
      <SEO
        title="Become a volunteer"
        description="Join the fight against homelessness and become a volunteer for Unhoused Humanity."
      />
      <div className="form-layout">
        <div className="form-header">
          <h1>Join our team</h1>
          <p>Fill out the form below to help us make a difference.</p>
        </div>
        <div className="form-container">
          <div />
          <form
            id="contact-volunteer"
            className="form-component"
            name="contact-volunteer"
            onSubmit={handleSubmit}
          >
            <h3>Your Info</h3>
            <div className="two-input-row">
              <div className="form-input-row">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formValues.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-input-row">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formValues.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-input-row">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-input-row">
              <label htmlFor="position">Position</label>
              <input
                type="text"
                name="position"
                value={formValues.position}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-input-row">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell us a little about yourself"
                value={formValues.message}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-input-row">
              <label htmlFor="resume">Attach your resume (docx or pdf)</label>
              <input onChange={handleFileChange} type="file" name="resume" />
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

export default ContactVolunteer;
