import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../../components/Firebase';
import DatePicker from 'react-date-picker';
import moment from 'moment';

import ButtonSubmit from '../common/Button/buttonSubmit';
import '../../styles/global.scss';

/**
 * todo add a delete account checkbox
 * todo add current user settings as placeholder text
 * todo change success message to green
 * todo add a loading icon
 * todo add current user image to replace blue circle
 * todo erase file name upon submission
 */

const BioForm = ({ userProfile }) => {
  const { firebase = null, user } = useContext(FirebaseContext) || {};
  const [userProfileState, setUserProfileState] = useState(null);
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    workplace: '',
  });
  const [profilePrivate, setProfilePrivate] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // const [birthday, setBirthday] = useState(new Date());
  const [profileImage, setProfileImage] = useState(null);
  // const [birthdayChanged, setBirthdayChanged] = useState(false);
  const [privacyChanged, setPrivacyChanged] = useState(false);
  const [isProcessing, setProcessingTo] = useState(false);
  let isMounted = true;

  useEffect(() => {
    if (firebase && isMounted) {
      firebase.getUser({ userId: user.username }).then(snapshot => {
        setUserProfileState(snapshot.data());
        setProfilePrivate(snapshot.data().profilePrivate);
      });
    }
    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * 1 check profile data vs form data
   * 2 write data to firebase if
   * * profile data != form data OR
   * * profile data does not exist AND form data exists
   */
  function handleSubmit(event) {
    event.preventDefault();
    let temp = {};
    let imagePath = '';

    if (userProfileState !== null && firebase) {
      // Map over all values provided by form
      for (let [key, value] of Object.entries(formValues)) {
        if (value.length !== 0) {
          if (userProfileState.hasOwnProperty(key)) {
            if (userProfileState[key] !== value) {
              temp[key] = value;
            }
          } else {
            temp[key] = value;
          }
        }
      }

      // only change the birthday if it was changed in the form
      // if (birthdayChanged === true) {
      //   temp['birthday'] = birthday.toUTCString();
      // }

      // only change the privacy if it was changed in the form
      if (privacyChanged === true) {
        temp['profilePrivate'] = profilePrivate;
      }

      if (profileImage !== null) {
        // console.log(`uploading profile Image: ${profileImage}`);
        const result = firebase.uploadUserProfileImage({
          fileObject: profileImage,
          username: user.username,
        });
        console.dir(result);
        imagePath = result.location_.path_;
        temp['imagePath'] = result.location_.path_;
      }

      setProcessingTo(true);
      firebase
        .writeUserSettings({
          username: user.username,
          settings: temp,
        })
        .then(() => {
          if (isMounted) {
            setFormValues({
              firstName: '',
              lastName: '',
              email: '',
              bio: '',
              workplace: '',
            });
            // setBirthday(new Date());
            setSuccess(true);
            // setBirthdayChanged(false);
            setPrivacyChanged(false);
          }
        })
        .catch(error => {
          setErrorMessage(error.message);
        });
      setProcessingTo(false);
    }
  }

  function handlePrivacySwitch() {
    setSuccess(false);
    setPrivacyChanged(true);
    setProfilePrivate(!profilePrivate);
  }

  // function handleDateChange(date) {
  //   setSuccess(false);
  //   setBirthdayChanged(true);
  //   setBirthday(date);
  // }

  function handleInputChange(event) {
    event.persist();
    setErrorMessage('');
    setSuccess(false);
    setFormValues(currentValues => ({
      ...currentValues,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <form className="dashboard-item" onSubmit={handleSubmit}>
      <h3>Update Profile</h3>
      <div className="form-input-row">
        <label htmlFor="profileImage">
          Profile picture <small>(less than 10MB)</small>
        </label>

        <input
          onChange={e => {
            e.persist();
            setProfileImage(e.target.files[0]);
          }}
          type="file"
          name="profileImage"
        />
      </div>
      <div className="two-input-row">
        <div className="form-input-row">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            onChange={handleInputChange}
            value={formValues.firstName}
            placeholder={userProfile.firstName ? userProfile.firstName : null}
          />
        </div>
        <div className="form-input-row">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            onChange={handleInputChange}
            value={formValues.lastName}
            placeholder={userProfile.lastName ? userProfile.lastName : null}
          />
        </div>
      </div>
      <div className="form-input-row">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          onChange={handleInputChange}
          value={formValues.email}
          placeholder={userProfile.email ? userProfile.email : null}
        />
      </div>
      <div className="form-input-row">
        <label htmlFor="bio">Short bio</label>
        <textarea
          id="bio"
          name="bio"
          placeholder={
            userProfile.bio
              ? userProfile.bio
              : 'Tell others a little about yourself'
          }
          value={formValues.bio}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-input-row">
        <label htmlFor="workplace">Workplace</label>
        <input
          type="text"
          name="workplace"
          onChange={handleInputChange}
          value={formValues.workplace}
          placeholder={
            userProfile.workplace ? userProfile.workplace : 'Add a workplace'
          }
        />
      </div>
      {/* <div className="form-input-row">
        <label htmlFor="label">Website</label>
        <input
          type="url"
          name="website"
          onChange={handleInputChange}
          value={formValues.website}
          placeholder={userProfile.website ? userProfile.website : 'https://'}
        />
      </div> */}
      {/* <div className="form-input-row">
        <label htmlFor="birthday">Birthday</label>
        <DatePicker
          name="birthday"
          value={birthday}
          onChange={handleDateChange}
        />
      </div> */}
      <div className="form-input-row">
        <label htmlFor="switch-help">
          Make profile private (only visible to you)
        </label>
        <label className="switch-help">
          <input
            type="checkbox"
            name="switch-help"
            id="switch-help"
            checked={profilePrivate}
            onChange={handlePrivacySwitch}
          />
          <span className="slider-help" />
        </label>
      </div>
      <div className="form-submit-row-left">
        <ButtonSubmit
          value={isProcessing ? 'Processing...' : 'Submit'}
          disabled={isProcessing}
        />
        <div />
      </div>
      {!!success && <div className="success-message">Profile updated</div>}
      {!!errorMessage && (
        <div className="error-message">ERROR: {errorMessage}</div>
      )}
    </form>
  );
};

export default BioForm;
