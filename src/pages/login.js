import React, { useState, useContext } from 'react';
import { Link } from 'gatsby';
import { FirebaseContext } from '../components/Firebase';

import Layout from '../components/Layout/layout';
import SEO from '../components/seo';

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
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="email"
          type="email"
          onChange={handleInputChange}
          value={formValues.email}
        />
        <input
          name="password"
          placeholder="password"
          type="password"
          onChange={handleInputChange}
          value={formValues.password}
        />
        <button type="submit">Login</button>
      </form>
    </section>
  );
};

export default LoginPage;
