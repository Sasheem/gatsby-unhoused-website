import React, { useState, useContext, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Link, navigate } from 'gatsby';
import styled from 'styled-components';

import { FirebaseContext } from '../components/Firebase';
import SEO from '../components/seo';
import { Button, ErrorMessage, FormSection } from '../components/common';

import '../styles/global.scss';

/**
 * todo Backend: navigate to stripe form for checkout
 * todo Frontend: form validation
 * todo Frontend: add register components inside donation form
 * todo Frontend: create and link to contactGeneral page
 */
let stripePromise;
const loadStripePromise = async () => {
  stripePromise = await loadStripe('pk_test_kfC9Tjzf7w4Ko5nUH8AycCMe');
};
loadStripePromise();

const CardElementContainer = styled.div`
  height: 2.5em;
  display: flex;
  align-items: center;
  border: 1px solid rgba(23, 23, 23, 0.2);
  border-radius: 3px;

  & .StripeElement {
    width: 100%;
    padding: 15px;
  }
`;

const ContactDonate = () => {
  const { firebase = null, user } = useContext(FirebaseContext) || {};
  const [clients, setClients] = useState([]);
  const [isProcessing, setProcessingTo] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [registerDonor, setRegisterDonor] = useState(false);
  const [isSavingCard, setIsSavingCard] = useState(false);
  let isMounted = true;

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    return () => {
      isMounted = false;
    };
  }, []);

  // fetch clients to be featured
  useEffect(() => {
    if (firebase) {
      firebase.getClients().then(snapshot => {
        if (isMounted) {
          const featuredClients = [];
          snapshot.forEach(doc => {
            if (doc.data().status === 'Unhoused') {
              featuredClients.push({
                id: doc.id,
                ...doc.data(),
              });
            }
          });
          setClients(featuredClients);
        }
      });
    }
  }, [firebase]);

  const handleFormSubmit = async ev => {
    ev.preventDefault();
    console.log('form submit pressed');
    const {
      name,
      email,
      address,
      city,
      state,
      zip,
      amount,
      client,
      message,
      username,
      password,
      confirmPassword,
    } = ev.target;
    const billingDetails = {
      name: name.value,
      email: email.value,
      address: {
        city: city.value,
        line1: address.value,
        state: state.value,
        postal_code: zip.value,
      },
    };
    let clientSecretVariable = '';
    let stripeAmount = 100 * parseInt(amount.value);

    setProcessingTo(true);

    if (registerDonor) {
      if (password.value === confirmPassword.value) {
        await firebase
          .register({
            username: username.value,
            email: email.value,
            password: password.value,
            name: name.value,
          })
          .then(result => {
            console.log(`user registered`);
            console.dir(result);
          })
          .catch(error => {
            if (isMounted) {
              setErrorMessage(error.message);
            }
          });
      } else {
        setErrorMessage('Error: Passwords do not match');
        return;
      }
    }

    // create a payment intent via firebase function
    // that will call a cloud function on backend
    // client_secret is returned from payment intent
    if (firebase) {
      if (user) {
        await firebase
          .createAuthPaymentIntent({
            amount: stripeAmount,
            currency: 'usd',
            email: email.value,
            name: name.value,
            username: user.username,
          })
          .then(clientSecret => {
            clientSecretVariable = clientSecret.data;
          })
          .catch(error => {
            setProcessingTo(false);
            setErrorMessage(error.message);
          });
      } else {
        await firebase
          .createPaymentIntent({
            amount: stripeAmount,
            currency: 'usd',
            email: email.value,
            name: name.value,
          })
          .then(clientSecret => {
            clientSecretVariable = clientSecret.data;
          })
          .catch(error => {
            setProcessingTo(false);
            setErrorMessage(error.message);
          });
      }
    }

    // create a payment method
    // need access to stripe.js
    // need a reference to CardElement
    const cardElement = elements.getElement(CardElement);

    const paymentMethodRequest = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: billingDetails,
    });

    console.log(`paymentMethodRequest: ${paymentMethodRequest}`);
    console.dir(paymentMethodRequest);

    // confirm card payment
    // combine payment method id + client_secret
    const confirmCardPayment = await stripe.confirmCardPayment(
      clientSecretVariable,
      {
        payment_method: paymentMethodRequest.paymentMethod.id,
        setup_future_usage: isSavingCard ? 'off_session' : '',
      }
    );

    if (confirmCardPayment.error) {
      setErrorMessage(confirmCardPayment.error.message);
      setProcessingTo(false);
      return;
    } else {
      console.log(`confirmCardPayment: ${confirmCardPayment}`);
      console.dir(confirmCardPayment);
      setProcessingTo(false);
      navigate('/successDonation');
    }
  };

  // TIP
  // use the cardElements onChange prop to add a handler
  // for setting any errors:

  const handleCardDetailsChange = ev => {
    ev.error ? setErrorMessage(ev.error.message) : setErrorMessage();
  };

  const handleRegisterDonorSwitch = () => {
    setRegisterDonor(!registerDonor);
  };

  const handleSavingCardSwitch = () => {
    setIsSavingCard(!isSavingCard);
  };

  // provide styling to stripe card element
  const cardElementOptions = {
    // a way to inject styles into that iframe
    // represent states of CardElement
    style: {
      base: {
        fontSize: `16px`,
      },
      invalid: {
        // set invalid colors for font
      },
      complete: {},
    },
    hidePostalCode: true,
  };

  return (
    <FormSection>
      <SEO title="Unhoused Humanity donation form" />
      <Elements stripe={stripePromise}>
        <div className="form-layout">
          <div className="form-header">
            <h1>Donate to Unhoused Humanity</h1>
            <p>Everyone deserves a roof over their head.</p>
          </div>
          <div className="form-container">
            <div />
            <form onSubmit={handleFormSubmit} className="form-component">
              <h3>Client Information</h3>
              <div className="form-input-row">
                <label for="amount">Amount</label>
                <select name="amount" id="donation-select" required>
                  <option value="">--Choose donation amount--</option>
                  <option value="10">$10</option>
                  <option value="25">$25</option>
                  <option value="50">$50</option>
                  <option value="100">$100</option>
                </select>
              </div>
              <div className="form-input-row">
                <label for="client">Clients</label>
                <select name="client" id="client-select" required>
                  <option value="">--Choose a client to fund--</option>
                  {!!clients &&
                    clients.map(client => (
                      <option key={client.id} value={client.firstName}>
                        {client.firstName}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-input-row">
                <label for="message">Message to client</label>
                <textarea id="message" name="message" />
              </div>
              <h3>Billing Information</h3>
              <div className="form-input-row">
                <label htmlFor="name">Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="Jane Doe"
                  required
                />
              </div>
              <div className="form-input-row">
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="jane.doe@example.com"
                  required
                />
              </div>
              <div className="form-input-row">
                <label htmlFor="address">Address</label>
                <input
                  name="address"
                  type="text"
                  placeholder="185 Berry St. Suite 550"
                  required
                />
              </div>
              <div className="form-input-row">
                <label htmlFor="city">City</label>
                <input
                  name="city"
                  type="text"
                  placeholder="San Francisco"
                  required
                />
              </div>
              <div className="form-input-row">
                <label htmlFor="state">State</label>
                <input
                  name="state"
                  type="text"
                  placeholder="California"
                  required
                />
              </div>
              <div className="form-input-row">
                <label htmlFor="zip">ZIP</label>
                <input name="zip" type="text" placeholder="94103" required />
              </div>
              <div className="form-input-row">
                <label for="switch-help">
                  Create Unhoused Humanity Account
                </label>
                <label class="switch-help">
                  <input
                    type="checkbox"
                    name="switch-help"
                    id="switch-help"
                    checked={registerDonor}
                    onChange={handleRegisterDonorSwitch}
                    disabled={user ? true : false}
                  />
                  <span className="slider-help" />
                </label>
              </div>
              {registerDonor ? (
                <div className="form-client-container">
                  <div className="form-input-row">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      name="username"
                      required={registerDonor ? true : false}
                    />
                  </div>
                  <div className="form-input-row">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      required={registerDonor ? true : false}
                      minLength={6}
                    />
                  </div>
                  <div className="form-input-row">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      required={registerDonor ? true : false}
                      minLength={6}
                    />
                  </div>
                </div>
              ) : null}
              <div className="form-input-row">
                <label htmlFor="card-element">Credit Card</label>
                <CardElementContainer>
                  <CardElement
                    options={cardElementOptions}
                    onChange={handleCardDetailsChange}
                    name="card-element"
                  />
                </CardElementContainer>
              </div>
              <div className="form-input-row">
                <label htmlFor="saving-card">Save card for future use?</label>
                <label class="switch-help">
                  <input
                    type="checkbox"
                    name="saving-card"
                    checked={isSavingCard}
                    onChange={handleSavingCardSwitch}
                  />
                  <span className="slider-help" />
                </label>
              </div>
              <div className="form-submit-row">
                <div />
                <Button
                  type="submit"
                  disabled={isProcessing || !stripe}
                  block
                  submit
                >
                  {isProcessing ? 'Processing...' : 'Donate'}
                </Button>
                <div />
              </div>
              {!!errorMessage && (
                <div className="error-message">ERROR: {errorMessage}</div>
              )}
              <div className="form-description-row">
                <p>
                  Need help making a donation?{' '}
                  <Link to="/contact">
                    <span className="form-description-link">Contact Us</span>
                  </Link>
                </p>
              </div>
            </form>
            <div />
          </div>
        </Elements>
      </div>
    </FormSection>
  );
};

export default ContactDonate;
