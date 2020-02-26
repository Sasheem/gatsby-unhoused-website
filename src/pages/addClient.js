import React, { useState, useEffect, useContext } from 'react';
import { Form, Input, Button } from '../components/common';
import { FirebaseContext } from '../components/Firebase';

import '../styles/global.scss';

let fileReader;
if (typeof window !== 'undefined') {
  fileReader = new FileReader();
}

const AddClient = () => {
  const { firebase } = useContext(FirebaseContext);
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    goal: 0,
    raised: 0,
    familySize: 0,
    questions: [],
    answers: [],
    situation: '',
    status: 'Unhoused',
    dateFundingBegan: new Date(),
    dateHoused: new Date(),
  });
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [clientImage, setClientImage] = useState('');
  let isMounted = true;

  useEffect(() => {
    return () => {
      isMounted = false;
    };
  }, []);

  // add event listener to file reader only once
  // when component mounts
  useEffect(() => {
    fileReader.addEventListener('load', () => {
      setClientImage(fileReader.result);
    });
  }, []);

  function handleSubmit(event) {
    const {
      firstName,
      lastName,
      situation,
      goal,
      raised,
      familySize,
    } = formValues;
    event.preventDefault();
    // call a firebase function
    console.dir(formValues);
    firebase
      .createClient({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        situation: situation.trim(),
        clientImage,
      })
      .then(() => {
        if (isMounted) {
          setFormValues({ firstName: '', lastName: '', situation: '' });
          setSuccess(true);
        }
      })
      .catch(error => {
        setErrorMessage(error.message);
      });
  }
  function handleInputChange(event) {
    event.persist();
    setSuccess(false);
    setFormValues(currentValues => ({
      ...currentValues,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div className="form-field">
        <label for="firstName">First Name</label>
        <Input
          type="text"
          onChange={handleInputChange}
          value={formValues.firstName}
          name="firstName"
          placeholder="Client first name"
        />
      </div>
      <div className="form-field">
        <label for="lastName">Last Name</label>
        <Input
          type="text"
          onChange={handleInputChange}
          value={formValues.lastName}
          name="lastName"
          placeholder="Client last name"
        />
      </div>
      <div className="form-field">
        <label for="situation">Situation</label>
        <Input
          type="text"
          onChange={handleInputChange}
          value={formValues.situation}
          name="situation"
          placeholder="Client situation"
        />
      </div>
      <div className="form-field">
        <label for="goal">Goal</label>
        <Input
          onChange={handleInputChange}
          value={formValues.goal}
          name="goal"
          placeholder="Amount between 10 - 1500"
        />
      </div>
      <div className="form-field">
        <label for="raised">Raised</label>
        <Input
          onChange={handleInputChange}
          value={formValues.raised}
          name="raised"
          placeholder="Amount between 10 - 1500"
        />
      </div>
      <div className="form-field">
        <label for="familySize">Family Size</label>
        <Input
          onChange={handleInputChange}
          value={formValues.familySize}
          name="familySize"
          placeholder="Amount between 1 - 15"
        />
      </div>
      <div className="form-field">
        <label for="clientImage">Client image</label>
        <Input
          onChange={e => {
            e.persist();
            fileReader.readAsDataURL(e.target.files[0]);
          }}
          type="file"
          name="clientImage"
        />
      </div>
      <Button type="submit" block>
        Add Client
      </Button>
      {!!success && (
        <div className="success-message">Client successfully created</div>
      )}
      {!!errorMessage && (
        <div className="error-message">ERROR: {errorMessage}</div>
      )}
    </Form>
  );
};

export default AddClient;
