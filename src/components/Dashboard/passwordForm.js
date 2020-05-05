import React, { useState } from 'react';

import ButtonSubmit from '../common/Button/buttonSubmit';

import '../../styles/global.scss';

const PasswordForm = () => {
  const [formValues, setFormValues] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
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
    <form className="dashboard-item" onSubmit={handleSubmit}>
      <h3>Update Password</h3>
      <div className="form-input-row">
        <label for="newPassword">New password</label>
        <input
          type="password"
          name="newPassword"
          onChange={handleInputChange}
          value={formValues.newPassword}
          required
          minLength={6}
        />
      </div>
      <div className="form-input-row">
        <label for="confirmPassword">Confirm new password</label>
        <input
          type="password"
          name="confirmPassword"
          onChange={handleInputChange}
          value={formValues.confirmPassword}
          required
          minLength={6}
        />
      </div>
      <div className="form-submit-row-left">
        <ButtonSubmit
          value={isProcessing ? 'Processing...' : 'Add Partner'}
          disabled={isProcessing}
        />
        <div />
      </div>
    </form>
  );
};

export default PasswordForm;
