import React, { useState } from 'react';

import ButtonSubmit from '../common/Button/buttonSubmit';
import { ErrorMessage } from '../common';

import '../../styles/global.scss';

/**
 * todo integrate mailchimp to form
 */

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function handleSubmit(event) {
    // validate and send email to mailchimp list
  }

  function handleInputChange(event) {
    event.persist();
    setErrorMessage('');
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
            type="email"
            placeholder="Email"
            onChange={handleInputChange}
            value={email}
          />
          <div className="newsletter-submit">
            <ButtonSubmit value="Sign up" />
          </div>
        </form>
      </div>
      <div />
    </div>
  );
};

export default Newsletter;
