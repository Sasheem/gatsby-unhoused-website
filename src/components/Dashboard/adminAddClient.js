import React, { useState, useEffect, useContext } from 'react';
import DatePicker from 'react-date-picker';

import { Button, HorizontalDivider } from '../common';
import { FirebaseContext } from '../Firebase';

// import '../../styles/global.scss';
import './dashboard.scss';

/**
 * todo input type file needs to be reset after form submission
 * todo add activity indicator while form submits
 */

const AdminAddClient = () => {
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
    question1:
      'Where did you grow up and what did you like about your home town?',
    question2:
      'Do you have any brothers or sisters? If so, tell us about them.',
    question3:
      'Do you have any goals you would like to achieve in the short term, long term, or both?',
    question4:
      'Given a choice of anyone in the world, whom would you want as a dinner guest and why?',
    question5: 'What would constitute a perfect day for you?',
    question6: 'For what in life do you feel most grateful for?',
    question7: 'What is your most treasured memory?',
    question8: 'What is your greatest accomplishment in life?',
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    answer5: '',
    answer6: '',
    answer7: '',
    answer8: '',
  });
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [clientImage, setClientImage] = useState(null);
  const [dateFundingBegan, setDateFundingBegan] = useState(new Date());
  const [dateHoused, setDateHoused] = useState(new Date());
  const [isProcessing, setProcessingTo] = useState(false);
  let isMounted = true;

  useEffect(() => {
    return () => {
      isMounted = false;
    };
  }, []);

  async function handleSubmit(event) {
    const {
      firstName,
      lastName,
      situation,
      goal,
      raised,
      familySize,
      status,
      questions,
      answers,
      question1,
      question2,
      question3,
      question4,
      question5,
      question6,
      question7,
      question8,
      answer1,
      answer2,
      answer3,
      answer4,
      answer5,
      answer6,
      answer7,
      answer8,
    } = formValues;
    let imagePath = '';

    event.preventDefault();

    // check each question/answer combo
    // add to respective array if they both exist
    if (question1 !== '' && answer1 !== '') {
      questions.push(question1.trim());
      answers.push(answer1.trim());
    }
    if (question2 !== '' && answer2 !== '') {
      questions.push(question2.trim());
      answers.push(answer2.trim());
    }
    if (question3 !== '' && answer3 !== '') {
      questions.push(question3.trim());
      answers.push(answer3.trim());
    }
    if (question4 !== '' && answer4 !== '') {
      questions.push(question4.trim());
      answers.push(answer4.trim());
    }
    if (question5 !== '' && answer5 !== '') {
      questions.push(question5.trim());
      answers.push(answer5.trim());
    }
    if (question6 !== '' && answer6 !== '') {
      questions.push(question6.trim());
      answers.push(answer6.trim());
    }
    if (question7 !== '' && answer7 !== '') {
      questions.push(question7.trim());
      answers.push(answer7.trim());
    }
    if (question8 !== '' && answer8 !== '') {
      questions.push(question8.trim());
      answers.push(answer8.trim());
    }
    setProcessingTo(true);
    if (clientImage !== null) {
      const result = await firebase.uploadClientImage({
        fileObject: clientImage,
        clientId: `${firstName}-${lastName}`,
      });
      imagePath = result.metadata.fullPath;
    }

    await firebase
      .createClient({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        situation: situation.trim(),
        status,
        goal,
        raised,
        familySize,
        questions,
        answers,
        dateFundingBegan: dateFundingBegan.toUTCString(),
        dateHoused: dateHoused.toUTCString(),
        imagePath,
      })
      .then(() => {
        if (isMounted) {
          setFormValues({
            firstName: '',
            lastName: '',
            situation: '',
            status: '',
            goal: '',
            raised: '',
            familySize: '',
            questions: [],
            answers: [],
            answer1: '',
            answer2: '',
            answer3: '',
            answer4: '',
            answer5: '',
            answer6: '',
            answer7: '',
            answer8: '',
          });
          setDateFundingBegan(new Date());
          setDateHoused(new Date());
          setSuccess(true);
          setProcessingTo(false);
        }
      })
      .catch(error => {
        setProcessingTo(false);
        setErrorMessage(error.message);
      });
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
    <div className="dashboard-item">
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
              required
            />
          </div>
          <div className="form-input-row">
            <label for="lastName">Last Name</label>
            <input
              type="text"
              onChange={handleInputChange}
              value={formValues.lastName}
              name="lastName"
              required
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
            required
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
              required
            />
          </div>
          <div className="form-input-row">
            <label for="raised">Raised</label>
            <input
              type="number"
              onChange={handleInputChange}
              value={formValues.raised}
              name="raised"
              placeholder="Amount between 0 - 1500"
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
              placeholder="Amount between 1 - 12"
              min="1"
              max="12"
              required
            />
          </div>
        </div>
        <div className="two-input-row">
          <div className="form-input-row">
            <label for="clientImage">
              Client image <small>(less than 10MB)</small>
            </label>

            <input
              onChange={e => {
                e.persist();
                setClientImage(e.target.files[0]);
              }}
              type="file"
              name="clientImage"
            />
          </div>
          <div className="form-input-row">
            <label for="status">Status</label>
            <select
              id="status"
              name="status"
              onChange={handleInputChange}
              value={formValues.status}
            >
              <option selected value="Funding">
                Funding
              </option>
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
            <textarea
              type="text"
              name="answer1"
              onChange={handleInputChange}
              value={formValues.answer1}
            />
          </div>
        </div>
        <div className="dashboard-divider" />
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
            <textarea
              type="text"
              name="answer2"
              onChange={handleInputChange}
              value={formValues.answer2}
            />
          </div>
        </div>
        <div className="dashboard-divider" />
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
            <textarea
              type="text"
              name="answer3"
              onChange={handleInputChange}
              value={formValues.answer3}
            />
          </div>
        </div>
        <div className="dashboard-divider" />
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
            <textarea
              type="text"
              name="answer4"
              onChange={handleInputChange}
              value={formValues.answer4}
            />
          </div>
        </div>
        <div className="dashboard-divider" />
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
            <textarea
              type="text"
              name="answer5"
              onChange={handleInputChange}
              value={formValues.answer5}
            />
          </div>
        </div>
        <div className="dashboard-divider" />
        <div className="form-input-row">
          <div className="form-input-row">
            <label for="question6">Question 6</label>
            <input
              type="text"
              name="question6"
              onChange={handleInputChange}
              value={formValues.question6}
            />
          </div>
          <div className="form-input-row">
            <label for="answer6">Answer 6</label>
            <textarea
              type="text"
              name="answer6"
              onChange={handleInputChange}
              value={formValues.answer6}
            />
          </div>
        </div>
        <div className="dashboard-divider" />
        <div className="form-input-row">
          <div className="form-input-row">
            <label for="question7">Question 7</label>
            <input
              type="text"
              name="question7"
              onChange={handleInputChange}
              value={formValues.question7}
            />
          </div>
          <div className="form-input-row">
            <label for="answer7">Answer 7</label>
            <textarea
              type="text"
              name="answer7"
              onChange={handleInputChange}
              value={formValues.answer7}
            />
          </div>
        </div>
        <div className="dashboard-divider" />
        <div className="form-input-row">
          <div className="form-input-row">
            <label for="question8">Question 8</label>
            <input
              type="text"
              name="question8"
              onChange={handleInputChange}
              value={formValues.question8}
            />
          </div>
          <div className="form-input-row">
            <label for="answer8">Answer 8</label>
            <textarea
              type="text"
              name="answer8"
              onChange={handleInputChange}
              value={formValues.answer8}
            />
          </div>
        </div>
        <div className="dashboard-divider" />
        <div className="form-submit-row">
          <div />
          <Button type="submit" disabled={isProcessing} block>
            {isProcessing ? 'Processing...' : 'Add Client'}
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

export default AdminAddClient;
