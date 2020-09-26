import React, { useState, useContext, useEffect } from 'react';
import { navigate, Link } from 'gatsby';

import SEO from '../components/seo';
import ButtonSubmit from '../components/common/Button/buttonSubmit';

import { FirebaseContext } from '../components/Firebase';

import '../styles/global.scss';

/**
 * todo convert styled components to sass
 */

const Register = () => {
  const { firebase = null } = useContext(FirebaseContext) || {};
  const [errorMessage, setErrorMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  let isMounted = true;

  useEffect(() => {
    return () => {
      isMounted = false;
    };
  }, []);

  function handleSubmit(ev) {
    ev.preventDefault();
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
    } = ev.target;

    if (password.value === confirmPassword.value) {
      setIsProcessing(true);
      firebase
        .register({
          username: username.value,
          email: email.value,
          password: password.value,
          name: `${firstName.value} ${lastName.value}`,
        })
        .then(() => {
          setIsProcessing(false);
          navigate('/dashboard');
        })
        .catch(error => {
          setIsProcessing(false);
          setErrorMessage(error.message);
        });
    } else {
      setErrorMessage('Password and Confirm Password fields must match.');
    }
  }

  function handleInputChange(event) {
    event.persist();
    setErrorMessage('');
  }
  return (
    <div className="form-layout-container">
      <SEO title="Register page" />
      <div className="form-layout">
        <div className="form-header">
          <h1>Sign up to end homelessness</h1>
          <p>Read a client's story and change their life today.</p>
        </div>
        <div className="form-container">
          <div />
          <form onSubmit={handleSubmit} className="form-component">
            <div className="two-input-row">
              <div className="form-input-row">
                <label for="firstName">First Name</label>
                <input
                  name="firstName"
                  type="text"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-input-row">
                <label for="lastName">Last Name</label>
                <input
                  name="lastName"
                  type="text"
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-input-row">
              <label for="username">Username</label>
              <input
                name="username"
                type="text"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-input-row">
              <label for="email">Email</label>
              <input
                name="email"
                type="email"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-input-row">
              <label for="password">Password</label>
              <input
                name="password"
                type="password"
                onChange={handleInputChange}
                required
                minLength={6}
              />
            </div>
            <div className="form-input-row">
              <label for="confirmPassword">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                onChange={handleInputChange}
                required
                minLength={6}
              />
            </div>
            <div className="form-submit-row">
              <div />
              <ButtonSubmit
                value={isProcessing ? 'Processing...' : 'Sign Up'}
              />
              <div />
            </div>
            {!!errorMessage && (
              <div className="error-message">ERROR: {errorMessage}</div>
            )}
            <div className="form-description-row">
              <p>
                Already have an account?{' '}
                <Link to="/login">
                  <span className="form-description-link">Login</span>
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

export default Register;
