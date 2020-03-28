import React, { useState } from 'react';

import { Button } from '../common';

import '../../styles/global.scss';

/**
 * todo add stripe functionality
 * todo save secure connection to payment info in firebase
 */

const PaymentForm = () => {
  const [formValues, setFormValues] = useState({
    card: '',
    exp: '',
    cvv: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
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
    <div className="form-layout-settings">
      <form className="form-component" onSubmit={handleSubmit}>
        <h4>Update your payment on file</h4>
        <div className="three-input-row">
          <div className="form-input-row">
            <label for="card">Card Number</label>
            <input
              type="number"
              name="card"
              onChange={handleInputChange}
              value={formValues.card}
              required
            />
          </div>
          <div className="form-input-row">
            <label for="exp">Expiration date</label>
            <input
              type="number"
              name="exp"
              onChange={handleInputChange}
              value={formValues.exp}
              required
            />
          </div>
          <div className="form-input-row">
            <label for="cvv">CVV</label>
            <input
              type="number"
              name="cvv"
              onChange={handleInputChange}
              value={formValues.cvv}
              required
            />
          </div>
        </div>
        <div className="form-submit-row-left">
          <Button type="submit" block submit>
            Save
          </Button>
          <div />
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
