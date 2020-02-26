import React, { useState, useContext } from 'react';
import { Form, Input, Button } from '../components/common';
import { FirebaseContext } from '../components/Firebase';

import '../styles/global.scss';

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
    imageUrl: '',
  });
  const [success, setSuccess] = useState(false);

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
      })
      .then(() => {
        setFormValues({ firstName: '', lastName: '', situation: '' });
        setSuccess(true);
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
      <label for="firstName">First Name</label>
      <Input
        onChange={handleInputChange}
        value={formValues.firstName}
        name="firstName"
        placeholder="Client first name"
      />
      <label for="lastName">Last Name</label>
      <Input
        onChange={handleInputChange}
        value={formValues.lastName}
        name="lastName"
        placeholder="Client last name"
      />
      <label for="situation">Situation</label>
      <Input
        onChange={handleInputChange}
        value={formValues.situation}
        name="situation"
        placeholder="Client situation"
      />
      <label for="goal">Goal</label>
      <Input
        onChange={handleInputChange}
        value={formValues.goal}
        name="goal"
        placeholder="Amount between 10 - 1500"
      />
      <label for="raised">Raised</label>
      <Input
        onChange={handleInputChange}
        value={formValues.raised}
        name="raised"
        placeholder="Amount between 10 - 1500"
      />

      <label for="familySize">Family Size</label>
      <Input
        onChange={handleInputChange}
        value={formValues.familySize}
        name="familySize"
        placeholder="Amount between 1 - 15"
      />
      <Button type="submit" block>
        Add Client
      </Button>
      {!!success && (
        <div className="success-message">Client successfully created</div>
      )}
    </Form>
  );
};

export default AddClient;
