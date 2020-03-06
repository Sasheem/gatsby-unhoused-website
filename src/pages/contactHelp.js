import React, { useState } from 'react';

import SEO from '../components/seo';
import {
  Form,
  Input,
  Button,
  ErrorMessage,
  FormSection,
} from '../components/common';

const ContactHelp = () => {
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    phone: '',
    familySize: 1,
    discoverMethod: '',
  });
  const [userIsClient, setUserIsClient] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleUserClientSwitch(event) {
    setUserIsClient(!userIsClient);
  }
  function handleInputChange(event) {
    event.persist();
    setErrorMessage('');
    setFormValues(currentValues => ({
      ...currentValues,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <FormSection>
      <div className="form-layout">
        <SEO title="Unhoused Humanity contact for help form" />
        <div className="form-header">
          <h1>Request our help</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lacus
            nisi, aliquam a tortor et, vulputate consectetur ex.
          </p>
        </div>
        <div className="form-container">
          <div />
          <Form onSubmit={handleSubmit} className="form-component">
            <h3>Your Info</h3>
            <div className="two-input-row">
              <div className="form-input-row">
                <label for="firstName">First Name</label>
                <Input type="text" name="firstName" id="firstName" />
              </div>
              <div className="form-input-row">
                <label for="lastName">Last Name</label>
                <Input type="text" name="lastName" id="lastName" />
              </div>
            </div>
            <div className="form-input-row">
              <label for="email">Email</label>
              <Input type="email" name="email" id="email" />
            </div>
            <div className="form-input-row">
              <label for="phone">Phone Number</label>
              <Input type="tel" name="phone" id="phone" />
            </div>
            <div className="form-input-row">
              <label for="message">Describe the situation</label>
              <textarea id="message" name="message" />
            </div>
            <div className="two-input-row">
              <div class="form-input-row">
                <label for="familySize">Family Size</label>
                <Input
                  type="number"
                  name="familySize"
                  id="familySize"
                  min="1"
                />
              </div>
              <div className="form-input-row">
                <label for="switch-help">
                  I am filling this form out for someone else
                </label>
                <label class="switch-help">
                  <Input
                    type="checkbox"
                    name="switch-help"
                    id="switch-help"
                    checked={userIsClient}
                    onChange={handleUserClientSwitch}
                  />
                  <span className="slider-help" />
                </label>
              </div>
            </div>
            {/* {userIsClient ? <ClientForm /> : null} */}
            <div className="form-input-row">
              <label for="discovery-method-help">
                How did you hear about Unhoused Humanity?
              </label>
              <Input
                type="text"
                name="discovery-method-help"
                id="discovery-method-help"
              />
            </div>
            <div className="form-submit-row">
              <div />
              <Button type="submit" block>
                Send
              </Button>
              <div />
            </div>
          </Form>
          <div />
        </div>
      </div>
    </FormSection>
  );
};

export default ContactHelp;
