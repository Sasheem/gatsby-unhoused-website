import React, { useState, useContext, useEffect } from 'react';
import { navigate } from 'gatsby';

import { FirebaseContext } from '../components/Firebase';
import SEO from '../components/seo';
import {
  Form,
  Input,
  Button,
  ErrorMessage,
  FormSection,
} from '../components/common';

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
      <h2>Login to Unhoused Dashboard</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          name="email"
          placeholder="Email"
          type="email"
          onChange={handleInputChange}
          value={formValues.email}
          required
        />
        <Input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleInputChange}
          value={formValues.password}
          minLength={6}
          required
        />
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <Button type="submit" block>
          Login
        </Button>
      </Form>
    </FormSection>
  );
};

export default LoginPage;
