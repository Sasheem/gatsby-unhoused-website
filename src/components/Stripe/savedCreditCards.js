import React, { useState, useEffect } from 'react';

import MoreIcon from '../../assets/ellipsis-v-solid.svg';
import AddIcon from '../../assets/plus-solid.svg';
import Loader from '../common/Loader/loader';
import AddCreditCardButton from '../Dashboard/addCreditCardButton';
/**
 * todo add dropdown menu upon MoreIcon click
 * * update credit card or billing details
 * * delete credit card
 * todo figure out how to refesh page after new credit card added
 */

const SavedCreditCards = ({ firebase, user }) => {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(false);
  let isMounted = true;

  // when component un mounts
  useEffect(() => {
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (firebase && isMounted) {
      setLoading(true);
      firebase.getUser({ userId: user.username }).then(snapshot => {
        firebase
          .listPaymentMethods({
            customerId: snapshot.data().customerId,
          })
          .then(result => {
            setWallet(result.data.data);
            setLoading(false);
          })
          .catch(error => {
            console.log(`ERROR: ${error.message}`);
            setLoading(false);
          });
      });
    }
  }, [firebase]);

  return (
    <div className="dashboard-item">
      <h3>Saved Credit Cards</h3>
      <div className="dashboard-cards">
        {/* <AddCreditCardButton /> */}
        {/* <div className="add-card">
          <div className="dashboard-icon">
            <AddIcon />
          </div>
        </div> */}
        {loading === true ? (
          <div className="loader-container">
            <Loader />
          </div>
        ) : (
          !!wallet &&
          wallet.map(card => (
            <div className="saved-card">
              <div className="card-brand">
                <p>{card.card.brand}</p>
              </div>
              <div className="card-number">
                <p>****</p>
                <p>****</p>
                <p>****</p>
                <p>{card.card.last4}</p>
              </div>
              <div className="card-details">
                <div className="card-flex-md">
                  <p>Name</p>
                  <p>{card.billing_details.name}</p>
                </div>
                <div className="card-flex-sm">
                  <p>Exp</p>
                  <p>
                    {card.card.exp_month}/{card.card.exp_year}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SavedCreditCards;
