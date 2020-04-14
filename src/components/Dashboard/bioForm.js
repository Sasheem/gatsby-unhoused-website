import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../../components/Firebase';
import DatePicker from 'react-date-picker';
import moment from 'moment';
import { Button } from '../common';
import '../../styles/global.scss';

/**
 * todo add a delete account checkbox
 * todo add current user settings as placeholder text
 * todo change success message to green
 * todo add a loading icon
 * todo add current user image to replace blue circle
 * todo erase file name upon submission
 */

let fileReader;
if (typeof window !== 'undefined') {
  fileReader = new FileReader();
}

const BioForm = () => {
  const { firebase = null, user } = useContext(FirebaseContext) || {};
  const [userProfile, setUserProfile] = useState(null);
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    state: '',
    website: '',
    workplace: '',
  });
  const [profilePrivate, setProfilePrivate] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [userImage, setUserImage] = useState('');
  const [birthdayChanged, setBirthdayChanged] = useState(false);
  const [privacyChanged, setPrivacyChanged] = useState(false);
  let isMounted = true;

  useEffect(() => {
    if (firebase && isMounted) {
      firebase.getUser({ userId: user.username }).then(snapshot => {
        setUserProfile(snapshot.data());
      });
    }
    return () => {
      isMounted = false;
    };
  }, []);

  // add event listener to file reader only once
  // when component mounts
  useEffect(() => {
    fileReader.addEventListener('load', () => {
      setUserImage(fileReader.result);
    });
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

    if (userProfile !== null && firebase) {
      // Map over all values provided by form
      for (let [key, value] of Object.entries(formValues)) {
        if (value.length !== 0) {
          if (userProfile.hasOwnProperty(key)) {
            if (userProfile[key] !== value) {
              temp[key] = value;
            }
          } else {
            temp[key] = value;
          }
        }
      }

      // only change the birthday if it was changed in the form
      if (birthdayChanged === true) {
        temp['birthday'] = moment(birthday).format('l');
      }

      // only change the privacy if it was changed in the form
      if (privacyChanged === true) {
        temp['profilePrivate'] = profilePrivate;
      }

      firebase
        .writeUserSettings({
          username: user.username,
          settings: temp,
          profilePicture: userImage ? userImage : '',
        })
        .then(() => {
          if (isMounted) {
            setFormValues({
              firstName: '',
              lastName: '',
              email: '',
              bio: '',
              state: '',
              website: '',
              workplace: '',
            });
            setBirthday(new Date());
            setUserImage('');
            setSuccess(true);
            setBirthdayChanged(false);
            setPrivacyChanged(false);
          }
        })
        .catch(error => {
          setErrorMessage(error.message);
        });
    }
  }

  function handlePrivacySwitch() {
    setSuccess(false);
    setPrivacyChanged(true);
    setProfilePrivate(!profilePrivate);
  }

  function handleDateChange(date) {
    setSuccess(false);
    setBirthdayChanged(true);
    setBirthday(date);
  }

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
    <div className="form-layout-settings">
      <form className="form-component" onSubmit={handleSubmit}>
        <h4>Your profile info</h4>
        <div className="form-input-row-file">
          <div className="form-input-row">
            <div className="profile-pic-filler" />
          </div>
          <div class="form-input-row">
            <label for="profilePicture">Add profile picture</label>
            <input
              onChange={e => {
                e.persist();
                fileReader.readAsDataURL(e.target.files[0]);
              }}
              type="file"
              name="profilePicture"
            />
          </div>
        </div>
        <div className="two-input-row">
          <div className="form-input-row">
            <label for="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              onChange={handleInputChange}
              value={formValues.firstName}
            />
          </div>
          <div className="form-input-row">
            <label for="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              onChange={handleInputChange}
              value={formValues.lastName}
            />
          </div>
        </div>
        <div className="form-input-row">
          <label for="email">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleInputChange}
            value={formValues.email}
          />
        </div>
        <div className="form-input-row">
          <label for="bio">Short bio</label>
          <textarea
            id="bio"
            name="bio"
            placeholder="Tell others a little about yourself"
            value={formValues.bio}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-input-row">
          <label for="label">Website</label>
          <input
            type="url"
            name="website"
            onChange={handleInputChange}
            value={formValues.website}
          />
        </div>
        {/* <div className="two-input-row">
          <div className="form-input-row">
            <label for="state">State</label>
            <select
              multiple={true}
              value={data.allSite.edges.node.siteMetadata.states}
            />
          </div>
          <div className="form-input-row">
            <label for="label">Website</label>
            <input
              type="text"
              name="website"
              onChange={handleInputChange}
              value={formValues.website}
            />
          </div>
        </div> */}
        <div className="form-input-row">
          <label for="birthday">Birthday</label>
          <DatePicker
            name="birthday"
            value={birthday}
            onChange={handleDateChange}
          />
        </div>
        <div className="form-input-row">
          <label for="workplace">Workplace</label>
          <input
            type="text"
            name="workplace"
            onChange={handleInputChange}
            value={formValues.workplace}
            placeholder="Add a workplace"
          />
        </div>
        <div className="form-input-row">
          <label for="switch-help">
            Make profile private (only visible to you)
          </label>
          <label class="switch-help">
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
          <Button type="submit" block submit>
            Save
          </Button>
          <div />
        </div>
        {!!success && <div className="success-message">Profile updated</div>}
        {!!errorMessage && (
          <div className="error-message">ERROR: {errorMessage}</div>
        )}
      </form>
    </div>
  );
};

export default BioForm;