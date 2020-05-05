import React, { useState, useEffect, useContext, useRef } from 'react';

import { FirebaseContext } from '../Firebase';
import ButtonSubmit from '../common/Button/buttonSubmit';

import './dashboard.scss';

const AdminAddPartner = () => {
  const { firebase = null } = useContext(FirebaseContext) || {};
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    website: '',
  });
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isProcessing, setProcessingTo] = useState(false);

  // handle all other input changes
  function handleInputChange(event) {
    event.persist();
    setSuccess(false);
    setFormValues(currentValues => ({
      ...currentValues,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const { name, email, website } = formValues;
    let imagePath = '';

    setProcessingTo(true);
    if (image !== null) {
      const result = await firebase.uploadPartnerImage({
        fileObject: image,
        name,
      });
      imagePath = result.metadata.fullPath;
    }

    await firebase
      .createPartner({
        name,
        email,
        website,
        imagePath,
      })
      .then(() => {
        setSuccess(true);
        setFormValues({
          name: '',
          email: '',
          website: '',
        });
        setImage(null);
      })
      .catch(error => {
        setErrorMessage(`error adding partner: ${error.message}`);
        setSuccess(false);
      });

    setProcessingTo(false);
  }

  return (
    <div className="dashboard-item">
      <form onSubmit={handleSubmit} className="form-component">
        <h3>Add a partner</h3>
        <div className="form-input-row">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            onChange={handleInputChange}
            value={formValues.name}
            name="name"
            required
          />
        </div>
        <div className="form-input-row">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            onChange={handleInputChange}
            value={formValues.email}
            name="email"
          />
        </div>
        <div className="form-input-row">
          <label htmlFor="website">Website URL</label>
          <input
            type="url"
            onChange={handleInputChange}
            value={formValues.website}
            name="website"
            required
          />
        </div>
        <div className="form-input-row">
          <label htmlFor="image">Logo</label>
          <input
            type="file"
            onChange={e => {
              e.persist();
              setImage(e.target.files[0]);
            }}
            name="image"
          />
        </div>
        <div className="form-submit-row">
          <div />
          <ButtonSubmit
            value={isProcessing ? 'Processing...' : 'Add Partner'}
            disabled={isProcessing}
          />
          <div />
        </div>
        {!!success && (
          <div className="success-message">Partner successfully created</div>
        )}
        {!!errorMessage && (
          <div className="error-message">ERROR: {errorMessage}</div>
        )}
      </form>
    </div>
  );
};

export default AdminAddPartner;
