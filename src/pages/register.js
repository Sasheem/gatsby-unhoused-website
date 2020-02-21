import React, { useState, useContext } from 'react';

import { Form, Input, Button } from '../components/common';
import { FirebaseContext } from '../components/Firebase';

const Register = () => {
  const { firebase } = useContext(FirebaseContext);
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  function handleSubmit(event) {
    event.preventDefault();

    if (formValues.password === formValues.confirmPassword) {
      firebase.register({
        email: formValues.email,
        password: formValues.password,
      });
    }

    console.dir(formValues);
  }

  function handleInputChange(event) {
    event.persist();

    setFormValues(currentValues => ({
      ...currentValues,
      [event.target.name]: event.target.value,
    }));
  }
  return (
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
        required
        minLength={3}
      />
      <Input
        name="confirmPassword"
        placeholder="Confirm Password"
        type="password"
        onChange={handleInputChange}
        value={formValues.confirmPassword}
        required
        minLength={3}
      />
      <Button type="submit" block>
        Register
      </Button>
    </Form>
  );
};

export default Register;
