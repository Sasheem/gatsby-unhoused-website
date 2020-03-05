import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import ButtonSubmit from '../common/Button/buttonSubmit';
import { ErrorMessage } from '../common';

const NewsletterDiv = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 3em;
  background-color: black;
  padding: 5em 0;
  margin: 5em 0;
  h2,
  p {
    color: white;
    text-align: center;
  }
  @media only screen and (min-width: 600px) {
    grid-template-columns: 0.5fr 1fr 2fr 0.5fr;
    text-align: left;
  }
`;

const TitleDiv = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 1.5em;
`;
const FormDiv = styled(TitleDiv)`
  flex: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    text-align: center;
  }

  @media only screen and (min-width: 600px) {
    p {
      text-align: left;
      margin-bottom: 2em;
    }
    align-items: flex-start;
  }
`;
const NewsletterForm = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  max-width: 90%;
`;
const EmailInput = styled.input`
  flex: 2;
  padding: 0.5em;
  border: solid 1px #e1e5e9;
  border-radius: 3px;
  font-size: 1em;

  &:focus {
    outline: none !important;
    border: 1px solid #299ecc;
    box-shadow: 0 0 10px #719ece;
  }
`;
const Submit = styled.div`
  flex: 0.6;
  margin-left: 1em;

  input[type='submit'] {
    font-size: 1em;
    color: white;
  }
`;

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function handleSubmit(event) {
    // validate and send email to mailchimp list
  }

  function handleInputChange(event) {
    event.persist();
    setErrorMessage('');
    setEmail(event.target.value);
  }
  return (
    <NewsletterDiv>
      <div />
      <TitleDiv>
        <h2>Sign up for our newsletter</h2>
      </TitleDiv>
      <FormDiv>
        <p>
          Join our newsletter and we will keep you in the loop about our latest
          success stories, blog posts, and ways to get involved.
        </p>
        <NewsletterForm onSubmit={handleSubmit}>
          <EmailInput
            type="email"
            placeholder="Email"
            onChange={handleInputChange}
            value={email}
          />
          <Submit>
            <ButtonSubmit value="Sign up" />
          </Submit>
        </NewsletterForm>
      </FormDiv>
      <div />
    </NewsletterDiv>
  );
};

export default Newsletter;
