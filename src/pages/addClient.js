import React, { useState, useEffect, useContext } from 'react';
import { Form, Input, Button } from '../components/common';
import { FirebaseContext } from '../components/Firebase';
import DatePicker from 'react-date-picker';

import { HorizontalDivider } from '../components/common';

import '../styles/global.scss';

let fileReader;
if (typeof window !== 'undefined') {
  fileReader = new FileReader();
}

const AddClient = () => {
  const { firebase = null } = useContext(FirebaseContext) || {};
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    goal: 0,
    raised: 0,
    familySize: 0,
    questions: [],
    answers: [],
    situation: '',
    status: '',
    question1:
      'Where did you grow up and what did you like about your home town?',
    question2:
      'Do you have any brothers or sisters? If so, tell us about them.',
    question3:
      'Do you have any goals you would like to achieve in the short term, long term, or both?',
    question4: '',
    question5: '',
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    answer5: '',
  });
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [clientImage, setClientImage] = useState('');
  const [dateFundingBegan, setDateFundingBegan] = useState(new Date());
  const [dateHoused, setDateHoused] = useState(new Date());
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

  function handleFundingDateChange(date) {
    setSuccess(false);
    setDateFundingBegan(date);
  }
  function handleDateHousedChanged(date) {
    setSuccess(false);
    setDateHoused(date);
  }

  return (
    <div className="form-layout-admin">
      <form onSubmit={handleSubmit} className="form-component">
        <h3>Add a client</h3>
        <div className="two-input-row">
          <div className="form-input-row">
            <label for="firstName">First Name</label>
            <input
              type="text"
              onChange={handleInputChange}
              value={formValues.firstName}
              name="firstName"
            />
          </div>
          <div className="form-input-row">
            <label for="lastName">Last Name</label>
            <input
              type="text"
              onChange={handleInputChange}
              value={formValues.lastName}
              name="lastName"
            />
          </div>
        </div>
        <div className="form-input-row">
          <label for="situation">Situation</label>
          <textarea
            type="text"
            onChange={handleInputChange}
            value={formValues.situation}
            name="situation"
          />
        </div>
        <div className="three-even-input-row">
          <div className="form-input-row">
            <label for="goal">Goal</label>
            <input
              type="number"
              onChange={handleInputChange}
              value={formValues.goal}
              name="goal"
              placeholder="Amount between 10 - 1500"
              min="10"
              max="1500"
            />
          </div>
          <div className="form-input-row">
            <label for="raised">Raised</label>
            <input
              type="number"
              onChange={handleInputChange}
              value={formValues.raised}
              name="raised"
              placeholder="Amount between 10 - 1500"
              min="10"
              max="1500"
            />
          </div>
          <div className="form-input-row">
            <label for="familySize">Family Size</label>
            <input
              type="number"
              onChange={handleInputChange}
              value={formValues.familySize}
              name="familySize"
              placeholder="Amount between 1 - 12"
              min="1"
              max="12"
            />
          </div>
        </div>
        <div className="two-input-row">
          <div className="form-input-row">
            <label for="clientImage">Client image</label>
            <input
              onChange={e => {
                e.persist();
                fileReader.readAsDataURL(e.target.files[0]);
              }}
              type="file"
              name="clientImage"
            />
          </div>
          <div className="form-input-row">
            <label for="status">Status</label>
            <select id="status">
              <option value="Unhoused" selected="selected">
                Unhoused
              </option>
              <option value="Housed">Housed</option>
            </select>
          </div>
        </div>
        <div className="two-input-row">
          <div className="form-input-row">
            <label for="dateFundingBegan">Funding Began</label>
            <DatePicker
              name="dateFundingBegan"
              onChange={handleFundingDateChange}
              value={dateFundingBegan}
            />
          </div>
          <div className="form-input-row">
            <label for="dateHoused">Date Housed</label>
            <DatePicker
              name="dateHoused"
              onChange={handleDateHousedChanged}
              value={dateHoused}
            />
          </div>
        </div>
        <h5>
          Enter questions/answers exactly how you want to appear on website.
        </h5>
        <div className="form-input-row">
          <div className="form-input-row">
            <label for="question1">Question 1</label>
            <input
              type="text"
              name="question1"
              onChange={handleInputChange}
              value={formValues.question1}
            />
          </div>
          <div className="form-input-row">
            <label for="answer1">Answer 1</label>
            <input
              type="text"
              name="answer1"
              onChange={handleInputChange}
              value={formValues.answer1}
            />
          </div>
        </div>
        <HorizontalDivider />
        <div className="form-input-row">
          <div className="form-input-row">
            <label for="question2">Question 2</label>
            <input
              type="text"
              name="question2"
              onChange={handleInputChange}
              value={formValues.question2}
            />
          </div>
          <div className="form-input-row">
            <label for="answer2">Answer 2</label>
            <input
              type="text"
              name="answer2"
              onChange={handleInputChange}
              value={formValues.answer2}
            />
          </div>
        </div>
        <HorizontalDivider />
        <div className="form-input-row">
          <div className="form-input-row">
            <label for="question3">Question 3</label>
            <input
              type="text"
              name="question3"
              onChange={handleInputChange}
              value={formValues.question3}
            />
          </div>
          <div className="form-input-row">
            <label for="answer3">Answer 3</label>
            <input
              type="text"
              name="answer3"
              onChange={handleInputChange}
              value={formValues.answer3}
            />
          </div>
        </div>
        <HorizontalDivider />
        <div className="form-input-row">
          <div className="form-input-row">
            <label for="question4">Question 4</label>
            <input
              type="text"
              name="question4"
              onChange={handleInputChange}
              value={formValues.question4}
            />
          </div>
          <div className="form-input-row">
            <label for="answer4">Answer 4</label>
            <input
              type="text"
              name="answer4"
              onChange={handleInputChange}
              value={formValues.answer4}
            />
          </div>
        </div>
        <HorizontalDivider />
        <div className="form-input-row">
          <div className="form-input-row">
            <label for="question5">Question 5</label>
            <input
              type="text"
              name="question5"
              onChange={handleInputChange}
              value={formValues.question5}
            />
          </div>
          <div className="form-input-row">
            <label for="answer5">Answer 5</label>
            <input
              type="text"
              name="answer5"
              onChange={handleInputChange}
              value={formValues.answer5}
            />
          </div>
        </div>
        <HorizontalDivider />
        <div className="form-submit-row">
          <div />
          <Button type="submit" block>
            Add Client
          </Button>
          <div />
        </div>
        {!!success && (
          <div className="success-message">Client successfully created</div>
        )}
        {!!errorMessage && (
          <div className="error-message">ERROR: {errorMessage}</div>
        )}
      </form>
    </div>
  );
};

export default AddClient;
