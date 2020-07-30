import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import styled from 'styled-components';

import { Button } from '../common';

import '../../styles/global.scss';

/**
 * todo render saved payment methods
 * todo add option to delete payment record on file
 * todo clear form data upon successful form submit
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

const UpdateCreditCard = ({ firebase, user }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setProcessingTo] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formValues, setFormValues] = useState({
    name: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    zip: '',
  });
  const [userProfile, setUserProfile] = useState(null);
  let isMounted = true;

  useEffect(() => {
    if (firebase && isMounted) {
      firebase.getUser({ userId: user.username }).then(snapshot => {
        setUserProfile(snapshot.data());
      });
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const handleInputChange = ev => {
    ev.persist();
    setErrorMessage('');
    setFormValues(currentValues => ({
      ...currentValues,
      [ev.target.name]: ev.target.value,
    }));
  };

  const handleSubmit = async ev => {
    // Block native form submission.
    ev.preventDefault();
    const { name, line1, line2, city, state, zip } = ev.target;
    const billingDetails = {
      name: name.value,
      address: {
        city: city.value,
        line1: line1.value,
        line2: line2.value,
        state: state.value,
        postal_code: zip.value,
      },
    };
    let clientSecretVariable = '';

    console.log(`setting ProcessingTo true`);
    setProcessingTo(true);

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: billingDetails,
    });

    if (error) {
      console.log(`createPaymentMethod error on frontend: ${error.message}`);
      setErrorMessage(error.message);
    } else {
      if (userProfile !== null) {
        console.dir(userProfile);
        console.dir(paymentMethod);
        var temp = [];

        await firebase
          .createSetupIntent({
            customerId: userProfile.customerId,
            paymentMethodId: paymentMethod.id,
          })
          .then(clientSecret => {
            clientSecretVariable = clientSecret.data;
          });

        // map over all saved cards if cards arr exists on user doc
        // push each one to temp arr if clientSecrets do not match
        if (userProfile.hasOwnProperty('cards')) {
          userProfile.cards.map(card => {
            if (card.paymentMethodId === paymentMethod.id) {
              setErrorMessage('Card already exists');
              return;
            }
            temp.push(card);
          });
        }

        // push new cards onto either an empty temp
        // or a prefilled one with all saved cards
        temp.push({
          paymentMethodId: paymentMethod.id,
          last4: paymentMethod.card.last4,
          expMonth: paymentMethod.card.exp_month,
          expYear: paymentMethod.card.exp_year,
          brand: paymentMethod.card.brand,
          billingDetails: paymentMethod.billing_details,
        });

        await firebase
          .saveSetupIntent({
            username: user.username,
            cards: temp,
          })
          .then(response => {
            console.log(`saveSetupIntent response: ${typeof response}`);
            console.dir(response);
          });
      } else {
        console.log(`userProfile empty`);
      }
    }

    const confirmCardSetup = await stripe.confirmCardSetup(
      clientSecretVariable,
      {
        payment_method: paymentMethod.id,
      }
    );

    if (confirmCardSetup.error) {
      setErrorMessage(confirmCardSetup.error.message);
    } else {
      setFormValues({
        name: '',
        line1: '',
        line2: '',
        city: '',
        state: '',
        zip: '',
      });
      cardElement.clear();
    }
    console.log(`setting processingTo false`);
    setProcessingTo(false);
  };

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
    <form onSubmit={handleSubmit} className="form-component">
      <h3>Add Credit Card</h3>
      <div className="form-input-row">
        <label htmlFor="name">Full Name</label>
        <input
          name="name"
          type="text"
          placeholder="As it appears on card"
          onChange={handleInputChange}
          value={formValues.name}
          required
        />
      </div>
      <div className="form-input-row">
        <label htmlFor="line1">Address Line 1</label>
        <input
          name="line1"
          type="text"
          placeholder="185 Berry St. Suite 550"
          onChange={handleInputChange}
          value={formValues.line1}
          required
        />
      </div>
      <div className="form-input-row">
        <label htmlFor="line2">Address Line 2</label>
        <input
          name="line2"
          type="text"
          placeholder="Apartment/Suite/etc"
          onChange={handleInputChange}
          value={formValues.line2}
        />
      </div>
      <div className="form-input-row">
        <label htmlFor="city">City</label>
        <input
          name="city"
          type="text"
          placeholder="San Francisco"
          onChange={handleInputChange}
          value={formValues.city}
          required
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
          required
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
          required
        />
      </div>
      <div className="form-input-row">
        <label htmlFor="card-element">Credit Card</label>
        <CardElementContainer>
          <CardElement options={cardElementOptions} name="card-element" />
        </CardElementContainer>
      </div>
      <div className="form-submit-row-left">
        <Button type="submit" disabled={isProcessing || !stripe} block submit>
          {isProcessing ? '...Processing' : 'Save'}
        </Button>
        <div />
      </div>
      {!!errorMessage && (
        <div className="error-message">ERROR: {errorMessage}</div>
      )}
    </form>
  );
};

export default UpdateCreditCard;
