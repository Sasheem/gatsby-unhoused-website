import React, { useState, useContext, useEffect } from 'react';
import { navigate, Link } from 'gatsby';

import { FirebaseContext } from '../components/Firebase';
import SEO from '../components/seo';
import {
  Form,
  Input,
  Button,
  ErrorMessage,
  FormSection,
} from '../components/common';

import '../styles/global.scss';

const LoginPage = () => {
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const { firebase = null } = useContext(FirebaseContext) || {};
  const [errorMessage, setErrorMessage] = useState('');
  let isMounted = true;

  useEffect(() => {
    return () => {
      isMounted = false;
    };
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    firebase
      .login({ email: formValues.email, password: formValues.password })
      .then(() => navigate('/dashboard'))
      .catch(error => {
        if (isMounted) {
          setErrorMessage(error.message);
        }
      });
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
      <SEO title="Login page" />
      <div className="form-layout">
        <div className="form-header">
          <h1>Login to Unhoused Dashboard</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lacus
            nisi, aliquam a tortor et, vulputate consectetur ex.
          </p>
        </div>
        <div className="form-container">
          <div />
          <form onSubmit={handleSubmit} className="form-component">
            <div className="form-input-row">
              <label for="email">Email Address</label>
              <input
                name="email"
                type="email"
                onChange={handleInputChange}
                value={formValues.email}
                required
              />
            </div>
            <div className="form-input-row">
              <label for="password">Password</label>
              <input
                name="password"
                type="password"
                onChange={handleInputChange}
                value={formValues.password}
                minLength={6}
                required
              />
            </div>
            <div className="form-submit-row">
              <div />
              <Button type="submit" block submit>
                Login
              </Button>
              <div />
            </div>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <div className="form-description-row">
              <p>
                Don't have an account?{' '}
                <Link to="/register">
                  <span className="form-description-link">Register</span>
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

export default LoginPage;
