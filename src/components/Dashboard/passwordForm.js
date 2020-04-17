import React, { useState } from 'react';

import { Button } from '../common';

import '../../styles/global.scss';

const PasswordForm = () => {
  const [formValues, setFormValues] = useState({
    newPassword: '',
    confirmPassword: '',
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
    <form className="form-component" onSubmit={handleSubmit}>
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
        <Button type="submit" block submit>
          Save
        </Button>
        <div />
      </div>
    </form>
  );
};

export default PasswordForm;
