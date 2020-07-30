import React, { useState, useContext, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Link, navigate } from 'gatsby';
import styled from 'styled-components';
import Modal from 'react-modal';

import { FirebaseContext } from '../components/Firebase';
import SEO from '../components/seo';
import { Button, FormSection } from '../components/common';
import PreviewDonation from '../components/Donations/previewDonation';

import '../styles/global.scss';

/**
 * todo Frontend: handle cases if user backs from modal view
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

const customStyles = {
  content: {
    top: '53%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: '600px',
    overflow: 'scroll',
  },
};

// Bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#___gatsby');

const ContactDonate = ({ location }) => {
  const { firebase = null, user } = useContext(FirebaseContext) || {};
  const [formValues, setFormValues] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    line1: '',
    city: '',
    state: '',
    zip: '',
    amount: '',
    client: '',
    message: '',
  });
  const [clients, setClients] = useState([]);
  const [isProcessing, setProcessingTo] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [registerDonor, setRegisterDonor] = useState(false);
  const [isSavingCard, setIsSavingCard] = useState(false);
  const [fullyFund, setFullyFund] = useState(null);
  const [clientSelected, setClientSelected] = useState(null);
  const [clientData, setClientData] = useState(null);
  const [donationAmount, setDonationAmount] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);
  const [statePaymentMethod, setStatePaymentMethod] = useState(null);

  let isMounted = true;

  var subtitle;
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = 'black';
  }
  function closeModal() {
    setModalIsOpen(false);
  }

  const stripe = useStripe();
  const elements = useElements();

  // fetch clients to be featured
  useEffect(() => {
    if (firebase) {
      firebase.getClients().then(snapshot => {
        if (isMounted) {
          const featuredClients = [];
          snapshot.forEach(doc => {
            if (doc.data().status === 'Funding') {
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

    return () => {
      isMounted = false;
    };
  }, [firebase]);

  // grab the client data from firebase whenever client selection occurs
  useEffect(() => {
    if (clientSelected !== null) {
      firebase.getClient({ clientId: clientSelected }).then(result => {
        setClientData(result.data());
      });
    } else if (location.state.hasOwnProperty(`clientId`)) {
      firebase.getClient({ clientId: location.state.clientId }).then(result => {
        setClientData(result.data());
      });
    }
  }, [clientSelected, location]);

  // fetch and supply the users saved payments
  useEffect(() => {
    if (firebase && location && location.state.userProfile) {
      try {
        firebase
          .listPaymentMethods({
            customerId: location.state.userProfile.customerId,
          })
          .then(result => {
            setWallet(result.data.data);
          });
      } catch (error) {
        console.log(`error fetching payment intents: ${error.message}`);
      }
    }
  }, [user]);

  /**
   * * 1 create payment method with stripe
   * * 2 show modal with form data + payment method
   * * 3 pass in necessary functions to submit payment to modal
   */
  const handleFormSubmit = async ev => {
    ev.preventDefault();
    const {
      name,
      email,
      line1,
      line2,
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

    if (formValues.password !== formValues.confirmPassword) {
      setErrorMessage('Error: Passwords do not match');
      return;
    }

    setProcessingTo(true);

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    if (selectedPayment === '') {
      const billingDetails = {
        name: name.value,
        email: email.value,
        address: {
          city: city.value,
          line1: line1.value,
          line2: line2.value === '' ? '' : line2.value,
          state: state.value,
          postal_code: zip.value,
        },
      };

      // Get a reference to a mounted CardElement. Elements knows how
      // to find your CardElement because there can only ever be one of
      // each type of element.
      const cardElement = elements.getElement(CardElement);

      console.log(`contactDonate handle submit running`);
      // create a payment intent via firebase function
      // that will call a cloud function on backend

      // Use your card Element with other Stripe.js APIs
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: billingDetails,
      });

      console.dir(paymentMethod);
      setStatePaymentMethod(paymentMethod);
      console.log(`running guest paymentIntent creation`);

      if (error) {
        setErrorMessage(`createPaymentMethod: ${error.message}`);
        return;
      }
    }

    setProcessingTo(false);
    // show modal here
    openModal();
  };

  // TIP
  // use the cardElements onChange prop to add a handler
  // for setting any errors:

  const handleCardDetailsChange = ev => {
    ev.error ? setErrorMessage(ev.error.message) : setErrorMessage('');
  };

  const handlePaymentChange = ev => {
    setSelectedPayment(ev.target.value);
    if (wallet !== null) {
      wallet.map(card => {
        if (card.id === ev.target.value) {
          setSelectedCard(card);
        }
      });
    }
  };

  const handleRegisterDonorSwitch = () => {
    setRegisterDonor(!registerDonor);
  };

  const handleSavingCardSwitch = () => {
    setIsSavingCard(!isSavingCard);
  };

  const handleClientChange = ev => {
    handleClientSet(ev.target.value);
  };

  const handleAmountChange = ev => {
    setDonationAmount(ev.target.value);
  };

  const handleClientSet = clientId => {
    calculateFullyFundAmount(clientId);
    setClientSelected(clientId);
  };

  // handle all other input changes
  const handleInputChange = event => {
    event.persist();
    setFormValues(currentValues => ({
      ...currentValues,
      [event.target.name]: event.target.value,
    }));
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
    disabled: selectedPayment === '' ? false : true,
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
              <label htmlFor="client">Clients</label>
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
                      defaultValue={
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
              <label htmlFor="amount">Amount</label>
              <select
                name="amount"
                id="donation-select"
                onChange={handleAmountChange}
                required
              >
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
              <label htmlFor="message">Message to client</label>
              <textarea
                id="message"
                name="message"
                onChange={handleInputChange}
                value={formValues.message}
              />
            </div>
            <h3>Billing Information</h3>
            <div className="form-input-row">
              <label htmlFor="card-element">Credit Card</label>
              {wallet && wallet.length !== 0 && (
                <select name="paymentMethod" onChange={handlePaymentChange}>
                  <option value="">--Choose a card on file--</option>
                  {wallet.map(card => (
                    <option value={card.id}>**** {card.card.last4}</option>
                  ))}
                </select>
              )}
              {wallet && wallet.length !== 0 && selectedPayment === '' && (
                <span style={{ textAlign: `center`, margin: `0.5em 0` }}>
                  <p>Or enter a new card</p>
                </span>
              )}
              {selectedPayment === '' && (
                <CardElementContainer>
                  <CardElement
                    options={cardElementOptions}
                    onChange={handleCardDetailsChange}
                    name="card-element"
                  />
                </CardElementContainer>
              )}
            </div>
            {(user || registerDonor) && selectedPayment === '' && (
              <div className="form-input-row">
                <label htmlFor="saving-card">Save card for future use?</label>
                <label className="switch-help">
                  <input
                    type="checkbox"
                    name="saving-card"
                    checked={isSavingCard}
                    onChange={handleSavingCardSwitch}
                    disabled={selectedPayment !== '' ? true : false}
                  />
                  <span className="slider-help" />
                </label>
              </div>
            )}
            {selectedPayment === '' && (
              <>
                <div className="form-input-row">
                  <label htmlFor="name">Name</label>
                  <input
                    name="name"
                    type="text"
                    onChange={handleInputChange}
                    value={formValues.name}
                    placeholder="Jane Doe"
                    required={selectedPayment === '' ? true : false}
                  />
                </div>
                <div className="form-input-row">
                  <label htmlFor="email">Email</label>
                  <input
                    name="email"
                    type="email"
                    onChange={handleInputChange}
                    value={formValues.email}
                    placeholder="jane.doe@example.com"
                    required={selectedPayment === '' ? true : false}
                  />
                </div>
                <div className="form-input-row">
                  <label htmlFor="line1">Address Line 1</label>
                  <input
                    name="line1"
                    type="text"
                    onChange={handleInputChange}
                    value={formValues.line1}
                    placeholder="185 Berry St. Suite 550"
                    required={selectedPayment !== '' ? true : false}
                  />
                </div>
                <div className="form-input-row">
                  <label htmlFor="address2">Address Line 2</label>
                  <input
                    name="line2"
                    type="text"
                    onChange={handleInputChange}
                    value={formValues.line2}
                    placeholder="Apartment/Suite/etc"
                  />
                </div>
                <div className="form-input-row">
                  <label htmlFor="city">City</label>
                  <input
                    name="city"
                    type="text"
                    onChange={handleInputChange}
                    value={formValues.city}
                    placeholder="San Francisco"
                    required={selectedPayment === '' ? true : false}
                  />
                </div>
                <div className="form-input-row">
                  <label htmlFor="state">State</label>
                  <input
                    name="state"
                    type="text"
                    placeholder="California"
                    onChange={handleInputChange}
                    value={formValues.state}
                    required={selectedPayment === '' ? true : false}
                  />
                </div>
                <div className="form-input-row">
                  <label htmlFor="zip">ZIP</label>
                  <input
                    name="zip"
                    type="text"
                    placeholder="94103"
                    onChange={handleInputChange}
                    value={formValues.zip}
                    required={selectedPayment === '' ? true : false}
                  />
                </div>
              </>
            )}
            {!user && (
              <div className="form-input-row">
                <label htmlFor="switch-help">
                  Create Unhoused Humanity Account
                </label>
                <label className="switch-help">
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
            )}
            {registerDonor ? (
              <div className="form-client-container">
                <div className="form-input-row">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    onChange={handleInputChange}
                    value={formValues.username}
                    required={registerDonor ? true : false}
                  />
                </div>
                <div className="form-input-row">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleInputChange}
                    value={formValues.password}
                    required={registerDonor ? true : false}
                    minLength={6}
                  />
                </div>
                <div className="form-input-row">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    onChange={handleInputChange}
                    value={formValues.confirmPassword}
                    required={registerDonor ? true : false}
                    minLength={6}
                  />
                </div>
              </div>
            ) : null}
            <div className="form-submit-row">
              <div />
              <Button
                type="submit"
                disabled={isProcessing || !stripe}
                block
                submit
              >
                Donate
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
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Preview Donation"
        >
          <h4 ref={_subtitle => (subtitle = _subtitle)}>
            Donation:{' '}
            {clientData && clientData.firstName ? clientData.firstName : ''}
          </h4>
          <PreviewDonation
            firebase={firebase}
            user={user}
            closeModal={closeModal}
            formValues={formValues}
            paymentMethod={statePaymentMethod}
            selectedPayment={selectedPayment}
            selectedCard={selectedCard}
            clients={clients}
            clientData={clientData}
            clientSelected={clientSelected}
            donationAmount={donationAmount}
            isSavingCard={isSavingCard}
          />
        </Modal>
      </div>
    </div>
  );
};

export default ContactDonate;
