import React, { useState, useContext } from 'react';
import { Link, navigate } from 'gatsby';

import { FirebaseContext } from '../components/Firebase';
import SEO from '../components/seo';
import ButtonSubmit from '../components/common/Button/buttonSubmit';

import '../styles/global.scss';

const ContactCaseworker = () => {
  const { firebase = null } = useContext(FirebaseContext) || {};
  const [formValues, setFormValues] = useState({
    name: '',
    agencyName: '',
    email: '',
    phone: '',
    clientName: '',
    clientEmail: '',
    message: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = ev => {
    ev.persist();
    setErrorMessage('');
    setFormValues(currentValues => ({
      ...currentValues,
      [ev.target.name]: ev.target.value,
    }));
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    const {
      name,
      agencyName,
      email,
      phone,
      clientName,
      clientEmail,
      message,
    } = formValues;
    try {
      setIsProcessing(true);
      if (firebase) {
        console.dir(formValues);
        const result = await firebase.createCaseworkerMessage({
          name,
          agencyName,
          email,
          phone,
          clientName,
          clientEmail,
          message,
          subject: 'Case Worker',
        });
        console.log(`result from message: ${typeof result}`);
        console.dir(result);
        setIsProcessing(false);
        navigate('/successMessage', {
          state: { name },
        });
      }
    } catch (error) {
      setIsProcessing(false);
      console.log(`createMessage frontend: ${error.message}`);
    }
  };

  return (
    <div className="form-layout-container">
      <SEO
        title="Caseworker Contact Unhoused Humanity"
        description="Caseworkers or organizations can reach out to Unhoused Humanity about a client experiencing homelessness"
      />
      <div className="form-layout">
        <div className="form-header">
          <h1>Submit a client</h1>
          <p>
            Provide your contact information and client details to begin the
            Unhoused Humanity process.
          </p>
        </div>
        <div className="form-container">
          <div />
          <form
            id="contact-caseworker"
            className="form-component"
            name="contact-caseworker"
            onSubmit={handleSubmit}
          >
            <h3>Caseworker Info</h3>
            <div className="form-input-row">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                name="name"
                onChange={handleInputChange}
                value={formValues.name}
                required
              />
            </div>
            <div className="form-input-row">
              <label htmlFor="agencyName">Agency Name</label>
              <input
                type="text"
                name="agencyName"
                onChange={handleInputChange}
                value={formValues.agencyName}
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
            <h3>Client Details</h3>
            <div className="form-input-row">
              <label htmlFor="clientName">Client Name</label>
              <input
                type="text"
                name="clientName"
                onChange={handleInputChange}
                value={formValues.clientName}
                required
              />
            </div>
            <div className="form-input-row">
              <label htmlFor="clientEmail">Client Email</label>
              <input
                type="email"
                name="clientEmail"
                onChange={handleInputChange}
                value={formValues.clientEmail}
              />
            </div>
            <div className="form-input-row">
              <label htmlFor="message">Situation</label>
              <textarea
                type="text"
                name="message"
                placeholder="Describe the clients situation and what the client is requesting financial assistance for"
                onChange={handleInputChange}
                value={formValues.message}
                required
              />
            </div>
            <div className="form-submit-row">
              <div />
              <ButtonSubmit
                value={isProcessing === true ? 'Processing...' : 'Submit'}
              />
              <div />
            </div>
            {!!errorMessage && (
              <div className="error-message">ERROR: {errorMessage}</div>
            )}
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

export default ContactCaseworker;
