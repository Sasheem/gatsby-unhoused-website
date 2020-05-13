import React, { useState, useContext } from 'react';

import { FirebaseContext } from '../Firebase';
import ButtonSubmit from '../common/Button/buttonSubmit';

import '../../styles/global.scss';
import './dashboard.scss';

const DeleteClientForm = ({ client, closeModal }) => {
  const { firebase = null } = useContext(FirebaseContext) || {};
  const [errorMessage, setErrorMessage] = useState('');
  const [isProcessing, setProcessingTo] = useState(false);
  const { firstName, lastName } = client;

  function deleteClient(ev) {
    ev.preventDefault();
    if (ev.target.delete.value === 'DELETE') {
      setProcessingTo(true);
      if (firebase) {
        firebase
          .deleteClient({ clientId: `${firstName}-${lastName}` })
          .then(() => {
            console.log(`successfully deleted`);
            setProcessingTo(false);
            closeModal();
          })
          .catch(error => {
            isProcessing(false);
            setErrorMessage(`deleteClient frontend: ${error.message}`);
          });
      }
    } else {
      setErrorMessage(`You must type DELETE exactly (all caps)`);
    }
  }

  return (
    <form className="form-component" onSubmit={deleteClient}>
      <h3>Delete client</h3>
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

export default DeleteClientForm;
