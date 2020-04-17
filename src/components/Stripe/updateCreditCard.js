import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import styled from 'styled-components';

import { Button } from '../common';

import '../../styles/global.scss';

/**
 * todo render saved payment methods
 * todo add option to delete payment record on file
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

const UpdateCreditCard = props => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setProcessingTo] = useState(false);

  const handleSubmit = async event => {
    // Block native form submission.
    event.preventDefault();
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
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }
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
      <div className="form-input-row">
        <label htmlFor="card-element">Credit Card</label>
        <CardElementContainer>
          <CardElement options={cardElementOptions} name="card-element" />
        </CardElementContainer>
      </div>
      <div className="form-submit-row-left">
        <Button
          type="submit"
          // disabled={!stripe}
          disabled={isProcessing || !stripe}
          block
          submit
        >
          Save
        </Button>
        <div />
      </div>
    </form>
  );
};

export default UpdateCreditCard;
