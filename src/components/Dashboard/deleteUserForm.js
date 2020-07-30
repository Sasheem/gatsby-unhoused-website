import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import { navigate } from 'gatsby';

import { FirebaseContext } from '../Firebase';
import ButtonSubmit from '../common/Button/buttonSubmit';

import '../../styles/global.scss';
import './dashboard.scss';

const DeleteUserForm = ({ username, customerId, email }) => {
  const { firebase = null } = useContext(FirebaseContext) || {};
  const [errorMessage, setErrorMessage] = useState('');
  const [isProcessing, setProcessingTo] = useState(false);

  function handleInputChange(ev) {
    ev.preventDefault();
    setErrorMessage('');
  }

  function deleteUser(ev) {
    ev.preventDefault();
    if (ev.target.delete.value === 'DELETE') {
      setProcessingTo(true);
      console.log(`username: ${username}`);
      if (firebase) {
        firebase
          .deleteUser({ username, customerId, email })
          .then(result => {
            console.log(`result: ${typeof result}`);
            console.dir(result);
            console.log(`successfully deleted`);
            setProcessingTo(false);
            navigate('/');
          })
          .catch(error => {
            setProcessingTo(false);
            setErrorMessage(`deleteUser frontend: ${error.message}`);
          });
      }
    } else {
      setErrorMessage('You must type the word DELETE (in all caps)');
    }
  }

  return (
    <form className="form-component" onSubmit={deleteUser}>
      <h3>Delete your account</h3>
      <div className="form-input-row">
        <label htmlFor="delete">Type DELETE to confirm</label>
        <input type="text" name="delete" onChange={handleInputChange} />
      </div>
      <div className="form-submit-row-left">
        <button className="option-delete">
          {isProcessing ? 'Processing...' : 'Delete Account'}
        </button>
        <div />
      </div>
      {!!errorMessage && (
        <div className="error-message">ERROR: {errorMessage}</div>
      )}
    </form>
  );
};

export default DeleteUserForm;
