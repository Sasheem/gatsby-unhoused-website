import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../components/Firebase';

import SEO from '../components/seo';
import { Form } from '../components/common/form';
import { Input } from '../components/common/input';
import { Button } from '../components/common/button';

const LoginPage = () => {
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const { firebase } = useContext(FirebaseContext);

  function handleSubmit(event) {
    event.preventDefault();
    firebase.login({ email: formValues.email, password: formValues.password });
  }

  function handleInputChange(event) {
    event.persist();
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
          placeholder="email"
          type="email"
          onChange={handleInputChange}
          value={formValues.email}
        />
        <Input
          name="password"
          placeholder="password"
          type="password"
          onChange={handleInputChange}
          value={formValues.password}
        />
        <Button type="submit" block>
          Login
        </Button>
      </Form>
    </section>
  );
};

export default LoginPage;
