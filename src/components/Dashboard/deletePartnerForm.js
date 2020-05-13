import React, { useState, useContext } from 'react';

import { FirebaseContext } from '../Firebase';

import '../../styles/global.scss';
import './dashboard.scss';

const DeletePartnerForm = ({ partner, closeModal }) => {
  const { firebase = null } = useContext(FirebaseContext) || {};
  const [errorMessage, setErrorMessage] = useState('');
  const [isProcessing, setProcessingTo] = useState(false);

  function deletePartner(ev) {
    ev.preventDefault();
    if (ev.target.delete.value === 'DELETE') {
      setProcessingTo(true);
      if (firebase) {
        firebase
          .deletePartner({ partnerId: partner.name.replace(/ /g, '-') })
          .then(() => {
            console.log(`successfully deleted`);
            setProcessingTo(false);
            closeModal();
          })
          .catch(error => {
            setErrorMessage(`deletePartner frontend: ${error.message}`);
          });
      }
    } else {
      setErrorMessage('You must type DELETE exactly (all caps)');
    }
  }

  return (
    <form className="form-component" onSubmit={deletePartner}>
      <h3>Delete partner</h3>
      <div className="form-input-row">
        <label htmlFor="delete">Type DELETE to confirm</label>
        <input type="text" name="delete" />
      </div>
      <div className="form-submit-row-left">
        <button className="option-delete">
          {isProcessing ? 'Processing...' : 'Delete Client'}
        </button>
        <div />
      </div>
      {!!errorMessage && (
        <div className="error-message">ERROR: {errorMessage}</div>
      )}
    </form>
  );
};

export default DeletePartnerForm;
