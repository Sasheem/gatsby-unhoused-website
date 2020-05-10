import React, { useContext, useState } from 'react';
import { Link } from 'gatsby';

import { FirebaseContext } from '../components/Firebase';
import SEO from '../components/seo';
import ButtonSubmit from '../components/common/Button/buttonSubmit';

const ForgotPassword = () => {
  const { firebase = null } = useContext(FirebaseContext) || {};
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  function submitForm(ev) {
    ev.preventDefault();
    if (firebase) {
      firebase
        .sendPasswordReset({ email: ev.target.email.value })
        .then(result => {
          setSuccessMessage(`Email Sent!`);
          console.log(`success result: ${typeof result}`);
          console.dir(result);
        })
        .catch(error => {
          setErrorMessage(`Server issue. Contact Unhoused Humanity.`);
          console.log(`sendPasswordReset frontend: ${error.message}`);
        });
    }
  }

  function handleInputChange(ev) {
    ev.persist();
    setErrorMessage('');
    setSuccessMessage('');
  }

  return (
    <div className="page-content-container">
      <SEO title="Forgot password" />
      <div className="page-message">
        <form className="form-component" onSubmit={submitForm}>
          <h2>Forgot password?</h2>
          <p>
            Enter your email associated with your account to reset your password
          </p>
          <div className="form-input-row">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" onChange={handleInputChange} />
          </div>
          <div className="form-submit-row">
            <div />
            <ButtonSubmit value="Send" />
            <div />
          </div>
          <div className="form-description-row-sm">
            <p>
              Don't have an account?{' '}
              <Link to="/register">
                <span className="form-description-link">Signup</span>
              </Link>
            </p>
          </div>
        </form>
        {!!errorMessage && (
          <div className="error-message">ERROR: {errorMessage}</div>
        )}
        {!!successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
