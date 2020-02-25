import React, { useState, useContext } from 'react';
import { navigate } from 'gatsby';

import { Form, Input, Button, ErrorMessage } from '../components/common';
import { FirebaseContext } from '../components/Firebase';

const Register = () => {
  const { firebase } = useContext(FirebaseContext);
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

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
          setErrorMessage(error.message);
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
    <Form onSubmit={handleSubmit}>
      <Input
        name="username"
        placeholder="Username"
        type="text"
        onChange={handleInputChange}
        value={formValues.username}
        required
      />
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
        required
        minLength={6}
      />
      <Input
        name="confirmPassword"
        placeholder="Confirm Password"
        type="password"
        onChange={handleInputChange}
        value={formValues.confirmPassword}
        required
        minLength={6}
      />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <Button type="submit" block>
        Register
      </Button>
    </Form>
  );
};

export default Register;
