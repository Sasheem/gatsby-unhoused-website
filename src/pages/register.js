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
  const [errorMessage, setErrorMessage] = useState('');
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
      firebase
        .register({
          username: username.value,
          email: email.value,
          password: password.value,
          name: `${firstName.value} ${lastName.value}`,
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
