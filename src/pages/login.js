import React, { useState, useContext, useEffect } from 'react';
import { navigate, Link } from 'gatsby';

import { FirebaseContext } from '../components/Firebase';
import SEO from '../components/seo';
import ButtonSubmit from '../components/common/Button/buttonSubmit';

import '../styles/global.scss';

const LoginPage = () => {
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const { firebase = null, user } = useContext(FirebaseContext) || {};
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
    // try {
    //   await firebase.login({
    //     email: formValues.email,
    //     password: formValues.password,
    //   });

    //   return await firebase
    //     .getUser({ userId: user.username })
    //     .then(snapshot => {
    //       navigate('/dashboard', { state: { userProfile: snapshot.data() } });
    //     });
    // } catch (error) {
    //   if (isMounted) {
    //     setErrorMessage(error.message);
    //   }
    // }

    // firebase
    //   .login({ email: formValues.email, password: formValues.password })
    //   .then(UserCredentials => {
    //     console.dir(UserCredentials);
    //     const userProfile = firebase
    //       .getUser({ userId: user.username })
    //       .then(snapshot => {
    //         navigate('/dashboard', { state: { userProfile: snapshot.data() } });
    //       });
    //     return userProfile;
    //   })
    //   .catch(error => {
    //     if (isMounted) {
    //       setErrorMessage(error.message);
    //     }
    //   });
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
    <div className="form-layout-container">
      <SEO
        title="Log In"
        description="Log in to your Unhoused Portal to track donations, real time family updates, and donation metrics."
      />
      <div className="form-layout">
        <div className="form-header">
          <h1>Sign in to Unhoused Dashboard</h1>
          <p>See the newest clients and track the donations you make.</p>
        </div>
        <div className="form-container">
          <div />
          <form onSubmit={handleSubmit} className="form-component">
            <div className="form-input-row">
              <label htmlFor="email">Email Address</label>
              <input
                name="email"
                type="email"
                onChange={handleInputChange}
                value={formValues.email}
                required
              />
            </div>
            <div className="form-input-row">
              <label htmlFor="password">Password</label>
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
              <ButtonSubmit value="Sign In" />
              <div />
            </div>
            {!!errorMessage && (
              <div className="error-message">ERROR: {errorMessage}</div>
            )}
            <div className="form-description-row">
              <p>
                Don't have an account?{' '}
                <Link to="/signUp">
                  <span className="form-description-link">Signup</span>
                </Link>
              </p>
              <p>
                Forgot your password?{' '}
                <Link to="/forgotPassword">
                  <span className="form-description-link">Reset password</span>
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

export default LoginPage;
