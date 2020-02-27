import React, { useState, useContext, useEffect } from 'react';
import { FirebaseContext } from '../components/Firebase';
import { Form, Input, Button } from '../components/common';

import '../styles/global.scss';

/**
 * todo fix error
 * ! Unhandled error RangeError: Maximum call stack size exceeded
 */
const AddDonation = () => {
  const { firebase } = useContext(FirebaseContext);
  const [clients, setClients] = useState([]);
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    // email: '',
    donation: '',
    message: '',
    clientId: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccessDonation] = useState(false);
  let isMounted = true;

  useEffect(() => {
    return () => {
      isMounted = false;
    };
  }, []);

  // applying this form of useEffect ensures
  // it only runs once when the component mounts
  // useEffect(() => {}, []);
  useEffect(() => {
    // query all available clients
    if (firebase) {
      firebase.getClients().then(snapshot => {
        if (isMounted) {
          const availableClients = [];
          snapshot.forEach(doc => {
            availableClients.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          // set select value to be the first client
          setFormValues(currentValues => ({
            ...currentValues,
            clientId: availableClients[0].id,
          }));
          setClients(availableClients);
        }
      });
    }
    // useEffect will rerun when 'firebase' changes
    // thus being true when above if stmt runs
  }, [firebase]);
  console.log(clients);

  function handleSubmit(event) {
    event.preventDefault();
    const {
      firstName,
      lastName,
      // email,
      clientId,
      donation,
      message,
    } = formValues;

    // make firebase cloud function call
    firebase
      .createDonationRecord({
        firstName,
        lastName,
        // email,
        clientId,
        donation,
        message,
      })
      .then(() => {
        if (isMounted) {
          setFormValues({
            firstName: '',
            lastName: '',
            // email: '',
            donation: '',
            message: '',
            clientId: '',
          });
          setSuccessDonation(true);
        }
      })
      .catch(error => {
        setErrorMessage(error.message);
      });
  }

  function handleInputChange(event) {
    event.persist();
    setSuccessDonation(false);
    setFormValues(currentValues => ({
      ...currentValues,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div className="form-field">
        <label for="firstName">First name</label>
        <Input
          type="text"
          onChange={handleInputChange}
          value={formValues.firstName}
          name="firstName"
          placeholder="Donor first name"
        />
      </div>
      <div className="form-field">
        <label for="lastName">Last name</label>
        <Input
          type="text"
          onChange={handleInputChange}
          value={formValues.lastName}
          name="lastName"
          placeholder="Donor last name"
        />
      </div>
      {/* <div className="form-field">
        <label for="email">Email address</label>
        <Input
          type="email"
          onChange={handleInputChange}
          value={formValues.email}
          name="email"
          placeholder="Donor email"
        />
      </div> */}
      <div className="form-field">
        <label for="clientId">Clients</label>
        <select
          onChange={handleInputChange}
          value={formValues.clientId}
          name="clientId"
        >
          {clients.map(client => (
            <option key={client.id} value={client.id}>
              {client.firstName}
            </option>
          ))}
        </select>
      </div>
      <div className="form-field">
        <label for="donation">Donation amount</label>
        <Input
          type="text"
          onChange={handleInputChange}
          value={formValues.donation}
          name="donation"
          placeholder="$0.00"
        />
      </div>
      <div className="form-field">
        <label for="message">Message</label>
        <Input
          type="text"
          onChange={handleInputChange}
          value={formValues.message}
          name="message"
          placeholder="Message to the client"
        />
      </div>
      <Button type="submit" block>
        Add donor
      </Button>
      {!!success && (
        <div className="success-message">Donation successfully added!</div>
      )}
      {!!errorMessage && (
        <div className="error-message">ERROR: {errorMessage}</div>
      )}
    </Form>
  );
};

export default AddDonation;