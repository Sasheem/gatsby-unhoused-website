import React, { useState, useContext, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Link, navigate } from 'gatsby';
import styled from 'styled-components';

import { FirebaseContext } from '../components/Firebase';
import SEO from '../components/seo';
import { Button, FormSection } from '../components/common';

import '../styles/global.scss';

/**
 * todo Frontend: break code up into smaller chunks
 */

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

const ContactDonate = ({ location }) => {
  const { firebase = null, user } = useContext(FirebaseContext) || {};
  const [clients, setClients] = useState([]);
  const [isProcessing, setProcessingTo] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [registerDonor, setRegisterDonor] = useState(false);
  const [isSavingCard, setIsSavingCard] = useState(false);
  const [fullyFund, setFullyFund] = useState(null);
  const [clientSelected, setClientSelected] = useState(null);
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
    // check if user navigated from a clientFeaturedCard via its donate button
    // means a client is intended to be donated to
    if (location.state.hasOwnProperty(`clientId`) && clients.length !== 0) {
      handleClientSet(location.state.clientId);
    }
  }, [firebase]);

  const handleFormSubmit = async ev => {
    ev.preventDefault();
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
    let clientSecret = '';
    let paymentIntentId = '';
    let stripeAmount = 100 * parseInt(amount.value);

    setProcessingTo(true);

    // check if user wants to create an account
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
    if (firebase) {
      if (user) {
        // create payment intent on stripe
        await firebase
          .createAuthPaymentIntent({
            amount: stripeAmount,
            currency: 'usd',
            email: email.value,
            name: name.value,
            username: user.username,
          })
          .then(({ data }) => {
            clientSecret = data.clientSecret;
            paymentIntentId = data.paymentIntentId;
            // clientSecretVariable = paymentIntent.clientSecret.data;
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
          .then(({ data }) => {
            clientSecret = data.clientSecret;
            paymentIntentId = data.paymentIntentId;
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

    // confirm card payment
    // combine payment method id + client_secret
    const confirmCardPayment = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethodRequest.paymentMethod.id,
      setup_future_usage: isSavingCard ? 'off_session' : '',
    });

    // post card payment handling
    if (confirmCardPayment.error) {
      setErrorMessage(confirmCardPayment.error.message);
      setProcessingTo(false);
      return;
    } else {
      // success: createDonation and update client
      // two cases: user logged in or guest
      let tempFundedBy = [];

      // map over clients to match to one being funded
      clients.map(clientObj => {
        // if this is the matched client
        if (clientObj.id === client.value) {
          // check if user auth
          if (user) {
            // check for any previous fundedBy
            if (clientObj.fundedBy) {
              clientObj.fundedBy.map(username => {
                tempFundedBy.push(username);
              });
              tempFundedBy.push(user.username);
            }

            firebase.updateClientWithUserDonation({
              amount: parseInt(amount.value),
              fundedBy:
                tempFundedBy.length === 0 ? [user.username] : tempFundedBy,
              clientId: client.value,
              raised: clientObj.raised,
            });
          } else {
            firebase.updateClientWithGuestDonation({
              amount: parseInt(amount.value),
              raised: clientObj.raised,
              clientId: client.value,
            });
          }
        }
      });

      firebase.createDonation({
        amount: parseInt(amount.value),
        clientId: client.value, // refers to a client housed
        paymentIntentId,
        donorEmail: email.value,
        message: message.value,
        username: user ? user.username : '',
      });
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

  const handleClientChange = ev => {
    console.log(`clientChanged to ${ev.target.value}`);
    handleClientSet(ev.target.value);
  };

  const handleClientSet = clientId => {
    console.log(`handleClientSet has ${clientId}`);
    calculateFullyFundAmount(clientId);
    setClientSelected(clientId);
  };

  const calculateFullyFundAmount = clientId => {
    let amount;
    clients.map(client => {
      if (client.id === clientId) {
        amount = (client.goal - client.raised).toString();
        setFullyFund(amount);
        return amount;
      }
    });
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
    <div className="form-layout-container">
      <SEO title="Unhoused Humanity donation form" />
      <div className="form-layout">
        <div className="form-header">
          <h1>Make a Donation</h1>
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
                {clientSelected !== null ? (
                  <option value={fullyFund}>${fullyFund} - FULLY FUND</option>
                ) : location &&
                  location.hasOwnProperty('state') &&
                  location.state.hasOwnProperty('fullyFund') ? (
                  <option value={location.state.fullyFund}>
                    ${location.state.fullyFund} - FULLY FUND
                  </option>
                ) : null}
              </select>
            </div>
            <div className="form-input-row">
              <label for="client">Clients</label>
              <select
                name="client"
                id="client-select"
                onChange={handleClientChange}
                required
              >
                <option value="">--Choose a client to fund--</option>
                {!!clients &&
                  clients.map(client => (
                    <option
                      key={client.id}
                      value={client.id}
                      selected={
                        location &&
                        location.state.clientId ===
                          `${client.firstName}-${client.lastName}`
                          ? true
                          : false
                      }
                    >
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
              <input name="name" type="text" placeholder="Jane Doe" required />
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
              <label for="switch-help">Create Unhoused Humanity Account</label>
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
      </div>
    </div>
  );
};

export default ContactDonate;
