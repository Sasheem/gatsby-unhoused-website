import React, { useState, useContext } from 'react';

import { FirebaseContext } from '../Firebase';
import ButtonSubmit from '../common/Button/buttonSubmit';

import '../../styles/global.scss';

/**
 * todo move handleSubmit to separate file and import it here and in FOOTER Newsletter component
 */

const Newsletter = () => {
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

  function handleInputChange(event) {
    event.persist();
    setErrorMessage('');
    setSuccessMessage('');
    setEmail(event.target.value);
  }
  return (
    <div className="newsletter-container">
      <div />
      <div className="newsletter-text">
        <h2>Sign up for our newsletter</h2>
      </div>
      <div className="newsletter-form-container">
        <p>
          Join our newsletter and we will keep you in the loop about our latest
          success stories, blog posts, and ways to get involved.
        </p>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleInputChange}
            value={email}
          />
          <div className="newsletter-submit">
            <ButtonSubmit value="Sign up" />
          </div>
        </form>
        {!!errorMessage && (
          <div className="error-message">ERROR: {errorMessage}</div>
        )}
        {!!successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
      </div>
      <div />
    </div>
  );
};

export default Newsletter;
