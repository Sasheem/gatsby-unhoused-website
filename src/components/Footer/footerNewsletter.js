import React, { useState, useContext } from 'react';

import { FirebaseContext } from '../Firebase';

import './footer.scss';

/**
 * todo move handleSubmit to separate file and import it here and in Newsletter component
 */

const FooterNewsletter = () => {
  const { firebase = null } = useContext(FirebaseContext) || {};
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async ev => {
    ev.preventDefault();
    let status = 0;
    // validate and send email to mailchimp list
    if (firebase) {
      await firebase
        .checkListForEmail({ email: ev.target.email.value })
        .then(result => {
          if (result.data.statusCode && result.data.statusCode === 200) {
            setErrorMessage(`email already subscribed`);
            setSuccessMessage('');
          }
          if (result.data.status === 404) {
            status = result.data.status;
          }
        })
        .catch(error => {
          setErrorMessage(error.message);
          setSuccessMessage('');
        });

      if (status === 404) {
        await firebase
          .subscribeEmailToLists({
            email,
          })
          .then(() => {
            setSuccessMessage('Success! You are subscribed.');
            setErrorMessage('');
            setEmail('');
          });
      }
    }
  };

  function handleInputChange(ev) {
    ev.persist();
    setErrorMessage('');
    setSuccessMessage('');
    setEmail(ev.target.value);
  }

  return (
    <form onSubmit={handleSubmit} className="newsletter-form-footer">
      <div className="newsletter-form-content">
        <input
          name="email"
          className="newsletter-input"
          type="email"
          value={email}
          onChange={handleInputChange}
          placeholder="Email"
        />
        <div className="newsletter-submit">
          <input type="submit" value="Submit" />
        </div>
      </div>
      {!!errorMessage && (
        <div className="error-message">ERROR: {errorMessage}</div>
      )}
      {!!successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </form>
  );
};

export default FooterNewsletter;
