import React, { useState, useContext } from 'react';
import { Link, navigate } from 'gatsby';

import SEO from '../components/seo';
import { FirebaseContext } from '../components/Firebase';
import ButtonSubmit from '../components/common/Button/buttonSubmit';
import { makeId } from '../utils/makeId';

import '../styles/global.scss';

/**
 * todo Make position field a dropdown of available positions
 * todo Backend: send form data  to youhumanity@gmail.com
 * todo Frontend: form validation
 */

const ContactVolunteer = () => {
  const { firebase = null } = useContext(FirebaseContext) || {};
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    position: '',
    message: '',
    discoverMethod: '',
  });
  const [resume, setResume] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

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
    const { name } = formValues;
    var nameSplit = name.split(' ');
    console.dir(nameSplit);
    setIsProcessing(true);

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
        volunteerId:
          nameSplit.length === 1
            ? `${name}-${makeId(5)}`
            : `${nameSplit[0]}-${nameSplit[1]}`,
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
          state: { name },
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
            <div className="form-input-row">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-input-row">
              <label htmlFor="email">Email</label>
              <input
                type="email"
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
              <input
                onChange={handleFileChange}
                type="file"
                name="resume"
                required
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
                Are you a caseworker with a potential client?{' '}
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

export default ContactVolunteer;
