import React, { useState, useContext, useEffect } from 'react';
import { navigate, Link } from 'gatsby';

import SEO from '../components/seo';
import {
  Form,
  Input,
  Button,
  ErrorMessage,
  FormSection,
} from '../components/common';
import { FirebaseContext } from '../components/Firebase';

import '../styles/global.scss';

const Register = () => {
  const { firebase = null } = useContext(FirebaseContext) || {};
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  let isMounted = true;

  useEffect(() => {
    return () => {
      isMounted = false;
    };
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    if (formValues.password === formValues.confirmPassword) {
      firebase
        .register({
          username: formValues.username,
          email: formValues.email,
          password: formValues.password,
        })
        .then(() => navigate('/dashboard'))
        .catch(error => {
          if (isMounted) {
            setErrorMessage(error.message);
          }
        });
    } else {
      setErrorMessage('Password and Confirm Password fields must match.');
    }
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
      <SEO title="Register page" />
      <div className="form-layout">
        <div className="form-header">
          <h1>Register with Unhoused Humanity</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lacus
            nisi, aliquam a tortor et, vulputate consectetur ex.
          </p>
        </div>
        <div className="form-container">
          <div />
          <form onSubmit={handleSubmit} className="form-component">
            <div className="form-input-row">
              <label for="username">Username</label>
              <input
                name="username"
                type="text"
                onChange={handleInputChange}
                value={formValues.username}
                required
              />
            </div>
            <div className="form-input-row">
              <label for="email">Email</label>
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
                value={formValues.confirmPassword}
                required
                minLength={6}
              />
            </div>
            <div className="form-submit-row">
              <div />
              <Button type="submit" block submit>
                Register
              </Button>
              <div />
            </div>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <div className="form-description-row">
              <p>
                Already have an account?{' '}
                <Link to="/register">
                  <span className="form-description-link">Login</span>
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

export default Register;
