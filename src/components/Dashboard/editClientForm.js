import React, { useState, useEffect, useContext } from 'react';
import DatePicker from 'react-date-picker';
import moment from 'moment';

import { FirebaseContext } from '../Firebase';
import ButtonSubmit from '../common/Button/buttonSubmit';

import './dashboard.scss';

const EditClientForm = ({ client, closeModal }) => {
  const { firebase = null } = useContext(FirebaseContext) || {};
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    goal: '',
    raised: '',
    familySize: '',
    questions: [],
    answers: [],
    situation: '',
    status: '',
  });
  const [interviewValues, setInterviewValues] = useState({});
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [clientImage, setClientImage] = useState(null);
  const [dateFundingBegan, setDateFundingBegan] = useState(new Date());
  const [dateHoused, setDateHoused] = useState(new Date());
  const [isProcessing, setProcessingTo] = useState(false);
  const [clientQuestions, setClientQuestions] = useState([]);
  const [clientAnswers, setClientAnswers] = useState([]);
  let isMounted = true;

  useEffect(() => {
    setDateFundingBegan(client.dateFundingBegan.toDate());
    setDateHoused(client.dateHoused.toDate());

    setFormValues(currentValues => ({
      ...currentValues,
      status: client.status,
    }));
    setClientQuestions(client.questions);
    setClientAnswers(client.answers);
    return () => {
      isMounted = false;
    };
  }, []);

  function handleSubmit(ev) {
    ev.preventDefault();
    let temp = {};
    let tempQuestions = clientQuestions;
    let tempAnswers = clientAnswers;

    if (
      dateFundingBegan.getTime() !== client.dateFundingBegan.toDate().getTime()
    ) {
      temp.dateFundingBegan = dateFundingBegan.toUTCString();
    }

    if (dateHoused.getTime() !== client.dateHoused.toDate().getTime()) {
      temp.dateHoused = dateHoused.toUTCString();
    }

    // set answers array using index from object key
    for (let [key, value] of Object.entries(interviewValues)) {
      if (value !== '') {
        let index = key.charAt(key.length - 1) - 1;

        if (key.startsWith('a')) {
          tempAnswers[index] = value;
        } else {
          tempQuestions[index] = value;
        }
      }
    }

    if (
      Object.keys(interviewValues).length !== 0 ||
      interviewValues.constructor !== Object
    ) {
      // set answers to temp
      temp.answers = tempAnswers;
      temp.questions = tempQuestions;
    }

    // check all values on formValues for any changes
    // set those on temp if they exist
    for (let [key, value] of Object.entries(formValues)) {
      if (client.hasOwnProperty(key)) {
        if (value.length !== 0 && client[key] !== value) {
          temp[key] = value;
        }
      } else {
        temp[key] = value;
      }
    }

    if (firebase) {
      setProcessingTo(true);
      console.log(`running updateClientFromAdmin`);
      firebase
        .updateClientFromAdmin({
          clientId: `${client.firstName}-${client.lastName}`,
          updateObject: temp,
        })
        .then(() => {
          if (isMounted) {
            setSuccess(true);
            closeModal();
          }
        })
        .catch(error => {
          setErrorMessage(`error updating client from admin: ${error.message}`);
        });
    }
    setProcessingTo(false);
  }

  // handle all other input changes
  function handleInputChange(event) {
    event.persist();
    setSuccess(false);
    setFormValues(currentValues => ({
      ...currentValues,
      [event.target.name]: event.target.value,
    }));
  }

  // handle all interview inputs
  function handleInterviewInputChange(ev) {
    ev.persist();
    setSuccess(false);
    setInterviewValues(currentValues => ({
      ...currentValues,
      [ev.target.name]: ev.target.value,
    }));
  }

  // handle file change
  function handleFileChange(ev) {
    ev.persist();
    setClientImage(ev.target.files[0]);
  }

  // handle input change for dateFundingBegan
  function handleFundingDateChange(date) {
    setSuccess(false);
    setDateFundingBegan(date);
  }
  // handle input change for dateHoused
  function handleDateHousedChange(date) {
    setSuccess(false);
    setDateHoused(date);
  }

  return (
    <form onSubmit={handleSubmit} className="form-component">
      <h3>Edit client</h3>
      <div className="two-input-row">
        <div className="form-input-row">
          <label for="firstName">First Name</label>
          <input
            type="text"
            onChange={handleInputChange}
            // value={formValues.firstName}
            name="firstName"
            placeholder={client.firstName}
            disabled
          />
        </div>
        <div className="form-input-row">
          <label for="lastName">Last Name</label>
          <input
            type="text"
            onChange={handleInputChange}
            // value={formValues.lastName}
            name="lastName"
            placeholder={client.lastName}
            disabled
          />
        </div>
      </div>
      <div className="form-input-row">
        <label for="situation">Situation</label>
        <textarea
          type="text"
          onChange={handleInputChange}
          value={formValues.situation}
          placeholder={client.situation}
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
            placeholder={`$${client.goal}.00`}
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
            placeholder={`$${client.raised}.00`}
            min="0"
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
            placeholder={client.familySize}
            min="1"
            max="12"
          />
        </div>
      </div>
      <div className="two-input-row">
        <div className="form-input-row">
          <label for="clientImage">
            Client image <small>(less than 10MB)</small>
          </label>

          <input onChange={handleFileChange} type="file" name="clientImage" />
        </div>
        <div className="form-input-row">
          <label for="status">Status</label>
          <select
            id="status"
            name="status"
            onChange={handleInputChange}
            value={formValues.status}
          >
            <option value="Funding">Funding</option>
            <option value="Unhoused">Unhoused</option>
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
            onChange={handleDateHousedChange}
            value={dateHoused}
          />
        </div>
      </div>
      <h5>
        Enter questions/answers exactly how you want to appear on website.
      </h5>
      <div className="dashboard-divider" />
      {clientQuestions.map(question => {
        let currentIndex = clientQuestions.indexOf(question);
        return (
          <div className="form-input-row">
            <div className="form-input-row">
              <label
                htmlFor={`question${(currentIndex + 1).toString()}`}
              >{`Question ${currentIndex + 1}`}</label>
              <input
                name={`question${(currentIndex + 1).toString()}`}
                label={`Question ${currentIndex + 1}`}
                type="text"
                onChange={handleInterviewInputChange}
                placeholder={question}
                value={formValues[`question${currentIndex + 1}`]}
              />
            </div>
            <div className="form-input-row">
              <label htmlFor="{`answer${currentIndex + 1}`}">
                {`Answer ${currentIndex + 1}`}
              </label>
              <textarea
                name={`answer${currentIndex + 1}`}
                label={`Answer ${currentIndex + 1}`}
                type="text"
                onChange={handleInterviewInputChange}
                placeholder={clientAnswers[currentIndex]}
                value={formValues[`answer${currentIndex + 1}`]}
              />
            </div>
          </div>
        );
      })}
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

export default EditClientForm;
