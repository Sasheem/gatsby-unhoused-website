import React, { useState, useContext, useEffect } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { Button } from '../common';

import '../../styles/global.scss';

/**
 * todo revisit alg that adds a dash for birthday input
 * todo add a delete account checkbox
 */

const BioForm = () => {
  const data = useStaticQuery(graphql`
    query {
      allSite {
        edges {
          node {
            siteMetadata {
              states
            }
          }
        }
      }
    }
  `);
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    state: '',
    website: '',
    birthday: '',
    workplace: '',
  });
  const [isProfilePrivate, setIsProfilePrivate] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handlePrivacySwitch() {
    setIsProfilePrivate(!isProfilePrivate);
  }

  function handleInputChange(event) {
    event.persist();
    setErrorMessage('');
    setFormValues(currentValues => ({
      ...currentValues,
      [event.target.name]: event.target.value,
    }));
  }
  // measure when birthday state reaches size 2 and 5 from 1 and 4 respectively
  // to add a / to the value
  // measure when the birthday state reaches 5 and 2 from 6 and 3 respectively
  // to take away a / from the value
  function handleBirthdayChange(event) {
    event.persist();
    setErrorMessage('');

    setFormValues(currentValues => {
      console.log(`currentValues`);
      console.dir(currentValues);
      console.log(`targetValue: ${event.target.value}`);

      if (
        currentValues.birthday.length === 1 &&
        event.target.value.length >= 2 &&
        !event.target.value.endsWith('/')
      ) {
        return {
          ...currentValues,
          [event.target.name]: `${event.target.value}/`,
        };
      } else if (
        currentValues.birthday.length === 4 &&
        event.target.value.length >= 3 &&
        !event.target.value.endsWith('/')
      ) {
        return {
          ...currentValues,
          [event.target.name]: `${event.target.value}/`,
        };
      } else {
        return {
          ...currentValues,
          [event.target.name]: event.target.value,
        };
      }
    });
  }
  return (
    <div className="form-layout-settings">
      <form className="form-component" onSubmit={handleSubmit}>
        <h4>Your profile info</h4>
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
          <input
            type="text"
            name="birthday"
            onChange={handleBirthdayChange}
            value={formValues.birthday}
            placeholder="MM / DD / YYYY (Birthday)"
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
              checked={isProfilePrivate}
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
      </form>
    </div>
  );
};

export default BioForm;
