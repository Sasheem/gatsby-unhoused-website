import React, { useState, useContext, useRef } from 'react';

import { FirebaseContext } from '../Firebase';
import ButtonSubmit from '../common/Button/buttonSubmit';

import '../../styles/global.scss';

const PasswordForm = () => {
  const { firebase = null, user } = useContext(FirebaseContext) || {};
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const formRef = useRef();

  function handleSubmit(ev) {
    ev.preventDefault();
    const { newPassword, confirmPassword } = ev.target;
    if (firebase) {
      if (newPassword.value === confirmPassword.value) {
        setIsProcessing(true);
        firebase
          .updateAuthUserPassword({ password: newPassword.value })
          .then(result => {
            console.dir(result);
            setIsProcessing(false);
            setSuccessMessage('Successfully updated password');
            formRef.current.reset();
          })
          .catch(error => {
            setIsProcessing(false);
            setErrorMessage(`updateUser frontend: ${error.message}`);
          });
      } else {
        setErrorMessage(`Passwords must match`);
      }
    }
  }

  return (
    <form className="dashboard-item" onSubmit={handleSubmit} ref={formRef}>
      <h3>Update Password</h3>
      <div className="form-input-row">
        <label htmlFor="newPassword">New password</label>
        <input type="password" name="newPassword" required minLength={6} />
      </div>
      <div className="form-input-row">
        <label htmlFor="confirmPassword">Confirm new password</label>
        <input type="password" name="confirmPassword" required minLength={6} />
      </div>
      <div className="form-submit-row-left">
        <ButtonSubmit
          value={isProcessing ? 'Processing...' : 'Save'}
          disabled={isProcessing}
        />
        <div />
      </div>
      {!!successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {!!errorMessage && <div className="error-message">{errorMessage}</div>}
    </form>
  );
};

export default PasswordForm;
