import React, { useState } from 'react';

import './footer.scss';

const FooterNewsletter = () => {
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
    <form onSubmit={handleSubmit} className="newsletter-form">
      <input
        className="newsletter-input"
        type="email"
        value={email}
        onChange={handleInputChange}
        placeholder="Email"
      />
      <div className="newsletter-submit">
        <input type="submit" value="Submit" />
      </div>
    </form>
  );
};

export default FooterNewsletter;
