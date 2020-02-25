import React, { useState } from 'react';
import { Form, Input, Button } from '../components/common';

const AddClient = () => {
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

  function handleSubmit(event) {
    event.preventDefault();
    // call a firebase function
  }
  function handleInputChange(event) {
    event.persist();
    setFormValues(currentValues => ({
      ...currentValues,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <Form>
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
    </Form>
  );
};

export default AddClient;
