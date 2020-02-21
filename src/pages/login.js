import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../components/Firebase';

import SEO from '../components/seo';
import { Form, Input, Button, ErrorMessage } from '../components/common';

const LoginPage = () => {
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const { firebase } = useContext(FirebaseContext);
  const [errorMessage, setErrorMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    firebase
      .login({ email: formValues.email, password: formValues.password })
      .catch(error => {
        setErrorMessage(error.message);
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
    <section>
      <SEO title="Login page" />
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
    </section>
  );
};

export default LoginPage;
