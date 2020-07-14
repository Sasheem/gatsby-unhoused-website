import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';

import ButtonModal from '../common/Button/buttonModal';

const PreviewDonation = ({
  firebase,
  user,
  registerDonor,
  formValues,
  paymentMethod,
  closeModal,
  stripeAmount,
  clients,
  clientData,
  selectedPayment,
  selectedCard,
  clientSelected,
  donationAmount,
  isSavingCard,
}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    console.dir(selectedCard);
  }, []);

  // handle donation submit
  const handleSubmit = async () => {
    let clientSecret = '';
    let paymentIntentId = '';
    setIsProcessing(true);
    console.log(`submitting donation`);

    if (selectedPayment !== '') {
      console.log(`selectedPayment: ${selectedPayment}`);
    }

    // check if user wants to create an account
    if (registerDonor) {
      console.log(`registering donor`);
      try {
        const registerResult = firebase.register({
          username: formValues.username,
          email: formValues.email,
          password: formValues.password,
          name: formValues.name,
        });

        console.log(`registerResult: ${typeof registerResult}`);
        console.dir(registerResult);
        // return registerResult;
      } catch (error) {
        setErrorMessage(error.message);
      }
    }

    try {
      console.log(`running guest paymentIntent creation`);

      const paymentIntentResult = await firebase.createPaymentIntent({
        amount: 100 * parseInt(donationAmount),
        email:
          selectedPayment !== ''
            ? selectedCard.billing_details.email
            : formValues.email,
        name:
          selectedPayment !== ''
            ? selectedCard.billing_details.name
            : formValues.name,
      });
      paymentIntentId = paymentIntentResult.data.paymentIntent.id;
      console.log(`paymentIntentId: ${paymentIntentId}`);
    } catch (error) {
      setIsProcessing(false);
      setErrorMessage(`createPaymentIntent error: ${error.message}`);
    }

    try {
      // confirm payment intent with selectedPayment method if it exists
      // OW use payment entered in from form
      const confirmPaymentIntent = await firebase.confirmPaymentIntent({
        intentId: paymentIntentId,
        paymentMethodId:
          selectedPayment !== '' ? selectedPayment : paymentMethod.id,
        isSavingCard,
      });
      console.log(`confirmCardPayment:`);
      console.dir(confirmPaymentIntent);
    } catch (error) {
      setErrorMessage(error.message);
      setIsProcessing(false);
      return;
    }

    // success: createDonation and update client
    // two cases: user logged in or guest
    let tempFundedBy = [];
    let tempClientObj = null;

    // map over clients to match to one being funded
    clients.map(clientObj => {
      // if this is the matched client
      if (clientObj.id === clientSelected) {
        tempClientObj = clientObj;
      }
    });

    // check if user auth
    if (user) {
      // check for any previous fundedBy
      if (tempClientObj.hasOwnProperty('fundedBy')) {
        tempClientObj.fundedBy.map(username => {
          tempFundedBy.push(username);
        });
        tempFundedBy.push(user.username);
      } else {
        tempFundedBy.push(user.username);
      }

      firebase
        .updateClientWithUserDonation({
          amount: parseInt(donationAmount),
          fundedBy: tempFundedBy,
          clientId: clientSelected,
          raised: parseInt(tempClientObj.raised),
          paymentIntentId,
          donorEmail:
            selectedPayment !== ''
              ? selectedCard.billing_details.email
              : formValues.email,
          message: formValues.message,
          username: user ? user.username : '',
          familySize: clientData.familySize,
          segmentId: clientData.segmentId,
        })
        .then(result => {
          console.log(`result:`);
          console.dir(result);
          setIsProcessing(false);
          navigate('/successDonation');
        })
        .catch(error => {
          setErrorMessage(error.message);
          setIsProcessing(false);
        });
    } else {
      try {
        // check if email is subscribed to mailchimp
        firebase
          .checkListForEmail({
            email: formValues.email,
          })
          .then(result => {
            console.log(`result: ${typeof result}`);
            console.dir(result);
            // add donor email to mailchimp list
            if (result.data.status === 404) {
              firebase.subscribeGuestToList({
                email: formValues.email,
                name: formValues.name,
              });
            }
          });

        firebase.updateClientWithGuestDonation({
          amount: parseInt(donationAmount),
          raised: parseInt(tempClientObj.raised),
          clientId: clientSelected,
          paymentIntentId,
          donorEmail: formValues.email,
          message: formValues.message,
          familySize: clientData.familySize,
          segmentId: clientData.segmentId,
        });
        setIsProcessing(false);
        navigate('/successDonation');
      } catch (error) {
        setErrorMessage(error.message);
        setIsProcessing(false);
      }
    }
  };

  const handleBack = () => {
    closeModal();
  };

  console.log('paymentMethod:');
  console.dir(paymentMethod);
  console.log('selectedCard');
  console.dir(selectedCard);

  // const { card, billing_details } = paymentMethod;
  console.dir(selectedCard);
  const cardNumber =
    selectedPayment !== '' ? selectedCard.card.last4 : paymentMethod.card.last4;
  const expMonth =
    selectedPayment !== ''
      ? selectedCard.card.exp_month
      : paymentMethod.card.exp_month;
  const expYear =
    selectedPayment !== ''
      ? selectedCard.card.exp_year
      : paymentMethod.card.exp_year;
  const cardBrand =
    selectedPayment !== '' ? selectedCard.card.brand : paymentMethod.card.brand;

  const cardName =
    selectedPayment !== ''
      ? selectedCard.billing_details.name
      : formValues.name;
  const cardEmail =
    selectedPayment !== ''
      ? selectedCard.billing_details.email
      : formValues.email;
  const line1 =
    selectedPayment !== ''
      ? selectedCard.billing_details.address.line1
      : paymentMethod.billing_details.address.line1;
  const city =
    selectedPayment !== ''
      ? selectedCard.billing_details.address.city
      : paymentMethod.billing_details.address.city;
  const state =
    selectedPayment !== ''
      ? selectedCard.billing_details.address.state
      : paymentMethod.billing_details.address.state;
  const postalCode =
    selectedPayment !== ''
      ? selectedCard.billing_details.address.postal_code
      : paymentMethod.billing_details.address.postal_code;
  return (
    <div className="form-modal">
      <h4>Donation Details</h4>
      <div className="form-modal-row-duo">
        <div className="form-modal-row">
          <p>
            <strong>Amount</strong>
          </p>
          <p>${donationAmount}.00</p>
        </div>
        <div className="form-modal-row">
          <p>
            <strong>Message</strong>
          </p>
          <p>{formValues.message}</p>
        </div>
      </div>

      <h4>Billing Details</h4>
      <div className="form-modal-row">
        <p>
          <strong>Name</strong>
        </p>
        <p>{cardName}</p>
      </div>
      <div className="form-modal-row">
        <p>
          <strong>Email</strong>
        </p>
        <p>{cardEmail}</p>
      </div>
      <div className="three-even-input-row">
        <div className="form-modal-row">
          <p>
            <strong>Card</strong>
          </p>
          <p>**** {cardNumber}</p>
        </div>
        <div className="form-modal-row">
          <p>
            <strong>Exp</strong>
          </p>
          <p>
            {expMonth} / {expYear}
          </p>
        </div>
        <div className="form-modal-row">
          <p>
            <strong>Type</strong>
          </p>
          <p>{cardBrand}</p>
        </div>
      </div>
      <div className="form-modal-row">
        <p>
          <strong>Address</strong>
        </p>
        <p>{line1}</p>
      </div>
      <div className="three-even-input-row">
        <div className="form-modal-row">
          <p>
            <strong>City</strong>
          </p>
          <p>{city}</p>
        </div>
        <div className="form-modal-row">
          <p>
            <strong>State</strong>
          </p>
          <p>{state}</p>
        </div>
        <div className="form-modal-row">
          <p>
            <strong>Zip</strong>
          </p>
          <p>{postalCode}</p>
        </div>
      </div>
      <div className="form-modal-buttons m-top-xl">
        <div />
        <ButtonModal disabled={isProcessing} actionClick={handleBack}>
          Back
        </ButtonModal>
        <div />
        <ButtonModal disabled={isProcessing} actionClick={handleSubmit}>
          {isProcessing ? 'Processing...' : 'Donate'}
        </ButtonModal>
        <div />
      </div>
      {!!errorMessage && (
        <div className="error-message">ERROR: {errorMessage}</div>
      )}
    </div>
  );
};

export default PreviewDonation;
