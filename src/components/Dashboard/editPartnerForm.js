import React, { useState, useEffect, useContext } from 'react';
import DatePicker from 'react-date-picker';

import { FirebaseContext } from '../Firebase';
import ButtonSubmit from '../common/Button/buttonSubmit';

import './dashboard.scss';

const EditPartnerForm = ({ partner, closeModal }) => {
  const { firebase = null } = useContext(FirebaseContext) || {};
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    website: '',
  });
  const [partnerImage, setPartnerImage] = useState(null);
  const [isProcessing, setProcessingTo] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  let isMounted = true;

  // handle all other input changes
  function handleInputChange(event) {
    event.persist();
    setSuccess(false);
    setFormValues(currentValues => ({
      ...currentValues,
      [event.target.name]: event.target.value,
    }));
  }

  // handle file change
  function handleFileChange(ev) {
    ev.persist();
    setPartnerImage(ev.target.files[0]);
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    let temp = {};

    setProcessingTo(true);
    // check all values on formValues for any changes
    // set those on temp if they exist
    for (let [key, value] of Object.entries(formValues)) {
      if (partner.hasOwnProperty(key)) {
        if (value.length !== 0 && partner[key] !== value) {
          temp[key] = value;
        }
      } else {
        temp[key] = value;
      }
    }

    if (partnerImage !== null) {
      const result = firebase.uploadPartnerImage({
        fileObject: partnerImage,
        name: partner.name,
      });
      console.dir(result);
      temp['imagePath'] = result.location_.path_;
    }

    if (firebase) {
      firebase
        .updatePartnerFromAdmin({
          partnerId: partner.name.replace(/ /g, '-'),
          updateObject: temp,
        })
        .then(() => {
          if (isMounted) {
            setProcessingTo(false);
            setSuccess(true);
            closeModal();
          }
        })
        .catch(error => {
          setProcessingTo(false);
          setErrorMessage(`error updating client from admin: ${error.message}`);
        });
    }
  }

  return (
    <form className="form-component" onSubmit={handleSubmit}>
      <h3>Edit partner</h3>
      <div className="form-input-row">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          onChange={handleInputChange}
          name="name"
          placeholder={partner.name}
          disabled
        />
      </div>
      <div className="form-input-row">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          onChange={handleInputChange}
          name="email"
          placeholder={partner.email}
        />
      </div>
      <div className="form-input-row">
        <label htmlFor="website">Website</label>
        <input
          type="url"
          onChange={handleInputChange}
          name="website"
          placeholder={partner.website}
        />
      </div>
      <div className="form-input-row">
        <label htmlFor="partnerImage">
          Logo<small>(less than 10MB)</small>
        </label>
        <input type="file" onChange={handleFileChange} name="partnerImage" />
      </div>
      <div className="form-submit-row">
        <div />
        <ButtonSubmit
          value={isProcessing ? 'Processing...' : 'Submit Changes'}
          disabled={isProcessing}
        />
        <div />
      </div>
      {!!success && (
        <div className="success-message">Client successfully updated</div>
      )}
      {!!errorMessage && (
        <div className="error-message">ERROR: {errorMessage}</div>
      )}
    </form>
  );
};

export default EditPartnerForm;
